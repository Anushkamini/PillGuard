"""Health check route."""

from fastapi import APIRouter

from models import HealthResponse
from services.ai_service import is_configured as hf_configured

router = APIRouter()


@router.get("/api/health", response_model=HealthResponse, tags=["system"])
def health():
    """Return service status and whether Hugging Face is configured."""
    return HealthResponse(
        status="ok",
        service="PillGuard Backend",
        huggingface_configured=hf_configured(),
    )
