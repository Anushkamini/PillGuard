"""Prescription upload route — the core AI pipeline endpoint."""

import logging

from fastapi import APIRouter, File, HTTPException, UploadFile

from models import PrescriptionResponse
from services.ai_service import extract_medications
from services.ocr_service import extract_text_from_file
from services.schedule_service import generate_schedule
from utils.file_utils import (
    allowed_file,
    cleanup_temp_file,
    sanitize_text,
    save_temp_file,
)

logger = logging.getLogger("pillguard.prescription")

router = APIRouter()

# In-memory store for the most recent upload so /api/medications and
# /api/schedule can serve the frontend without a database. Fine for a
# hackathon demo; swap for SQLite/Postgres later.
_latest_result: dict = {"medications": [], "schedule": [], "extracted_text": ""}


def get_latest_result() -> dict:
    return _latest_result


def set_latest_result(result: dict) -> None:
    global _latest_result
    _latest_result = result


@router.post("/api/prescription/upload", response_model=PrescriptionResponse, tags=["prescription"])
async def upload_prescription(file: UploadFile = File(...)):
    """Receive a prescription image/PDF, run OCR + AI, return medications + schedule."""
    if not file.filename or not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="Unsupported file type. Use PDF, PNG, JPG, or JPEG.")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    temp_path = save_temp_file(content, file.filename)
    try:
        extracted_text = extract_text_from_file(temp_path, file.filename)
    except RuntimeError as exc:
        cleanup_temp_file(temp_path)
        raise HTTPException(status_code=422, detail=f"Text extraction failed: {exc}") from exc
    except Exception as exc:  # noqa: BLE001
        cleanup_temp_file(temp_path)
        logger.exception("Unexpected OCR error")
        raise HTTPException(status_code=500, detail="Unexpected error during text extraction.") from exc

    cleanup_temp_file(temp_path)

    clean_text = sanitize_text(extracted_text)
    if not clean_text:
        raise HTTPException(status_code=422, detail="No readable text found in the prescription.")

    try:
        medications = extract_medications(clean_text)
    except Exception as exc:  # noqa: BLE001
        logger.exception("AI extraction error")
        raise HTTPException(status_code=502, detail="AI medication extraction failed.") from exc

    warnings: list[str] = []
    if not medications:
        warnings.append("No medicines could be identified. Please review the prescription manually.")

    try:
        schedule = generate_schedule(medications)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Schedule generation error")
        schedule = []
        warnings.append("Schedule generation encountered an error.")

    result = {
        "extracted_text": clean_text,
        "medications": medications,
        "schedule": schedule,
    }
    set_latest_result(result)

    return PrescriptionResponse(
        success=True,
        extracted_text=clean_text,
        medications=medications,
        schedule=schedule,
        warnings=warnings,
    )
