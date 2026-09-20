import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import MedicationLiquidRoundedIcon from "@mui/icons-material/MedicationLiquidRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import StatusBadge from "./StatusBadge";

export default function MedicationRow({ med, onTake }) {
  const taken = med.status === "taken";
  return (
    <Box
      sx={{
        display: "flex", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, p: 2,
        borderRadius: 3, border: "1px solid rgba(18,59,122,.08)",
        flexDirection: { xs: "column", sm: "row" },
        bgcolor: taken ? "rgba(31,157,87,.04)" : "#fff",
        transition: "border-color .2s, background .2s",
        "&:hover": { borderColor: "rgba(18,59,122,.2)" },
      }}
    >
      <Box sx={{ textAlign: "center", minWidth: 78 }}>
        <Typography sx={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 15, color: "primary.main" }}>
          {med.time.split(" ")[0]}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "text.secondary", fontWeight: 600 }}>
          {med.time.split(" ")[1]}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 44, height: 44, borderRadius: 2.5, display: "grid", placeItems: "center",
          bgcolor: "rgba(15,181,166,.12)", color: "secondary.dark", flexShrink: 0,
        }}
      >
        <MedicationLiquidRoundedIcon />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
          {med.name} {med.strength}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">{med.dose} · {med.food}</Typography>
        </Stack>
      </Box>
      <Chip
        size="small"
        variant="outlined"
        label={`Compartment ${med.compartment}`}
        sx={{ borderColor: "rgba(18,59,122,.18)", color: "text.secondary", fontWeight: 600 }}
      />
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: { sm: 1 } }}>
        <StatusBadge status={med.status} variant="soft" />
        {!taken && (
          <Button
            variant="contained" color="secondary" size="small"
            startIcon={<CheckRoundedIcon />} onClick={() => onTake && onTake(med.id)}
          >
            Mark Taken
          </Button>
        )}
      </Stack>
    </Box>
  );
}
