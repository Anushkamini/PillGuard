import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { extractedMedicines, scheduleRows } from "../data/mockData";

const STEPS = ["Upload", "AI Analysis", "Safety Check", "Review", "Activate"];
const PROCESS_STAGES = [
  "Prescription uploaded",
  "Text extracted",
  "Identifying medicines",
  "Checking interactions",
  "Generating schedule",
];

function PrescriptionPreview() {
  return (
    <Box sx={{ p: 3, borderRadius: 3, bgcolor: "#fbfcfe", border: "1px solid rgba(18,59,122,.1)", fontFamily: "'Inter'" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontFamily: "'Sora'", color: "primary.main" }}>City Care Clinic</Typography>
          <Typography variant="caption" color="text.secondary">Dr. Neha Verma · MBBS, MD</Typography>
        </Box>
        <Chip size="small" icon={<DescriptionRoundedIcon />} label="prescription.pdf" variant="outlined" />
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" sx={{ mb: 1 }}><b>Patient:</b> Rajesh Kumar · Age 68</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}><b>Date:</b> 08 Sep 2026</Typography>
      <Box sx={{ fontFamily: "'Sora'", fontSize: 22, color: "#2E5CAE", mb: 1 }}>℞</Box>
      <Stack spacing={1}>
        {["Tab. Metformin 500 mg — 1-0-1, after food × 30 days", "Tab. Aspirin 75 mg — 0-1-0, after food × 30 days", "Tab. Atorvastatin 20 mg — 0-0-1, before bed × 30 days", "Tab. Amlodipine 5 mg — 1-0-0, morning × 30 days", "Sachet Vitamin D3 60,000 IU — weekly × 4"].map((l) => (
          <Typography key={l} variant="body2" sx={{ fontFamily: "monospace", fontSize: 13, color: "text.secondary" }}>• {l}</Typography>
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>Dr. Neha Verma — signed digitally</Typography>
    </Box>
  );
}

export default function PrescriptionUpload() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [stage, setStage] = useState(0); // AI processing progress
  const [meds, setMeds] = useState(extractedMedicines);
  const [editing, setEditing] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activated, setActivated] = useState(false);
  const fileRef = useRef(null);

  // Drive the AI processing animation on the Analysis step.
  useEffect(() => {
    if (step === 1 && uploaded) {
      setStage(1);
      const timers = PROCESS_STAGES.map((_, i) =>
        setTimeout(() => setStage(i + 1), (i + 1) * 900)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [step, uploaded]);

  const startUpload = () => {
    setUploaded(true);
    setStep(1);
  };

  const analysisDone = stage >= PROCESS_STAGES.length;

  return (
    <Box>
      <PageHeader title="Add Prescription" subtitle="Upload a prescription and let PillGuard's AI build a safe schedule for your review." />

      <Box sx={{ mb: 3 }}>
        <SectionCard bodySx={{ py: 2.5 }}>
          <Stepper activeStep={step} alternativeLabel sx={{ "& .MuiStepIcon-root.Mui-active": { color: "secondary.main" }, "& .MuiStepIcon-root.Mui-completed": { color: "success.main" } }}>
            {STEPS.map((s) => (
              <Step key={s}><StepLabel>{s}</StepLabel></Step>
            ))}
          </Stepper>
        </SectionCard>
      </Box>

      {/* STEP 0 — UPLOAD */}
      {step === 0 && (
        <SectionCard title="Upload prescription" icon={<CloudUploadRoundedIcon />}>
          <Box
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); startUpload(); }}
            sx={{
              p: { xs: 4, md: 7 }, textAlign: "center", borderRadius: 4, cursor: "pointer",
              border: "2px dashed", borderColor: dragging ? "secondary.main" : "rgba(18,59,122,.25)",
              bgcolor: dragging ? "rgba(15,181,166,.06)" : "rgba(18,59,122,.02)",
              transition: "all .2s",
            }}
            onClick={() => fileRef.current && fileRef.current.click()}
          >
            <input ref={fileRef} type="file" hidden accept="image/*,application/pdf" onChange={startUpload} />
            <Box sx={{ width: 68, height: 68, mx: "auto", mb: 2, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "rgba(15,181,166,.12)", color: "secondary.dark" }}>
              <CloudUploadRoundedIcon sx={{ fontSize: 34 }} />
            </Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Drag &amp; drop a prescription image or PDF here</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>or choose a file from your device</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
              <Button variant="contained" size="large" startIcon={<CloudUploadRoundedIcon />} onClick={(e) => { e.stopPropagation(); startUpload(); }}>Choose File</Button>
              <Button variant="outlined" size="large" startIcon={<PhotoCameraRoundedIcon />} onClick={(e) => { e.stopPropagation(); startUpload(); }}>Take Photo</Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: "block" }}>
              Accepted formats: JPG, PNG, HEIC, PDF · Max 20 MB
            </Typography>
          </Box>
        </SectionCard>
      )}

      {/* STEP 1 — AI ANALYSIS */}
      {step === 1 && (
        <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          <SectionCard title="Prescription preview" icon={<DescriptionRoundedIcon />}><PrescriptionPreview /></SectionCard>
          <SectionCard title="AI processing" icon={<BoltRoundedIcon />}>
            <Stack spacing={1.5}>
              {PROCESS_STAGES.map((label, i) => {
                const done = stage > i;
                const active = stage === i + 1 && !done && stage <= PROCESS_STAGES.length;
                const isCurrent = stage === i + 1;
                return (
                  <Stack key={label} direction="row" spacing={1.5} alignItems="center" sx={{ p: 1.5, borderRadius: 2.5, bgcolor: done ? "rgba(31,157,87,.06)" : isCurrent ? "rgba(15,181,166,.06)" : "transparent", transition: "background .3s" }}>
                    {done ? <CheckCircleRoundedIcon color="success" /> : isCurrent ? <CircularProgress size={20} sx={{ color: "secondary.main" }} /> : <RadioButtonUncheckedRoundedIcon sx={{ color: "rgba(18,59,122,.3)" }} />}
                    <Typography sx={{ fontWeight: done || isCurrent ? 600 : 400, color: done || isCurrent ? "text.primary" : "text.secondary" }}>{label}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <LinearProgress variant="determinate" value={(stage / PROCESS_STAGES.length) * 100} color="secondary" sx={{ mt: 2, height: 8, borderRadius: 5, bgcolor: "rgba(18,59,122,.08)" }} />
            <Alert severity="info" icon={<ShieldRoundedIcon fontSize="inherit" />} sx={{ mt: 2.5, borderRadius: 3 }}>
              AI extracts this information from the prescription. You will verify it before anything is activated.
            </Alert>
            <Button
              variant="contained" size="large" fullWidth disabled={!analysisDone}
              endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 2.5 }}
              onClick={() => setStep(2)}
            >
              {analysisDone ? "View extracted medicines" : "Analyzing…"}
            </Button>
          </SectionCard>
        </Box>
      )}

      {/* STEP 2 — REVIEW EXTRACTED (Analysis results) */}
      {step === 2 && (
        <Box>
          <Alert severity="success" sx={{ mb: 2.5, borderRadius: 3, fontWeight: 600 }}>
            AI successfully extracted {meds.length} medicines from the prescription.
          </Alert>
          <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", md: "0.85fr 1.15fr" } }}>
            <SectionCard title="Prescription preview" icon={<DescriptionRoundedIcon />}><PrescriptionPreview /></SectionCard>
            <SectionCard title="Extracted medicines" subtitle="Tap a field to edit before continuing" icon={<EditRoundedIcon />}>
              <Alert severity="warning" sx={{ mb: 2, borderRadius: 3 }}>
                AI extracted this information from the prescription. Please verify it before continuing.
              </Alert>
              <Stack spacing={1.5}>
                {meds.map((m) => (
                  <Box key={m.id} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(18,59,122,.1)" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ flex: 1 }}>
                        {editing === m.id ? (
                          <Stack spacing={1.25}>
                            <TextField label="Name" value={m.name} onChange={(e) => setMeds((x) => x.map((y) => y.id === m.id ? { ...y, name: e.target.value } : y))} />
                            <Stack direction="row" spacing={1}>
                              <TextField label="Strength" value={m.strength} onChange={(e) => setMeds((x) => x.map((y) => y.id === m.id ? { ...y, strength: e.target.value } : y))} />
                              <TextField label="Frequency" value={m.frequency} onChange={(e) => setMeds((x) => x.map((y) => y.id === m.id ? { ...y, frequency: e.target.value } : y))} />
                            </Stack>
                            <TextField label="Instruction" value={m.food} onChange={(e) => setMeds((x) => x.map((y) => y.id === m.id ? { ...y, food: e.target.value } : y))} />
                          </Stack>
                        ) : (
                          <>
                            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{m.name} <Typography component="span" color="text.secondary" sx={{ fontWeight: 500 }}>{m.strength}</Typography></Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{m.dose} · {m.frequency} · {m.food}</Typography>
                            <Typography variant="caption" color="text.secondary">Duration: {m.duration}</Typography>
                          </>
                        )}
                      </Box>
                      <Stack alignItems="flex-end" spacing={1}>
                        <Chip size="small" label={`AI ${m.confidence}%`} color={m.confidence >= 95 ? "success" : m.confidence >= 90 ? "info" : "warning"} variant="outlined" />
                        <IconButton size="small" color={editing === m.id ? "success" : "default"} onClick={() => setEditing(editing === m.id ? null : m.id)}>
                          {editing === m.id ? <CheckCircleRoundedIcon /> : <EditRoundedIcon fontSize="small" />}
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }} justifyContent="space-between">
                <Button startIcon={<ArrowBackRoundedIcon />} color="inherit" onClick={() => setStep(1)}>Back</Button>
                <Button variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} onClick={() => setStep(3)}>Continue to Safety Check</Button>
              </Stack>
            </SectionCard>
          </Box>
        </Box>
      )}

      {/* STEP 3 — SAFETY CHECK */}
      {step === 3 && (
        <Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2.5 }}>
            <Chip icon={<CheckCircleRoundedIcon />} color="success" label="4 medicines checked — no issues" sx={{ py: 2, fontWeight: 700 }} />
            <Chip icon={<WarningRoundedIcon />} color="warning" label="1 interaction requires review" sx={{ py: 2, fontWeight: 700 }} />
          </Stack>

          <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" } }}>
            <Box
              sx={{
                p: 3, borderRadius: 4, border: "2px solid", borderColor: "warning.main",
                bgcolor: "rgba(224,135,10,.05)",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "warning.main", color: "#fff" }}>
                  <WarningRoundedIcon />
                </Box>
                <Box>
                  <Typography variant="h6">Potential interaction detected</Typography>
                  <Typography variant="body2" color="text.secondary">Aspirin 75 mg + Atorvastatin 20 mg</Typography>
                </Box>
                <Box sx={{ flex: 1 }} />
                <Chip label="MODERATE" color="warning" sx={{ fontWeight: 800 }} />
              </Stack>
              <Typography sx={{ mb: 1.5 }}>
                These medicines may interact and could increase the risk of adverse effects such as muscle discomfort.
                The combination is common but should be monitored.
              </Typography>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#fff", border: "1px solid rgba(224,135,10,.3)", mb: 2 }}>
                <Typography variant="overline" color="warning.dark">Suggested action</Typography>
                <Typography sx={{ fontWeight: 600 }}>Consult the prescribing doctor before taking them together.</Typography>
              </Box>
              <Stack direction="row" spacing={1.5}>
                <Button variant="outlined" color="warning">Review</Button>
                <Button variant="contained" color="warning" startIcon={<CheckCircleRoundedIcon />} onClick={() => setReviewed(true)} disabled={reviewed}>
                  {reviewed ? "Reviewed" : "Mark as Reviewed"}
                </Button>
              </Stack>
            </Box>

            <SectionCard title="No significant interaction" icon={<CheckCircleRoundedIcon />}>
              <Stack spacing={1.25}>
                {["Metformin 500 mg", "Amlodipine 5 mg", "Vitamin D3 60,000 IU", "Metformin + Amlodipine"].map((s) => (
                  <Stack key={s} direction="row" spacing={1.5} alignItems="center" sx={{ p: 1.25, borderRadius: 2.5, bgcolor: "rgba(31,157,87,.06)" }}>
                    <CheckCircleRoundedIcon color="success" fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{s}</Typography>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Box>

          <Alert severity="info" icon={<ShieldRoundedIcon fontSize="inherit" />} sx={{ mt: 2.5, borderRadius: 3, fontWeight: 600 }}>
            AI does not modify prescriptions. Review all warnings before activating the schedule.
          </Alert>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2.5 }}>
            <Button startIcon={<ArrowBackRoundedIcon />} color="inherit" onClick={() => setStep(2)}>Back</Button>
            <Button variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} disabled={!reviewed} onClick={() => setStep(4)}>
              Continue to Schedule
            </Button>
          </Stack>
        </Box>
      )}

      {/* STEP 4 — SCHEDULE + ACTIVATE */}
      {step === 4 && !activated && (
        <Box>
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, mb: 2.5 }}>
            {[["Patient", "Rajesh Kumar"], ["Duration", "30 days"], ["Start Date", "08 Sep 2026"], ["End Date", "07 Oct 2026"]].map(([l, v]) => (
              <SectionCard key={l} bodySx={{ py: 2 }}>
                <Typography variant="overline" color="text.secondary">{l}</Typography>
                <Typography sx={{ fontWeight: 700 }}>{v}</Typography>
              </SectionCard>
            ))}
          </Box>

          <SectionCard title="Daily medication schedule" subtitle="Generated by AI — edit times or compartments as needed" icon={<DescriptionRoundedIcon />}>
            <Stack spacing={1.25}>
              {scheduleRows.map((r, i) => (
                <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(18,59,122,.08)" }}>
                  <Chip label={r.time} sx={{ fontWeight: 700, bgcolor: "rgba(18,59,122,.06)", color: "primary.main", minWidth: 96 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700 }}>{r.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{r.dose} · {r.food}</Typography>
                  </Box>
                  <Chip size="small" variant="outlined" label={`Compartment ${r.compartment}`} sx={{ borderColor: "rgba(18,59,122,.15)" }} />
                  <Button size="small" startIcon={<EditRoundedIcon fontSize="small" />} color="inherit">Edit</Button>
                </Stack>
              ))}
            </Stack>
          </SectionCard>

          <Box sx={{ mt: 2.5 }}>
            <SectionCard>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Schedule ready for caregiver confirmation.</Typography>
                  <Typography variant="body2" color="text.secondary">Review complete. Confirm to sync this schedule to the Smart Box.</Typography>
                </Box>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="outlined" startIcon={<SaveRoundedIcon />}>Save Draft</Button>
                  <Button variant="contained" size="large" startIcon={<BoltRoundedIcon />} onClick={() => setConfirmOpen(true)}>Confirm &amp; Activate Schedule</Button>
                </Stack>
              </Stack>
            </SectionCard>
          </Box>
        </Box>
      )}

      {/* SUCCESS */}
      {activated && (
        <SectionCard>
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Box sx={{ width: 84, height: 84, mx: "auto", mb: 3, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "success.light", color: "success.main", animation: "pg-pulse 2s infinite" }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 46 }} />
            </Box>
            <Typography variant="h4" sx={{ fontSize: 26, mb: 1 }}>Schedule activated successfully</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>Your Smart Box has been synced. Rajesh will receive dose reminders automatically.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
              <Button variant="contained" size="large" onClick={() => navigate("/app/schedule")}>View Schedule</Button>
              <Button variant="outlined" size="large" onClick={() => navigate("/app/smart-box")}>Open Smart Box</Button>
              <Button color="inherit" size="large" onClick={() => navigate("/app/dashboard")}>Back to Dashboard</Button>
            </Stack>
          </Box>
        </SectionCard>
      )}

      {/* ACTIVATION MODAL */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 440 } }}>
        <DialogTitle sx={{ fontFamily: "'Sora'", fontWeight: 700 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ width: 40, height: 40, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "rgba(18,59,122,.08)", color: "primary.main" }}><ShieldRoundedIcon /></Box>
            Activate medication schedule?
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm that you have reviewed the prescription and safety warnings. Once activated, the schedule
            will sync to the Smart Box and reminders will begin.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button color="inherit" onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<BoltRoundedIcon />} onClick={() => { setConfirmOpen(false); setActivated(true); }}>Confirm &amp; Activate</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
