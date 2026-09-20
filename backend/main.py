"""PillGuard FastAPI backend entry point.

Run with:  uvicorn main:app --reload --port 8000
"""

import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.health import router as health_router
from routes.medications import router as medications_router
from routes.prescription import router as prescription_router
from routes.schedule import router as schedule_router

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(name)s  %(message)s")
logger = logging.getLogger("pillguard")

app = FastAPI(
    title="PillGuard Backend",
    description=(
        "AI-powered medication safety backend. Upload a prescription image or PDF, "
        "get back structured medication information and a daily schedule. "
        "Visit /docs for interactive API testing."
    ),
    version="1.0.0",
)

# CORS — allow the frontend dev server and any configured origins.
default_origins = "http://localhost:5173,http://127.0.0.1:5173"
allowed = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", default_origins).split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(prescription_router)
app.include_router(medications_router)
app.include_router(schedule_router)


@app.get("/", tags=["system"])
def root():
    return {"message": "PillGuard Backend is running. Visit /docs for API documentation."}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
