import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import { caregiver } from "../data/mockData";

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
      <Box sx={{ pr: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>{label}</Typography>
        {desc && <Typography variant="body2" color="text.secondary">{desc}</Typography>}
      </Box>
      <Switch checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </Stack>
  );
}

export default function Settings() {
  const [notif, setNotif] = useState({ missed: true, stock: true, safety: true, push: true, email: false });
  const [a11y, setA11y] = useState({ large: false, contrast: false, voice: true });
  const [lang, setLang] = useState("en");
  const [toast, setToast] = useState(false);
  const set = (obj, setter, key) => (v) => setter({ ...obj, [key]: v });

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, notifications, accessibility and device."
        actions={<Button variant="contained" onClick={() => setToast(true)}>Save Changes</Button>}
      />

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" } }}>
        <SectionCard title="Profile" icon={<PersonRoundedIcon />}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main", fontFamily: "'Sora'", fontSize: 22 }}>A</Avatar>
            <Button variant="outlined" size="small">Change photo</Button>
          </Stack>
          <Stack spacing={2}>
            <TextField label="Name" defaultValue={caregiver.name} fullWidth />
            <TextField label="Email" defaultValue={caregiver.email} fullWidth />
            <TextField label="Role" defaultValue={caregiver.role} fullWidth disabled />
          </Stack>
        </SectionCard>

        <SectionCard title="Notifications" icon={<NotificationsRoundedIcon />}>
          <ToggleRow label="Missed-dose alerts" desc="Notify me when a dose isn't confirmed." checked={notif.missed} onChange={set(notif, setNotif, "missed")} />
          <Divider />
          <ToggleRow label="Low-stock alerts" desc="Warn when medicine is running low." checked={notif.stock} onChange={set(notif, setNotif, "stock")} />
          <Divider />
          <ToggleRow label="Safety alerts" desc="Interaction and safety warnings." checked={notif.safety} onChange={set(notif, setNotif, "safety")} />
          <Divider />
          <ToggleRow label="Push notifications" checked={notif.push} onChange={set(notif, setNotif, "push")} />
          <Divider />
          <ToggleRow label="Email notifications" checked={notif.email} onChange={set(notif, setNotif, "email")} />
        </SectionCard>

        <SectionCard title="Accessibility" subtitle="Designed for elderly & visually-impaired users" icon={<AccessibilityNewRoundedIcon />}>
          <ToggleRow label="Large text" desc="Increase font sizes across the app." checked={a11y.large} onChange={set(a11y, setA11y, "large")} />
          <Divider />
          <ToggleRow label="High contrast" desc="Stronger colour contrast for readability." checked={a11y.contrast} onChange={set(a11y, setA11y, "contrast")} />
          <Divider />
          <ToggleRow label="Voice instructions" desc="Read dose reminders aloud." checked={a11y.voice} onChange={set(a11y, setA11y, "voice")} />
          <Divider />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>Language</Typography>
            <Select size="small" value={lang} onChange={(e) => setLang(e.target.value)} sx={{ minWidth: 150 }}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
              <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
            </Select>
          </Stack>
        </SectionCard>

        <SectionCard title="Smart Box" icon={<Inventory2RoundedIcon />}>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box><Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>Connection</Typography><Typography variant="body2" color="text.secondary">PG-SG4-08842</Typography></Box>
              <Chip color="success" label="Online" size="small" />
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>Auto-sync schedule</Typography>
              <Switch defaultChecked />
            </Stack>
            <Divider />
            <Button variant="outlined">Manage Device Settings</Button>
          </Stack>
        </SectionCard>

        <SectionCard title="Caregiver Access" icon={<GroupRoundedIcon />}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Assigned patients</Typography>
          <List disablePadding>
            {["Rajesh Kumar", "Sunita Sharma"].map((p) => (
              <ListItem key={p} disableGutters secondaryAction={<Chip size="small" label="Full access" variant="outlined" />}>
                <ListItemText primary={p} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1.5 }} />
          <Button variant="outlined">Manage Permissions</Button>
        </SectionCard>

        <SectionCard title="Security" icon={<SecurityRoundedIcon />}>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box><Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>Password</Typography><Typography variant="body2" color="text.secondary">Last changed 3 months ago</Typography></Box>
              <Button size="small" variant="outlined">Change</Button>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box><Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>Active sessions</Typography><Typography variant="body2" color="text.secondary">2 devices signed in</Typography></Box>
              <Button size="small" variant="outlined">Manage</Button>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>Privacy &amp; data</Typography>
              <Button size="small" variant="outlined">Review</Button>
            </Stack>
          </Stack>
        </SectionCard>
      </Box>

      <Snackbar open={toast} autoHideDuration={2600} onClose={() => setToast(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setToast(false)} sx={{ borderRadius: 3 }}>Settings saved.</Alert>
      </Snackbar>
    </Box>
  );
}
