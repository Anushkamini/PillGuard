import React from "react";
import Chip from "@mui/material/Chip";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import SnoozeRoundedIcon from "@mui/icons-material/SnoozeRounded";

// Status is always signalled with an icon + label, never colour alone.
const MAP = {
  taken: { label: "Taken", icon: <CheckCircleRoundedIcon />, color: "success" },
  upcoming: { label: "Upcoming", icon: <ScheduleRoundedIcon />, color: "info" },
  missed: { label: "Missed", icon: <ErrorRoundedIcon />, color: "error" },
  snoozed: { label: "Snoozed", icon: <SnoozeRoundedIcon />, color: "warning" },
  critical: { label: "Critical", icon: <ErrorRoundedIcon />, color: "error" },
  warning: { label: "Warning", icon: <WarningRoundedIcon />, color: "warning" },
  device: { label: "Device", icon: <DevicesRoundedIcon />, color: "info" },
  stable: { label: "Stable", icon: <CheckCircleRoundedIcon />, color: "success" },
  attention: { label: "Attention", icon: <WarningRoundedIcon />, color: "warning" },
  online: { label: "Online", icon: <CheckCircleRoundedIcon />, color: "success" },
  offline: { label: "Offline", icon: <ErrorRoundedIcon />, color: "error" },
};

export default function StatusBadge({ status, label, size = "small", variant = "filled" }) {
  const cfg = MAP[status] || MAP.upcoming;
  return (
    <Chip
      size={size}
      icon={cfg.icon}
      label={label || cfg.label}
      color={cfg.color}
      variant={variant === "soft" ? "outlined" : "filled"}
      sx={
        variant === "soft"
          ? {
              bgcolor: (t) => t.palette[cfg.color].light,
              color: (t) => t.palette[cfg.color].dark,
              borderColor: "transparent",
              "& .MuiChip-icon": { color: (t) => t.palette[cfg.color].dark },
            }
          : { "& .MuiChip-icon": { color: "inherit" } }
      }
    />
  );
}
