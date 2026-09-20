import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { patients } from "../data/mockData";

function adherenceColor(v) {
  return v >= 90 ? "success" : v >= 80 ? "warning" : "error";
}

export default function Patients() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const list = patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <Box>
      <PageHeader
        title="Patients"
        subtitle="People under your care and their medication status."
        actions={<Button variant="contained" size="large" startIcon={<AddRoundedIcon />}>Add Patient</Button>}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search patients…" value={q} onChange={(e) => setQ(e.target.value)}
          sx={{ maxWidth: { sm: 360 }, bgcolor: "#fff", borderRadius: 3 }} fullWidth
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> }}
        />
        <Button variant="outlined" startIcon={<TuneRoundedIcon />} sx={{ bgcolor: "#fff" }}>Filter</Button>
      </Stack>

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        {list.map((p) => (
          <Card key={p.id} sx={{ "&:hover": { transform: "translateY(-3px)", borderColor: "rgba(18,59,122,.25)" } }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontFamily: "'Sora'", fontSize: 20 }}>{p.initials}</Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: 19 }}>{p.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Age {p.age} · {p.medicines} active medicines</Typography>
                    <Stack direction="row" spacing={0.75} sx={{ mt: 1, flexWrap: "wrap", gap: 0.75 }}>
                      {p.conditions.map((c) => (
                        <Chip key={c} label={c} size="small" variant="outlined" sx={{ borderColor: "rgba(18,59,122,.15)" }} />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
                <StatusBadge status={p.status === "Stable" ? "stable" : "attention"} label={p.status} variant="soft" />
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Adherence</Typography>
                <Typography sx={{ fontWeight: 700, color: `${adherenceColor(p.adherence)}.main` }}>{p.adherence}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate" value={p.adherence} color={adherenceColor(p.adherence)}
                sx={{ height: 8, borderRadius: 5, bgcolor: "rgba(18,59,122,.08)" }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2.5 }}>
                <Chip
                  size="small" icon={<Inventory2RoundedIcon />}
                  label={`Smart Box ${p.box}`}
                  color={p.box === "Online" ? "success" : "error"} variant="outlined"
                />
                <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate(`/app/patients/${p.id}`)}>
                  View Patient
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
