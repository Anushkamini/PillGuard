"""Schedule route — returns the generated schedule and next dose."""

from fastapi import APIRouter

from routes.prescription import get_latest_result
from schemas import DeviceScheduleEntry, NextDoseSchema, ScheduleEntrySchema
from services.schedule_service import get_next_dose

router = APIRouter()


@router.get("/api/schedule", response_model=dict, tags=["schedule"])
def get_schedule():
    """Return the generated daily medication schedule."""
    data = get_latest_result()
    rows = data.get("schedule", [])
    mapped = [
        ScheduleEntrySchema(
            id=i + 1,
            medicine_name=r.get("medicine_name") or "Unknown",
            dose=r.get("dose"),
            time=r.get("time", "08:00"),
            meal_instruction=r.get("meal_instruction"),
            time_source=r.get("time_source", "system"),
            compartment=r.get("compartment"),
            status="pending",
        )
        for i, r in enumerate(rows)
    ]
    return {"schedule": [m.model_dump() for m in mapped]}


@router.get("/api/schedule/next", response_model=NextDoseSchema | dict, tags=["schedule"])
def get_next():
    """Return the next upcoming dose, or an empty object if none."""
    data = get_latest_result()
    rows = data.get("schedule", [])
    entry = get_next_dose(rows)
    if not entry:
        return {}
    return NextDoseSchema(
        medicine_name=entry.get("medicine_name") or "Unknown",
        dose=entry.get("dose"),
        time=entry.get("time", "08:00"),
        meal_instruction=entry.get("meal_instruction"),
        compartment=entry.get("compartment"),
    ).model_dump()


@router.get("/api/device/schedule", response_model=dict, tags=["device"])
def get_device_schedule():
    """Return a compartment-mapped schedule for the ESP32 Smart Box."""
    data = get_latest_result()
    rows = data.get("schedule", [])
    device_entries = [
        DeviceScheduleEntry(
            compartment=r.get("compartment") or (i + 1),
            medicine_name=r.get("medicine_name") or "Unknown",
            time=r.get("time", "08:00"),
            dose=r.get("dose"),
        )
        for i, r in enumerate(rows)
    ]
    return {"schedule": [e.model_dump() for e in device_entries]}
