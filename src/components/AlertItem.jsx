import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

const SEV = {
  critical: { icon: <ErrorRoundedIcon />, color: "#D64545", bg: "rgba(214,69,69,.10)", label: "Critical" },
  warning: { icon: <WarningRoundedIcon />, color: "#E0870A", bg: "rgba(224,135,10,.12)", label: "Warning" },
  device: { icon: <DevicesRoundedIcon />, color: "#2E6FDF", bg: "rgba(46,111,223,.12)", label: "Device" },
};

export default function AlertItem({ alert, onAction, onResolve }) {
  const s = SEV[alert.severity] || SEV.warning;
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", py: 0.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
      <Box sx={{ width: 40, height: 40, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: s.bg, color: s.color, flexShrink: 0 }}>
        {s.icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25, flexWrap: "wrap" }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{alert.title}</Typography>
          <Box sx={{ px: 1, py: 0.2, borderRadius: 1, bgcolor: s.bg, color: s.color, fontSize: 11, fontWeight: 700 }}>
            {s.label}
          </Box>
        </Stack>
        <Typography variant="body2" color="text.secondary">{alert.message}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
          {alert.patient ? `${alert.patient} · ` : ""}{alert.time}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mt: { xs: 1, sm: 0 } }}>
        {onResolve && <Button size="small" color="inherit" onClick={() => onResolve(alert.id)}>Resolve</Button>}
        <Button size="small" variant="outlined" onClick={() => onAction && onAction(alert)}>{alert.action || "View"}</Button>
      </Stack>
    </Box>
  );
}
