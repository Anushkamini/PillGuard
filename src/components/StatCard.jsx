import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TONES = {
  primary: { bg: "#E7EEFB", fg: "#123B7A" },
  secondary: { bg: "#DCF5F1", fg: "#0A8A7F" },
  success: { bg: "#E5F5EC", fg: "#137A41" },
  warning: { bg: "#FDF1DE", fg: "#B96D05" },
};

export default function StatCard({ label, value, sub, icon, tone = "primary", subTone }) {
  const t = TONES[tone] || TONES.primary;
  return (
    <Card
      sx={{
        height: "100%",
        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 18px 40px -20px rgba(16,27,51,.35)" },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontSize: 11 }}>
            {label}
          </Typography>
          <Box
            sx={{
              width: 42, height: 42, borderRadius: 2.5, display: "grid", placeItems: "center",
              bgcolor: t.bg, color: t.fg,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h3" sx={{ fontSize: 34, lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, fontWeight: 600, color: subTone ? `${subTone}.main` : "text.secondary" }}
        >
          {sub}
        </Typography>
      </CardContent>
    </Card>
  );
}
