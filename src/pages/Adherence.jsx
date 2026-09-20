import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import { weeklyAdherence, monthlyTrend, medicationAdherence, doseBreakdown } from "../data/mockData";

export default function Adherence() {
  const totalDoses = doseBreakdown.reduce((s, d) => s + d.value, 0);
  return (
    <Box>
      <PageHeader title="Adherence Analytics" subtitle="Track how consistently doses are taken across patients." />

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, mb: 2.5 }}>
        <StatCard label="Overall" value="94%" sub="All patients" tone="primary" icon={<TrendingUpRoundedIcon />} />
        <StatCard label="This Week" value="96%" sub="↑ 2% vs last week" tone="success" subTone="success" icon={<CalendarTodayRoundedIcon />} />
        <StatCard label="This Month" value="94%" sub="Steady" tone="secondary" icon={<EventRepeatRoundedIcon />} />
        <StatCard label="Missed" value="3" sub="doses this month" tone="warning" subTone="warning" icon={<RemoveCircleOutlineRoundedIcon />} />
      </Box>

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, mb: 2.5 }}>
        <SectionCard title="Weekly Adherence" icon={<CalendarTodayRoundedIcon />}>
          <Box sx={{ height: 240, ml: -1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAdherence} barSize={30}>
                <CartesianGrid vertical={false} stroke="rgba(18,59,122,.08)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5A6784" }} />
                <YAxis domain={[70, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5A6784" }} width={34} />
                <Tooltip cursor={{ fill: "rgba(18,59,122,.05)" }} contentStyle={{ borderRadius: 12, border: "1px solid rgba(18,59,122,.12)", fontSize: 13 }} formatter={(v) => [`${v}%`, "Adherence"]} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {weeklyAdherence.map((d, i) => <Cell key={i} fill={d.value >= 95 ? "#0FB5A6" : d.value >= 90 ? "#2E5CAE" : "#E0870A"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>

        <SectionCard title="Monthly Trend" subtitle="30-day adherence" icon={<TrendingUpRoundedIcon />}>
          <Box sx={{ height: 240, ml: -1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid vertical={false} stroke="rgba(18,59,122,.08)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5A6784" }} interval={4} />
                <YAxis domain={[70, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5A6784" }} width={34} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(18,59,122,.12)", fontSize: 13 }} formatter={(v) => [`${v}%`, "Adherence"]} labelFormatter={(l) => `Day ${l}`} />
                <Line type="monotone" dataKey="value" stroke="#123B7A" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#0FB5A6" }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>
      </Box>

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", lg: "1.3fr 1fr" } }}>
        <SectionCard title="Medication Adherence" icon={<TrendingUpRoundedIcon />}>
          <Stack spacing={2.5}>
            {medicationAdherence.map((m) => (
              <Box key={m.name}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                  <Typography sx={{ fontWeight: 600 }}>{m.name}</Typography>
                  <Typography sx={{ fontWeight: 700, color: m.value >= 95 ? "success.main" : "warning.main" }}>{m.value}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={m.value} color={m.value >= 95 ? "success" : "warning"} sx={{ height: 9, borderRadius: 5, bgcolor: "rgba(18,59,122,.08)" }} />
              </Box>
            ))}
          </Stack>
          <Box sx={{ mt: 3, p: 2.5, borderRadius: 3, display: "flex", gap: 2, alignItems: "flex-start", bgcolor: "rgba(15,181,166,.07)", border: "1px solid rgba(15,181,166,.2)" }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "secondary.main", color: "#fff", flexShrink: 0 }}>
              <LightbulbRoundedIcon />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Insight</Typography>
              <Typography variant="body2" color="text.secondary">Most missed doses occur between 8 PM and 10 PM. Consider an earlier evening reminder.</Typography>
            </Box>
          </Box>
        </SectionCard>

        <SectionCard title="Dose Breakdown" subtitle={`${totalDoses} doses this month`} icon={<EventRepeatRoundedIcon />}>
          <Box sx={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={doseBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {doseBreakdown.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(18,59,122,.12)", fontSize: 13 }} />
                <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 13, color: "#5A6784" }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>
      </Box>
    </Box>
  );
}
