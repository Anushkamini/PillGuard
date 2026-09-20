"""Hugging Face Inference API service.

Sends extracted prescription text to a text-generation model hosted on the
Hugging Face Inference API and parses the structured medication JSON it
returns. The HF token is read from the environment and never exposed to the
frontend.
"""

import json
import logging
import os
import re
from typing import Any

import httpx
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("pillguard.ai")

HF_TOKEN = os.getenv("HF_TOKEN")
HF_MODEL = os.getenv("HF_MODEL", "mistralai/Mistral-7B-Instruct-v0.3")
HF_INFERENCE_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"


def is_configured() -> bool:
    return bool(HF_TOKEN) and HF_TOKEN != "your_huggingface_token_here"


SYSTEM_PROMPT = (
    "You are a medical prescription parser. Read the prescription text and extract "
    "every medicine into a JSON array. Do NOT invent information. If a field is not "
    "present, use null. Respond with ONLY a JSON object of the shape:\n"
    '{"medications": [{"medicine_name": "", "dosage": "", "dose_amount": "", '
    '"frequency": "", "meal_instruction": "", "duration": ""}]}\n'
    "Rules:\n"
    "- medicine_name: the drug name only (no strength).\n"
    "- dosage: the strength (e.g. '500 mg').\n"
    "- dose_amount: per-dose quantity (e.g. '1 tablet').\n"
    "- frequency: plain English frequency (e.g. 'twice daily').\n"
    "- meal_instruction: before/after food or null.\n"
    "- duration: course length (e.g. '5 days').\n"
    "Return ONLY the JSON. No explanations."
)


def _build_prompt(raw_text: str) -> str:
    return f"{SYSTEM_PROMPT}\n\nPrescription text:\n\"\"\"\n{raw_text}\n\"\"\"\n\nJSON:"


def extract_medications(text: str) -> list[dict[str, Any]]:
    """Call the Hugging Face Inference API to parse medications from text.

    Falls back to a regex-based parser if the model is unavailable, so the
    demo still works offline.
    """
    if not is_configured():
        logger.warning("HF_TOKEN not configured — using local regex fallback parser.")
        return _regex_fallback(text)

    payload = {
        "inputs": _build_prompt(text),
        "parameters": {
            "max_new_tokens": 600,
            "temperature": 0.1,
            "return_full_text": False,
        },
    }
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}

    try:
        with httpx.Client(timeout=60.0) as client:
            resp = client.post(HF_INFERENCE_URL, json=payload, headers=headers)
        if resp.status_code != 200:
            logger.warning("HF API returned %s: %s", resp.status_code, resp.text[:300])
            return _regex_fallback(text)
        data = resp.json()
        generated = _extract_generated_text(data)
        medications = _parse_json_from_text(generated)
        if medications is not None:
            return medications
        return _regex_fallback(text)
    except Exception as exc:  # noqa: BLE001
        logger.warning("HF inference failed (%s) — falling back to regex parser.", exc)
        return _regex_fallback(text)


def _extract_generated_text(data: Any) -> str:
    if isinstance(data, list) and data:
        return data[0].get("generated_text", "") if isinstance(data[0], dict) else ""
    if isinstance(data, dict) and "generated_text" in data:
        return data["generated_text"]
    return str(data)


def _parse_json_from_text(text: str) -> list[dict[str, Any]] | None:
    """Find the first JSON object containing a medications array."""
    if not text:
        return None
    # Strip code fences if present.
    text = text.replace("```json", "").replace("```", "").strip()
    # Find the first {...} block.
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return None
    try:
        obj = json.loads(match.group(0))
    except json.JSONDecodeError:
        return None
    meds = obj.get("medications") if isinstance(obj, dict) else None
    if isinstance(meds, list):
        cleaned = []
        for m in meds:
            if not isinstance(m, dict):
                continue
            cleaned.append(
                {
                    "medicine_name": m.get("medicine_name"),
                    "dosage": m.get("dosage"),
                    "dose_amount": m.get("dose_amount"),
                    "frequency": m.get("frequency"),
                    "meal_instruction": m.get("meal_instruction"),
                    "duration": m.get("duration"),
                }
            )
        return cleaned
    return None


# ---------------------------------------------------------------------------
# Local fallback parser — used when the HF model is unavailable or unconfigured.
# Parses common prescription notation like "Tab. Paracetamol 500 mg — 1-0-1, after food × 5 days"
# ---------------------------------------------------------------------------

_FREQ_MAP = {
    "1-0-0": "once daily (morning)",
    "0-1-0": "once daily (afternoon)",
    "0-0-1": "once daily (night)",
    "1-0-1": "twice daily",
    "1-1-1": "three times daily",
    "1-0-1-1": "three times daily",
    "1-1-0-1": "three times daily",
}

_MED_PATTERN = re.compile(
    r"(?:Tab\.?|Tablet|Cap\.?|Capsule|Syp\.?|Syrup|Sachet|Inj\.?|Drop)?\.?\s*"
    r"([A-Za-z][A-Za-z0-9\- /]+?)\s+"
    r"(\d+(?:\.\d+)?\s*(?:mg|mcg|ug|IU|ml|gm|g)\b)?\s*"
    r"[—\-–]\s*"
    r"([\d\- ]+)?,?\s*"
    r"(before food|after food|before bed|with food|empty stomach|at bedtime)?,?\s*"
    r"(?:×|x|for)?\s*(\d+\s*days?)?",
    re.IGNORECASE,
)


def _regex_fallback(text: str) -> list[dict[str, Any]]:
    medications: list[dict[str, Any]] = []
    seen: set[str] = set()
    for match in _MED_PATTERN.finditer(text):
        name = match.group(1).strip()
        dosage = (match.group(2) or "").strip() or None
        freq_code = (match.group(3) or "").strip()
        meal = (match.group(4) or "").strip() or None
        duration = (match.group(5) or "").strip() or None

        freq = _FREQ_MAP.get(freq_code, freq_code or None)
        if freq and freq != freq_code:
            freq = _FREQ_MAP[freq_code]

        key = name.lower()
        if key in seen:
            continue
        seen.add(key)

        medications.append(
            {
                "medicine_name": name,
                "dosage": dosage,
                "dose_amount": "1 tablet" if "tab" in name.lower() or dosage else None,
                "frequency": freq,
                "meal_instruction": meal,
                "duration": duration,
            }
        )
    return medications
