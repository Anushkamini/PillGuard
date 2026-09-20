"""Medication schedule generation service.

Converts structured medication information into a practical daily schedule
using deterministic rules. Doctor-specified times are never overridden; when
only a frequency is given, system times are generated and flagged.
"""

import re
from datetime import datetime, timedelta
from typing import Any

# Default times (24-hour) used when the prescription doesn't give explicit times.
FREQ_TIMES: dict[str, list[str]] = {
    "once daily": ["08:00"],
    "once daily (morning)": ["08:00"],
    "once daily (afternoon)": ["13:00"],
    "once daily (night)": ["20:00"],
    "twice daily": ["08:00", "20:00"],
    "three times daily": ["08:00", "14:00", "20:00"],
    "four times daily": ["08:00", "13:00", "18:00", "22:00"],
    "weekly": ["08:00"],
}

TIME_KEYWORDS: dict[str, str] = {
    "morning": "08:00",
    "afternoon": "13:00",
    "noon": "12:00",
    "evening": "18:00",
    "night": "20:00",
    "bedtime": "22:00",
    "before bed": "22:00",
    "at bedtime": "22:00",
}


def generate_schedule(medications: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Build a daily schedule from extracted medications."""
    schedule: list[dict[str, Any]] = []
    compartment = 1

    for med in medications:
        name = med.get("medicine_name")
        if not name:
            continue
        frequency = (med.get("frequency") or "").lower().strip()
        meal = med.get("meal_instruction")
        dose = med.get("dose_amount")

        times, time_source = _resolve_times(frequency, meal)

        for time in times:
            schedule.append(
                {
                    "medicine_name": name,
                    "dose": dose,
                    "time": time,
                    "meal_instruction": meal,
                    "time_source": time_source,
                    "compartment": compartment,
                }
            )
        compartment += 1

    schedule.sort(key=lambda s: s["time"])
    return schedule


def _resolve_times(frequency: str, meal: str | None) -> tuple[list[str], str]:
    """Determine dosing times, preferring doctor-specified times."""
    doctor_times = _extract_explicit_times(frequency)
    if doctor_times:
        return doctor_times, "doctor"

    if frequency in FREQ_TIMES:
        return FREQ_TIMES[frequency], "system"

    # Try matching by meal/keyword.
    if meal:
        meal_lower = meal.lower()
        for keyword, t in TIME_KEYWORDS.items():
            if keyword in meal_lower:
                return [t], "system"

    # Default: once daily in the morning.
    return ["08:00"], "system"


def _extract_explicit_times(text: str) -> list[str]:
    """Find explicit clock times like '8 AM and 8 PM' in the frequency string."""
    if not text:
        return []

    times: list[str] = []
    # Match "8 AM", "8:00", "08:00", "20:00", "8 am", "9 pm"
    pattern = re.compile(r"\b(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m\.?)?\b", re.IGNORECASE)
    for match in pattern.finditer(text):
        hour = int(match.group(1))
        minute = int(match.group(2) or 0)
        ampm = (match.group(3) or "").lower().replace(".", "")

        if ampm == "pm" and hour < 12:
            hour += 12
        elif ampm == "am" and hour == 12:
            hour = 0
        elif not ampm and hour < 12:
            # Ambiguous without AM/PM — skip unless it looks like 24-hour.
            continue

        if 0 <= hour <= 23 and 0 <= minute <= 59:
            times.append(f"{hour:02d}:{minute:02d}")

    return times


def get_next_dose(schedule: list[dict[str, Any]]) -> dict[str, Any] | None:
    """Return the next upcoming dose relative to the current time."""
    if not schedule:
        return None
    now = datetime.now()
    today = now.date()
    upcoming: list[tuple[datetime, dict[str, Any]]] = []
    for entry in schedule:
        try:
            t = datetime.strptime(entry["time"], "%H:%M").time()
        except (KeyError, ValueError):
            continue
        dt = datetime.combine(today, t)
        if dt < now:
            dt += timedelta(days=1)
        upcoming.append((dt, entry))
    if not upcoming:
        return None
    upcoming.sort(key=lambda x: x[0])
    return upcoming[0][1]
