"""Medications route — returns the most recently extracted medications."""

from fastapi import APIRouter

from routes.prescription import get_latest_result
from schemas import MedicationSchema

router = APIRouter()


@router.get("/api/medications", response_model=dict, tags=["medications"])
def list_medications():
    """Return all medications extracted from the last uploaded prescription."""
    data = get_latest_result()
    meds = data.get("medications", [])
    mapped = [
        MedicationSchema(
            id=i + 1,
            medicine_name=m.get("medicine_name") or "Unknown",
            dosage=m.get("dosage"),
            dose_amount=m.get("dose_amount"),
            frequency=m.get("frequency"),
            meal_instruction=m.get("meal_instruction"),
            duration=m.get("duration"),
        )
        for i, m in enumerate(meds)
    ]
    return {"medications": [m.model_dump() for m in mapped]}
