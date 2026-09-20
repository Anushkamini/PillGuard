import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import StatusBadge from "../components/StatusBadge";

import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import Battery80RoundedIcon from "@mui/icons-material/Battery80Rounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MedicationLiquidRoundedIcon from "@mui/icons-material/MedicationLiquidRounded";

import { compartments } from "../data/mockData";

const STATUS = {
  loaded: { color: "success", label: "Loaded" },
  low: { color: "warning", label: "Low" },
  empty: { color: "default", label: "Empty" },
};

export default function SmartBoxPage() {
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState("");

  const sync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setToast("Schedule synced to Smart Box."); }, 1600);
  };

  return (
    <Box>
      <PageHeader
        title="Smart Box"
        subtitle="Rajesh Kumar's connected medication dispenser."
        actions={<StatusBadge status="online" variant="soft" />}
      />

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, mb: 2.5 }}>
        <StatCard label="Connection" value="Online" sub="Strong signal" tone="success" icon={<WifiRoundedIcon />} />
        <StatCard label="Battery" value="82%" sub="~3 days left" tone="secondary" icon={<Battery80RoundedIcon />} />
        <StatCard label="Last Synced" value="1 min" sub="ago" tone="primary" icon={<SyncRoundedIcon />} />
        <StatCard label="Next Reminder" value="08:00" sub="PM · Atorvastatin" tone="warning" icon={<NotificationsActiveRoundedIcon />} />
      </Box>

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" } }}>
        <SectionCard title="Compartments" subtitle="Physical layout of the dispenser" icon={<Inventory2RoundedIcon />}>
          <Box
            sx={{
              p: 3, borderRadius: 4,
              background: "linear-gradient(160deg,#0C2A5A,#123B7A)",
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: 12, fontWeight: 700, letterSpacing: 2, mb: 2, textAlign: "center" }}>
              PILLGUARD SMART BOX · SG-4
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {compartments.map((c) => {
                const empty = c.status === "empty";
                return (
                  <Box
                    key={c.id}
                    sx={{
                      p: 2, borderRadius: 3, minHeight: 118,
                      bgcolor: empty ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.95)",
                      border: c.status === "low" ? "2px solid #E0870A" : "2px solid transparent",
                      transition: "transform .2s", "&:hover": { transform: "translateY(-2px)" },
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box sx={{ width: 30, height: 30, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: empty ? "rgba(255,255,255,.12)" : "rgba(18,59,122,.1)", color: empty ? "rgba(255,255,255,.6)" : "primary.main", fontWeight: 800, fontFamily: "'Sora'", fontSize: 14 }}>
                        {c.id}
                      </Box>
                      {!empty && <MedicationLiquidRoundedIcon sx={{ color: "secondary.dark" }} />}
                    </Stack>
                    {empty ? (
                      <Typography sx={{ color: "rgba(255,255,255,.55)", mt: 1.5, fontWeight: 600 }}>Empty</Typography>
                    ) : (
                      <>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, mt: 1.25, color: "#101B33" }}>{c.name}</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.75 }}>
                          <Typography sx={{ fontSize: 12, color: c.status === "low" ? "#B96D05" : "#5A6784", fontWeight: 600 }}>{c.remaining} doses left</Typography>
                          <Chip size="small" color={STATUS[c.status].color} label={c.status === "low" ? "Low" : "Next " + c.next} sx={{ height: 20, fontSize: 11 }} />
                        </Stack>
                      </>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </SectionCard>

        <Stack spacing={2.5}>
          <SectionCard title="Device Controls" icon={<SyncRoundedIcon />}>
            <Stack spacing={1.5}>
              <Button variant="contained" size="large" fullWidth startIcon={syncing ? <CircularProgress size={18} color="inherit" /> : <SyncRoundedIcon />} onClick={sync} disabled={syncing}>
                {syncing ? "Syncing…" : "Sync Schedule"}
              </Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<NotificationsActiveRoundedIcon />} onClick={() => navigate("/reminder")}>
                Test Reminder
              </Button>
            </Stack>
          </SectionCard>

          <SectionCard title="Device Health" icon={<WifiRoundedIcon />}>
            <Stack spacing={1.5}>
              {[["Firmware", "v2.4.1 · up to date"], ["Serial", "PG-SG4-08842"], ["Reminder sound", "Chime · Medium"], ["Backup power", "Enabled"]].map(([k, v]) => (
                <Stack key={k} direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">{k}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{v}</Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Stack>
      </Box>

      <Snackbar open={!!toast} autoHideDuration={2600} onClose={() => setToast("")} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setToast("")} sx={{ borderRadius: 3 }}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
