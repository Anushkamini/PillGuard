import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { scheduleRows } from "../data/mockData";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DayView() {
  return (
    <Stack spacing={1.25}>
      {scheduleRows.map((r, i) => (
        <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(18,59,122,.08)", "&:hover": { borderColor: "rgba(18,59,122,.2)" } }}>
          <Chip label={r.time} sx={{ fontWeight: 700, bgcolor: "rgba(18,59,122,.06)", color: "primary.main", minWidth: 96 }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>{r.name}</Typography>
            <Typography variant="body2" color="text.secondary">{r.dose} · {r.food}</Typography>
          </Box>
          <Chip size="small" variant="outlined" label={`Compartment ${r.compartment}`} sx={{ borderColor: "rgba(18,59,122,.15)" }} />
          <Stack direction="row" spacing={0.5}>
            <Button size="small" startIcon={<EditRoundedIcon fontSize="small" />} color="inherit">Edit</Button>
            <Button size="small" startIcon={<VisibilityRoundedIcon fontSize="small" />} color="inherit">View</Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

function WeekView() {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(120px,1fr))", gap: 1.5, minWidth: 840 }}>
        {DAYS.map((d, di) => (
          <Box key={d} sx={{ borderRadius: 3, border: "1px solid rgba(18,59,122,.1)", overflow: "hidden" }}>
            <Box sx={{ px: 1.5, py: 1, bgcolor: "rgba(18,59,122,.05)", fontWeight: 700, textAlign: "center", fontSize: 13 }}>{d}</Box>
            <Stack spacing={1} sx={{ p: 1 }}>
              {scheduleRows.slice(0, di % 2 === 0 ? 4 : 3).map((r, i) => (
                <Box key={i} sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(15,181,166,.08)" }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: "secondary.dark" }}>{r.time}</Typography>
                  <Typography sx={{ fontSize: 12 }} noWrap>{r.name}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function MonthView() {
  const cells = Array.from({ length: 35 }, (_, i) => i - 2); // small leading offset
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, minWidth: 720 }}>
        {DAYS.map((d) => (
          <Typography key={d} sx={{ textAlign: "center", fontWeight: 700, fontSize: 12, color: "text.secondary", pb: 0.5 }}>{d}</Typography>
        ))}
        {cells.map((day, i) => {
          const valid = day >= 1 && day <= 30;
          const doses = valid ? (day % 4 === 0 ? 3 : 4) : 0;
          return (
            <Box key={i} sx={{ aspectRatio: "1 / 0.9", borderRadius: 2, p: 1, border: "1px solid rgba(18,59,122,.08)", bgcolor: valid ? "#fff" : "rgba(18,59,122,.02)", opacity: valid ? 1 : 0.4 }}>
              {valid && (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: "text.secondary" }}>{day}</Typography>
                  <Stack direction="row" spacing={0.4} sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.4 }}>
                    {Array.from({ length: doses }).map((_, k) => (
                      <Box key={k} sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: k === doses - 1 ? "secondary.main" : "primary.main" }} />
                    ))}
                  </Stack>
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function Schedule() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(2);

  return (
    <Box>
      <PageHeader
        title="Medication Schedule"
        subtitle="Rajesh Kumar · 30-day plan · 08 Sep 2026 → 07 Oct 2026"
        actions={<Button variant="contained" startIcon={<CalendarMonthRoundedIcon />} onClick={() => navigate("/app/prescriptions")}>New Schedule</Button>}
      />

      <SectionCard
        action={
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ minHeight: 0, "& .MuiTab-root": { minHeight: 40, textTransform: "none", fontWeight: 600 } }}>
            <Tab label="Month" /><Tab label="Week" /><Tab label="Day" />
          </Tabs>
        }
        title={tab === 0 ? "September 2026" : tab === 1 ? "This Week" : "Today · 08 Sep"}
        icon={<CalendarMonthRoundedIcon />}
      >
        {tab === 0 && <MonthView />}
        {tab === 1 && <WeekView />}
        {tab === 2 && <DayView />}
        <Divider sx={{ my: 2.5 }} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined">Save Draft</Button>
          <Button variant="contained" onClick={() => navigate("/app/prescriptions")}>Confirm &amp; Activate</Button>
        </Stack>
      </SectionCard>
    </Box>
  );
}
