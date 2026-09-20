import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";

import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import MedicationRow from "../components/MedicationRow";
import AlertItem from "../components/AlertItem";
import { kpis, todaysMeds, weeklyAdherence, dashboardAlerts } from "../data/mockData";

const ICONS = {
  doses: <TodayRoundedIcon />, adherence: <TrendingUpRoundedIcon />,
  medicines: <MedicationRoundedIcon />, alerts: <WarningAmberRoundedIcon />,
};
const SUBTONE = { adherence: "success", alerts: "warning" };

export default function Dashboard() {
  const navigate = useNavigate();
  const [meds, setMeds] = useState(todaysMeds);

  const take = (id) => setMeds((m) => m.map((x) => (x.id === id ? { ...x, status: "taken" } : x)));

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2} sx={{ mb: 3.5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: { xs: 26, sm: 32 } }}>Good morning, Ansh 👋</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>Here&apos;s your medication safety overview.</Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<AddRoundedIcon />} onClick={() => navigate("/app/prescriptions")}>
          Add Prescription
        </Button>
      </Stack>

      {/* KPIs */}
      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4,1fr)" }, mb: 2.5 }}>
        {kpis.map((k) => (
          <StatCard key={k.key} label={k.label} value={k.value} sub={k.sub} tone={k.tone} icon={ICONS[k.key]} subTone={SUBTONE[k.key]} />
        ))}
      </Box>

      {/* Meds + adherence */}
      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", lg: "1.6fr 1fr" }, mb: 2.5 }}>
        <SectionCard
          title="Today's Medication Schedule"
          icon={<TodayRoundedIcon />}
          action={<Button size="small" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate("/app/schedule")}>Full schedule</Button>}
        >
          <Stack spacing={1.5}>
            {meds.map((m) => <MedicationRow key={m.id} med={m} onTake={take} />)}
          </Stack>
        </SectionCard>

        <SectionCard title="Adherence Overview" subtitle="This week" icon={<TrendingUpRoundedIcon />}>
          <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="h3" sx={{ fontSize: 40 }}>94%</Typography>
            <Typography color="success.main" sx={{ fontWeight: 700 }}>overall</Typography>
          </Stack>
          <Box sx={{ height: 200, mt: 1, ml: -1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAdherence} barSize={26}>
                <CartesianGrid vertical={false} stroke="rgba(18,59,122,.08)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5A6784" }} />
                <YAxis domain={[70, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5A6784" }} width={34} />
                <Tooltip
                  cursor={{ fill: "rgba(18,59,122,.05)" }}
                  contentStyle={{ borderRadius: 12, border: "1px solid rgba(18,59,122,.12)", fontSize: 13 }}
                  formatter={(v) => [`${v}%`, "Adherence"]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {weeklyAdherence.map((d, i) => (
                    <Cell key={i} fill={d.value >= 95 ? "#0FB5A6" : d.value >= 90 ? "#2E5CAE" : "#E0870A"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>
      </Box>

      {/* Alerts */}
      <SectionCard
        title="Attention Required"
        icon={<WarningAmberRoundedIcon />}
        action={<Button size="small" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate("/app/alerts")}>All alerts</Button>}
      >
        <Stack spacing={1.5} divider={<Divider flexItem />}>
          {dashboardAlerts.map((a) => (
            <AlertItem
              key={a.id}
              alert={a}
              onAction={() => navigate(a.type === "stock" ? "/app/smart-box" : a.type === "device" ? "/app/smart-box" : "/app/alerts")}
            />
          ))}
        </Stack>
      </SectionCard>

      <Box sx={{ mt: 2.5 }}>
        <SectionCard>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 48, height: 48, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "rgba(15,181,166,.12)", color: "secondary.dark" }}>
                <Inventory2RoundedIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Smart Box is online</Typography>
                <Typography variant="body2" color="text.secondary">Battery 82% · Last synced 1 minute ago · Next reminder 08:00 PM</Typography>
              </Box>
            </Stack>
            <Button variant="outlined" onClick={() => navigate("/app/smart-box")}>Open Smart Box</Button>
          </Stack>
        </SectionCard>
      </Box>
    </Box>
  );
}
