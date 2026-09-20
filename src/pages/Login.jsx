import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

const FEATURES = [
  { icon: <VerifiedUserRoundedIcon />, title: "AI safety checks", text: "Interaction screening before any schedule goes live." },
  { icon: <MedicationRoundedIcon />, title: "Smart pill box", text: "Compartment-level reminders synced automatically." },
  { icon: <NotificationsActiveRoundedIcon />, title: "Caregiver alerts", text: "Missed dose and low-stock notifications in real time." },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ansh.singh@pillguard.health");
  const [password, setPassword] = useState("caregiver");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    navigate("/app/dashboard");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" } }}>
      {/* Brand / narrative panel */}
      <Box
        sx={{
          position: "relative", display: { xs: "none", md: "flex" }, flexDirection: "column",
          justifyContent: "space-between", p: 6, color: "#fff", overflow: "hidden",
          background: "radial-gradient(120% 120% at 0% 0%, #1B4A93 0%, #0C2A5A 55%, #08203F 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute", inset: 0, opacity: 0.5,
            background:
              "radial-gradient(400px 400px at 85% 15%, rgba(15,181,166,.35), transparent 60%), radial-gradient(500px 500px at 90% 95%, rgba(46,92,174,.4), transparent 60%)",
          }}
        />
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ position: "relative" }}>
          <Box sx={{ width: 46, height: 46, borderRadius: 3, display: "grid", placeItems: "center", background: "linear-gradient(160deg,#fff,#d8f3ef)", color: "#0C2A5A" }}>
            <ShieldRoundedIcon />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, lineHeight: 1 }}>PillGuard</Typography>
            <Typography sx={{ fontSize: 12.5, opacity: 0.8 }}>Smart safety for every dose.</Typography>
          </Box>
        </Stack>

        <Box sx={{ position: "relative", maxWidth: 460 }}>
          <Typography sx={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Confident care, one dose at a time.
          </Typography>
          <Typography sx={{ mt: 2, fontSize: 16, opacity: 0.85, lineHeight: 1.6 }}>
            PillGuard helps caregivers manage medication for elderly and chronically ill patients — from AI prescription
            reading to safety checks and smart-box reminders.
          </Typography>
          <Stack spacing={2} sx={{ mt: 4 }}>
            {FEATURES.map((f) => (
              <Stack key={f.title} direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ width: 40, height: 40, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "rgba(255,255,255,.12)", color: "#7EE8DC", flexShrink: 0 }}>
                  {f.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{f.title}</Typography>
                  <Typography sx={{ fontSize: 13.5, opacity: 0.8 }}>{f.text}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Typography sx={{ position: "relative", fontSize: 12.5, opacity: 0.7 }}>
          HIPAA-aware · Trusted by caregivers · © 2026 PillGuard Health
        </Typography>
      </Box>

      {/* Sign-in panel */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, sm: 6 }, bgcolor: "#fff" }}>
        <Box component="form" onSubmit={submit} sx={{ width: "100%", maxWidth: 400 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4, display: { md: "none" } }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2.5, display: "grid", placeItems: "center", background: "linear-gradient(160deg,#1B4A93,#0FB5A6)", color: "#fff" }}>
              <ShieldRoundedIcon />
            </Box>
            <Typography sx={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 20 }}>PillGuard</Typography>
          </Stack>

          <Typography variant="h4" sx={{ fontSize: 28 }}>Welcome back</Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
            Sign in to continue to your caregiver workspace.
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              label="Email" type="email" fullWidth size="medium" value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><MailOutlineRoundedIcon fontSize="small" /></InputAdornment> }}
            />
            <TextField
              label="Password" type={show ? "text" : "password"} fullWidth size="medium" value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow((s) => !s)} edge="end" size="small">
                      {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                label={<Typography sx={{ fontSize: 14 }}>Remember me</Typography>}
              />
              <Link href="#" underline="hover" sx={{ fontSize: 14, fontWeight: 600 }}>Forgot password?</Link>
            </Stack>
            <Button type="submit" variant="contained" size="large" fullWidth>Sign In</Button>
          </Stack>

          <Divider sx={{ my: 3.5 }}><Typography variant="caption" color="text.secondary">DEMO ACCESS</Typography></Divider>
          <Button variant="outlined" size="large" fullWidth onClick={() => navigate("/app/dashboard")}>
            Continue as Ansh (Caregiver)
          </Button>

          <Typography sx={{ mt: 3.5, textAlign: "center", fontSize: 14, color: "text.secondary" }}>
            Don&apos;t have an account?{" "}
            <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>Create account</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
