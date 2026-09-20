// Centralized API client for communicating with the PillGuard FastAPI backend.
// The backend URL is read from VITE_API_URL so it's never hardcoded.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  try {
    const resp = await fetch(url, options);
    if (!resp.ok) {
      let detail = `Request failed (${resp.status})`;
      try {
        const body = await resp.json();
        detail = body.detail || body.message || detail;
      } catch (_) {
        // response had no JSON body
      }
      throw new Error(detail);
    }
    return await resp.json();
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Cannot reach the PillGuard backend. Is it running?");
    }
    throw err;
  }
}

export const api = {
  baseUrl: BASE_URL,

  async health() {
    return request("/api/health");
  },

  async uploadPrescription(file) {
    const formData = new FormData();
    formData.append("file", file);
    return request("/api/prescription/upload", { method: "POST", body: formData });
  },

  async getMedications() {
    return request("/api/medications");
  },

  async getSchedule() {
    return request("/api/schedule");
  },

  async getNextDose() {
    return request("/api/schedule/next");
  },

  async getDeviceSchedule() {
    return request("/api/device/schedule");
  },
};
