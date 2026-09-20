import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// Reusable titled panel used across nearly every page.
export default function SectionCard({ title, subtitle, action, icon, children, sx, bodySx, dense }) {
  return (
    <Card sx={{ height: "100%", ...sx }}>
      {(title || action) && (
        <>
          <Box
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              px: 2.5, py: dense ? 1.75 : 2.25, gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
              {icon && (
                <Box sx={{ color: "primary.main", display: "grid", placeItems: "center" }}>{icon}</Box>
              )}
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" sx={{ fontSize: 17 }} noWrap>{title}</Typography>
                {subtitle && (
                  <Typography variant="body2" color="text.secondary" noWrap>{subtitle}</Typography>
                )}
              </Box>
            </Box>
            {action}
          </Box>
          <Divider />
        </>
      )}
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 }, ...bodySx }}>{children}</CardContent>
    </Card>
  );
}
