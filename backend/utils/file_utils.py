"""Utility helpers for uploaded prescription files."""

import os
import tempfile

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg"}
MAX_UPLOAD_BYTES = 20 * 1024 * 1024  # 20 MB


def allowed_file(filename: str) -> bool:
    ext = os.path.splitext(filename)[1].lower()
    return ext in ALLOWED_EXTENSIONS


def save_temp_file(content: bytes, filename: str) -> str:
    """Persist uploaded bytes to a temp file and return its path."""
    ext = os.path.splitext(filename)[1].lower()
    fd, path = tempfile.mkstemp(suffix=ext, prefix="pillguard_")
    with os.fdopen(fd, "wb") as f:
        f.write(content)
    return path


def cleanup_temp_file(path: str) -> None:
    try:
        if path and os.path.exists(path):
            os.remove(path)
    except OSError:
        pass


def sanitize_text(text: str) -> str:
    """Remove control characters and collapse whitespace."""
    if not text:
        return ""
    import re
    text = text.replace("\x00", "")
    text = re.sub(r"[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]", "", text)
    return "\n".join(line.strip() for line in text.splitlines() if line.strip())
