"""OCR / text extraction service for prescription files.

Kept separate from the AI service so it can be swapped out later.
Uses pytesseract for images and pdfplumber for PDFs. Both degrade
gracefully: if a dependency is missing the caller gets a clear error.
"""

import io
import logging

logger = logging.getLogger("pillguard.ocr")


def extract_text_from_file(path: str, filename: str) -> str:
    """Return raw text extracted from an uploaded prescription file.

    Args:
        path: local filesystem path to the uploaded file.
        filename: original filename (used to detect extension).

    Returns:
        Extracted text string (may be empty).

    Raises:
        RuntimeError: if no text could be extracted.
    """
    ext = filename.lower().rsplit(".", 1)[-1]
    if ext == "pdf":
        return _extract_from_pdf(path)
    if ext in ("png", "jpg", "jpeg"):
        return _extract_from_image(path)
    raise RuntimeError(f"Unsupported file type: .{ext}")


def _extract_from_pdf(path: str) -> str:
    """Try digital text first, fall back to OCR on rendered pages."""
    text = ""
    try:
        import pdfplumber
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except Exception as exc:  # noqa: BLE001
        logger.warning("pdfplumber failed: %s", exc)

    if text.strip():
        return text.strip()

    # Image-only PDF — render to images and OCR.
    try:
        return _ocr_pdf_pages(path)
    except Exception as exc:  # noqa: BLE001
        raise RuntimeError(f"Could not extract text from PDF: {exc}") from exc


def _ocr_pdf_pages(path: str) -> str:
    try:
        import pdf2image  # type: ignore
        import pytesseract
    except ImportError as exc:
        raise RuntimeError(
            "pdf2image/pytesseract not installed for scanned PDF OCR"
        ) from exc

    pages = pdf2image.convert_from_path(path, dpi=200)
    chunks = [pytesseract.image_to_string(p) for p in pages]
    return "\n".join(c for c in chunks if c.strip())


def _extract_from_image(path: str) -> str:
    try:
        import pytesseract
        from PIL import Image
    except ImportError as exc:
        raise RuntimeError("pytesseract/Pillow not installed for image OCR") from exc

    image = Image.open(io.BytesIO(open(path, "rb").read()))
    text = pytesseract.image_to_string(image)
    if not text.strip():
        raise RuntimeError("OCR returned no text — the image may be blank or unclear.")
    return text.strip()
