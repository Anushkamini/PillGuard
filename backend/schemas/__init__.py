"""Pydantic schemas mirroring the request/response shapes used by the routes."""

from pydantic import BaseModel, Field


class MedicationSchema(BaseModel):
    id: int
    medicine_name: str
    dosage: str | None = None
    dose_amount: str | None = None
    frequency: str | None = None
    meal_instruction: str | None = None
    duration: str | None = None


class ScheduleEntrySchema(BaseModel):
    id: int
    medicine_name: str
    dose: str | None = None
    time: str
    meal_instruction: str | None = None
    time_source: str = "system"
    compartment: int | None = None
    status: str = "pending"


class NextDoseSchema(BaseModel):
    medicine_name: str
    dose: str | None = None
    time: str
    meal_instruction: str | None = None
    compartment: int | None = None


class DeviceScheduleEntry(BaseModel):
    compartment: int
    medicine_name: str
    time: str
    dose: str | None = None
