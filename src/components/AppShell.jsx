import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

import { caregiver } from "../data/mockData";

const DRAWER_WIDTH = 268;

const NAV = [
  { label: "Dashboard", icon: <SpaceDashboardRoundedIcon />, path: "/app/dashboard" },
  { label: "Patients", icon: <GroupRoundedIcon />, path: "/app/patients" },
  { label: "Prescriptions", icon: <DescriptionRoundedIcon />, path: "/app/prescriptions" },
  { label: "Medication Schedule", icon: <MedicationRoundedIcon />, path: "/app/schedule" },
  { label: "Adherence", icon: <InsightsRoundedIcon />, path: "/app/adherence" },
  { label: "Alerts", icon: <CampaignRoundedIcon />, path: "/app/alerts", badge: 3 },
  { label: "Smart Box", icon: <Inventory2RoundedIcon />, path: "/app/smart-box" },
  { label: "Settings", icon: <SettingsRoundedIcon />, path: "/app/settings" },
];

function Brand() {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 3, py: 2.75 }}>
      <Box
        sx={{
          width: 42, height: 42, borderRadius: 2.5, display: "grid", placeItems: "center",
          background: "linear-gradient(160deg,#1B4A93,#0FB5A6)", color: "#fff",
          boxShadow: "0 8px 18px -8px rgba(15,181,166,.7)",
        }}
      >
        <ShieldRoundedIcon />
      </Box>
      <Box>
        <Typography sx={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 19, lineHeight: 1, color: "#0C2A5A" }}>
          PillGuard
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: "text.secondary", mt: 0.4 }}>
          Smart safety for every dose.
        </Typography>
      </Box>
    </Stack>
  );
}

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const go = (path) => { navigate(path); onNavigate && onNavigate(); };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
      <Brand />
      <Divider />
      <List sx={{ px: 1.5, py: 1.5, flex: 1, overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = pathname.startsWith(item.path);
          return (
            <ListItemButton
              key={item.path}
              onClick={() => go(item.path)}
              sx={{
                borderRadius: 2.5, mb: 0.5, py: 1.1,
                color: active ? "primary.main" : "text.secondary",
                bgcolor: active ? "rgba(18,59,122,.08)" : "transparent",
                fontWeight: active ? 700 : 500,
                "&:hover": { bgcolor: active ? "rgba(18,59,122,.12)" : "rgba(18,59,122,.05)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: active ? "primary.main" : "text.secondary" }}>
                {item.badge ? (
                  <Badge color="error" badgeContent={item.badge}>{item.icon}</Badge>
                ) : item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14.5, fontWeight: active ? 700 : 500 }}
              />
              {active && (
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "secondary.main" }} />
              )}
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 1.5 }}>
        <ListItemButton sx={{ borderRadius: 2.5, mb: 1, color: "text.secondary" }} onClick={() => go("/app/settings")}>
          <ListItemIcon sx={{ minWidth: 40 }}><HelpOutlineRoundedIcon /></ListItemIcon>
          <ListItemText primary="Help & Support" primaryTypographyProps={{ fontSize: 14.5 }} />
        </ListItemButton>
        <Stack
          direction="row" spacing={1.5} alignItems="center"
          sx={{ p: 1.25, borderRadius: 3, bgcolor: "rgba(18,59,122,.05)" }}
        >
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, fontFamily: "'Sora'" }}>A</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }} noWrap>{caregiver.name}</Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{caregiver.role}</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default function AppShell() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Sidebar */}
      <Box component="nav" sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", lg: "none" }, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, border: 0 } }}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH, borderRight: "1px solid rgba(18,59,122,.10)" },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>

      {/* Main column */}
      <Box sx={{ flexGrow: 1, width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` }, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "rgba(244,246,251,.85)", backdropFilter: "blur(10px)",
            color: "text.primary", borderBottom: "1px solid rgba(18,59,122,.08)",
          }}
        >
          <Toolbar sx={{ gap: 1.5, minHeight: { xs: 64, md: 72 }, px: { xs: 2, md: 3 } }}>
            {!isDesktop && (
              <IconButton edge="start" onClick={() => setMobileOpen(true)}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1, flexGrow: { xs: 1, md: 0 },
                width: { md: 380 }, px: 2, py: 1, borderRadius: 3,
                bgcolor: "#fff", border: "1px solid rgba(18,59,122,.10)",
              }}
            >
              <SearchRoundedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <InputBase placeholder="Search patients, medicines, alerts…" sx={{ flex: 1, fontSize: 14 }} />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Notifications">
              <IconButton onClick={() => navigate("/app/alerts")}>
                <Badge color="error" badgeContent={3}>
                  <NotificationsRoundedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={() => navigate("/app/settings")}
              sx={{ bgcolor: "primary.main", cursor: "pointer", fontFamily: "'Sora'", width: 40, height: 40 }}
            >
              A
            </Avatar>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: { xs: 2, md: 3.5 }, flex: 1, maxWidth: 1440, width: "100%", mx: "auto", animation: "pg-fade-up .4s ease" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
