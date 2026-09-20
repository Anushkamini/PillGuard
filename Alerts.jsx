import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import AlertItem from "../components/AlertItem";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import { allAlerts } from "../data/mockData";

const FILTERS = ["All", "Missed Dose", "Safety", "Low Stock", "Device"];

export default function Alerts() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [items, setItems] = useState(allAlerts);
  const [toast, setToast] = useState("");

  const filtered = items.filter((a) => tab === 0 || a.category === FILTERS[tab]);

  const resolve = (id) => {
    setItems((x) => x.filter((a) => a.id !== id));
    setToast("Alert marked as resolved.");
  };
  const onAction = (a) => {
    if (a.category === "Low Stock" || a.category === "Device") navigate("/app/smart-box");
    else setToast(`Opening details for “${a.title}”.`);
  };

  const counts = FILTERS.map((f, i) => (i === 0 ? items.length : items.filter((a) => a.category === f).length));

  return (
    <Box>
      <PageHeader title="Alerts" subtitle="Missed doses, safety, stock and device notifications." />

      <SectionCard
        icon={<CampaignRoundedIcon />}
        title="Alert Center"
        action={
          <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ minHeight: 0, "& .MuiTab-root": { minHeight: 40, textTransform: "none", fontWeight: 600 } }}>
            {FILTERS.map((f, i) => <Tab key={f} label={`${f} (${counts[i]})`} />)}
          </Tabs>
        }
      >
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
            <InboxRoundedIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography sx={{ fontWeight: 600 }}>No alerts here</Typography>
            <Typography variant="body2">You&apos;re all caught up in this category.</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {filtered.map((a) => (
              <Box key={a.id} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(18,59,122,.1)" }}>
                <AlertItem alert={a} onAction={onAction} onResolve={resolve} />
              </Box>
            ))}
          </Stack>
        )}
      </SectionCard>

      <Snackbar open={!!toast} autoHideDuration={2600} onClose={() => setToast("")} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setToast("")} sx={{ borderRadius: 3 }}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
