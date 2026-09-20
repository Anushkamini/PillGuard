import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import AppShell from "./components/AppShell";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import PrescriptionUpload from "./pages/PrescriptionUpload";
import Schedule from "./pages/Schedule";
import Adherence from "./pages/Adherence";
import Alerts from "./pages/Alerts";
import SmartBoxPage from "./pages/SmartBoxPage";
import Settings from "./pages/Settings";
import DoseReminder from "./pages/DoseReminder";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetails />} />
            <Route path="prescriptions" element={<PrescriptionUpload />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="adherence" element={<Adherence />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="smart-box" element={<SmartBoxPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/reminder" element={<DoseReminder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
