"""Pydantic data models shared across the PillGuard backend."""

from pydantic import BaseModel, Field


class MedicationInfo(BaseModel):
    medicine_name: str = Field(..., description="Name of the medicine, e.g. Paracetamol")
    dosage: str | None = Field(None, description="Strength, e.g. 500 mg")
    dose_amount: str | None = Field(None, description="Per-dose quantity, e.g. 1 tablet")
    frequency: str | None = Field(None, description="How often, e.g. twice daily")
    meal_instruction: str | None = Field(None, description="Before/after food, etc.")
    duration: str | None = Field(None, description="Course length, e.g. 5 days")


class ScheduleEntry(BaseModel):
    medicine_name: str
    dose: str | None = None
    time: str = Field(..., description="24-hour HH:MM")
    meal_instruction: str | None = None
    time_source: str = Field("system", description="doctor or system")
    compartment: int | None = None


class PrescriptionResponse(BaseModel):
    success: bool
    extracted_text: str | None = None
    medications: list[MedicationInfo] = []
    schedule: list[ScheduleEntry] = []
    warnings: list[str] = []
    error: str | None = None


class HealthResponse(BaseModel):
    status: str
    service: str
    huggingface_configured: bool
