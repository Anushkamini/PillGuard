import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SnoozeRoundedIcon from "@mui/icons-material/SnoozeRounded";
import MedicationLiquidRoundedIcon from "@mui/icons-material/MedicationLiquidRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

export default function DoseReminder() {
  const navigate = useNavigate();
  const [state, setState] = useState("active"); // active | taken | snoozed

  return (
    <Box
      sx={{
        minHeight: "100vh", display: "grid", placeItems: "center", p: 3,
        background: "radial-gradient(120% 120% at 50% 0%, #123B7A 0%, #0C2A5A 60%, #08203F 100%)",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 520, animation: "pg-fade-up .4s ease" }}>
        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mb: 3, color: "#fff" }}>
          <ShieldRoundedIcon />
          <Typography sx={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 18 }}>PillGuard Reminder</Typography>
        </Stack>

        <Box sx={{ bgcolor: "#fff", borderRadius: 6, p: { xs: 3, sm: 5 }, textAlign: "center", boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)" }}>
          {state === "active" && (
            <>
              <Typography sx={{ fontWeight: 700, color: "secondary.dark", letterSpacing: 2, fontSize: 15 }}>DOSE REMINDER</Typography>
              <Typography sx={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 56, lineHeight: 1, my: 1.5, color: "primary.main" }}>08:00 PM</Typography>

              <Box sx={{ width: 120, height: 120, mx: "auto", my: 3, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "rgba(15,181,166,.12)", color: "secondary.dark", animation: "pg-pulse 2s infinite" }}>
                <MedicationLiquidRoundedIcon sx={{ fontSize: 64 }} />
              </Box>

              <Typography sx={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 34 }}>Atorvastatin 20 mg</Typography>
              <Typography sx={{ fontSize: 24, mt: 1, color: "text.secondary" }}>Take <b style={{ color: "#101B33" }}>1 tablet</b></Typography>

              <Box sx={{ my: 3, p: 2.5, borderRadius: 4, bgcolor: "rgba(18,59,122,.05)" }}>
                <Typography sx={{ fontSize: 22, fontWeight: 700 }}>Take before bed</Typography>
                <Typography sx={{ fontSize: 20, mt: 0.5, color: "text.secondary" }}>Compartment <b style={{ color: "#123B7A" }}>03</b></Typography>
              </Box>

              <Stack spacing={2}>
                <Button
                  variant="contained" color="secondary"
                  startIcon={<CheckRoundedIcon sx={{ fontSize: 34 }} />}
                  onClick={() => setState("taken")}
                  sx={{ py: 2.5, fontSize: 26, borderRadius: 4 }}
                >
                  Taken
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SnoozeRoundedIcon sx={{ fontSize: 30 }} />}
                  onClick={() => setState("snoozed")}
                  sx={{ py: 2, fontSize: 22, borderRadius: 4, borderWidth: 2, "&:hover": { borderWidth: 2 } }}
                >
                  Snooze 10 min
                </Button>
              </Stack>
            </>
          )}

          {state !== "active" && (
            <Box sx={{ py: 4 }}>
              <Box sx={{ width: 120, height: 120, mx: "auto", mb: 3, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: state === "taken" ? "success.light" : "warning.light", color: state === "taken" ? "success.main" : "warning.main" }}>
                {state === "taken" ? <CheckCircleRoundedIcon sx={{ fontSize: 72 }} /> : <SnoozeRoundedIcon sx={{ fontSize: 72 }} />}
              </Box>
              <Typography sx={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 34 }}>
                {state === "taken" ? "Well done!" : "Snoozed"}
              </Typography>
              <Typography sx={{ fontSize: 22, mt: 1.5, color: "text.secondary" }}>
                {state === "taken"
                  ? "Dose confirmed. Adherence updated and your caregiver has been notified."
                  : "We'll remind you again in 10 minutes."}
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 4 }}>
                <Button variant="contained" size="large" sx={{ py: 1.75, fontSize: 20, borderRadius: 4 }} onClick={() => navigate("/app/dashboard")}>
                  Back to Dashboard
                </Button>
                {state === "snoozed" && (
                  <Button color="inherit" size="large" sx={{ fontSize: 18 }} onClick={() => setState("active")}>Show reminder again</Button>
                )}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
