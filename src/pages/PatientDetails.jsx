import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

import SectionCard from "../components/SectionCard";
import StatusBadge from "../components/StatusBadge";
import MedicationRow from "../components/MedicationRow";
import AlertItem from "../components/AlertItem";
import { patients, todaysMeds, medicationList, monthlyTrend, dashboardAlerts } from "../data/mockData";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((p) => p.id === id) || patients[0];
  const [meds, setMeds] = useState(todaysMeds);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    { id: "n1", author: "Ansh", time: "Yesterday, 9:12 AM", text: "Rajesh reported mild dizziness in the morning. Monitoring blood pressure this week." },
  ]);
  const take = (mid) => setMeds((m) => m.map((x) => (x.id === mid ? { ...x, status: "taken" } : x)));
  const addNote = () => {
    if (!note.trim()) return;
    setNotes((n) => [{ id: `n${Date.now()}`, author: "Ansh", time: "Just now", text: note.trim() }, ...n]);
    setNote("");
  };

  const stat = (label, value, tone) => (
    <Box sx={{ textAlign: "center", px: 2 }}>
      <Typography variant="h4" sx={{ fontSize: 28, color: tone ? `${tone}.main` : "text.primary" }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );

  return (
    <Box>
      <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate("/app/patients")} sx={{ mb: 2, color: "text.secondary" }}>
        Back to Patients
      </Button>

      {/* Header card */}
      <Box sx={{ mb: 2.5 }}>
        <SectionCard>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ md: "center" }} justifyContent="space-between">
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Avatar sx={{ width: 72, height: 72, bgcolor: "primary.main", fontFamily: "'Sora'", fontSize: 26 }}>{patient.initials}</Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontSize: 28 }}>{patient.name}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}>
                  <Typography color="text.secondary">Age {patient.age}</Typography>
                  <Chip size="small" icon={<Inventory2RoundedIcon />} label={`Smart Box ${patient.box}`} color={patient.box === "Online" ? "success" : "error"} variant="outlined" />
                  <StatusBadge status={patient.status === "Stable" ? "stable" : "attention"} label={patient.status} variant="soft" />
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
              {stat("Adherence", `${patient.adherence}%`, "success")}
              {stat("Medicines", patient.medicines, "primary")}
              {stat("Missed (30d)", "3", "warning")}
            </Stack>
          </Stack>
        </SectionCard>
      </Box>

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" } }}>
        <Stack spacing={2.5}>
          <SectionCard title="Today's Doses" icon={<TodayRoundedIcon />}>
            <Stack spacing={1.5}>{meds.map((m) => <MedicationRow key={m.id} med={m} onTake={take} />)}</Stack>
          </SectionCard>

          <SectionCard title="Medication List" icon={<MedicationRoundedIcon />}>
            <Box sx={{ overflowX: "auto" }}>
              <Table size="small" sx={{ minWidth: 480 }}>
                <TableHead>
                  <TableRow>
                    {["Medicine", "Frequency", "Compartment", "Remaining", "Adherence"].map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 700, color: "text.secondary", borderColor: "rgba(18,59,122,.08)" }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicationList.map((m) => (
                    <TableRow key={m.name} hover>
                      <TableCell sx={{ borderColor: "rgba(18,59,122,.06)" }}>
                        <Typography sx={{ fontWeight: 700 }}>{m.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{m.strength} · {m.food}</Typography>
                      </TableCell>
                      <TableCell sx={{ borderColor: "rgba(18,59,122,.06)" }}>{m.freq}</TableCell>
                      <TableCell sx={{ borderColor: "rgba(18,59,122,.06)" }}>
                        <Chip size="small" label={m.compartment} variant="outlined" sx={{ borderColor: "rgba(18,59,122,.15)" }} />
                      </TableCell>
                      <TableCell sx={{ borderColor: "rgba(18,59,122,.06)" }}>
                        <Chip size="small" label={`${m.remaining} doses`} color={m.remaining <= 5 ? "warning" : "default"} variant={m.remaining <= 5 ? "filled" : "outlined"} />
                      </TableCell>
                      <TableCell sx={{ borderColor: "rgba(18,59,122,.06)", fontWeight: 700, color: m.adherence >= 95 ? "success.main" : "warning.main" }}>{m.adherence}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </SectionCard>

          <SectionCard title="Adherence Trend" subtitle="Last 30 days" icon={<InsightsRoundedIcon />}>
            <Box sx={{ height: 220, ml: -1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="pdArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0FB5A6" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0FB5A6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(18,59,122,.08)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5A6784" }} interval={4} />
                  <YAxis domain={[70, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5A6784" }} width={32} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(18,59,122,.12)", fontSize: 13 }} formatter={(v) => [`${v}%`, "Adherence"]} labelFormatter={(l) => `Day ${l}`} />
                  <Area type="monotone" dataKey="value" stroke="#0A8A7F" strokeWidth={2.5} fill="url(#pdArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Stack>

        <Stack spacing={2.5}>
          <SectionCard title="Safety Alerts" icon={<WarningAmberRoundedIcon />}>
            <Stack spacing={1.5} divider={<Divider flexItem />}>
              {dashboardAlerts.slice(0, 2).map((a) => (
                <AlertItem key={a.id} alert={a} onAction={() => navigate("/app/alerts")} />
              ))}
            </Stack>
          </SectionCard>

          <SectionCard title="Medication Inventory" icon={<Inventory2RoundedIcon />}>
            <Stack spacing={2}>
              {medicationList.map((m) => {
                const pct = Math.min(100, (m.remaining / 30) * 100);
                return (
                  <Box key={m.name}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{m.name}</Typography>
                      <Typography variant="body2" color={m.remaining <= 5 ? "warning.main" : "text.secondary"} sx={{ fontWeight: 600 }}>{m.remaining} doses</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={pct} color={m.remaining <= 5 ? "warning" : "secondary"} sx={{ height: 7, borderRadius: 5, bgcolor: "rgba(18,59,122,.08)" }} />
                  </Box>
                );
              })}
            </Stack>
          </SectionCard>

          <SectionCard title="Caregiver Notes" icon={<EditNoteRoundedIcon />}>
            <Stack spacing={1.5}>
              <TextField placeholder="Add a note about this patient…" multiline minRows={2} value={note} onChange={(e) => setNote(e.target.value)} fullWidth />
              <Button variant="contained" onClick={addNote} sx={{ alignSelf: "flex-end" }}>Save Note</Button>
              <Divider />
              {notes.map((n) => (
                <Box key={n.id} sx={{ p: 1.75, borderRadius: 2.5, bgcolor: "rgba(18,59,122,.04)" }}>
                  <Typography variant="body2">{n.text}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>{n.author} · {n.time}</Typography>
                </Box>
              ))}
            </Stack>
          </SectionCard>
        </Stack>
      </Box>
    </Box>
  );
}
