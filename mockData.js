// Believable demo data for the PillGuard caregiver experience.

export const caregiver = {
  name: "Ansh",
  role: "Caregiver",
  email: "ansh.singh@pillguard.health",
};

export const kpis = [
  { key: "doses", label: "Today's Doses", value: "6", sub: "2 remaining", tone: "primary" },
  { key: "adherence", label: "Adherence", value: "94%", sub: "↑ 4.2% this week", tone: "success" },
  { key: "medicines", label: "Active Medicines", value: "5", sub: "Across 2 patients", tone: "secondary" },
  { key: "alerts", label: "Safety Alerts", value: "2", sub: "1 requires attention", tone: "warning" },
];

export const todaysMeds = [
  {
    id: "m1", time: "08:00 AM", name: "Metformin", strength: "500 mg",
    dose: "1 tablet", food: "After food", compartment: "01", status: "taken",
  },
  {
    id: "m2", time: "01:00 PM", name: "Aspirin", strength: "75 mg",
    dose: "1 tablet", food: "After food", compartment: "02", status: "taken",
  },
  {
    id: "m3", time: "08:00 PM", name: "Atorvastatin", strength: "20 mg",
    dose: "1 tablet", food: "Before bed", compartment: "03", status: "upcoming",
  },
];

export const weeklyAdherence = [
  { day: "Mon", value: 96 },
  { day: "Tue", value: 100 },
  { day: "Wed", value: 91 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 100 },
  { day: "Sat", value: 89 },
  { day: "Sun", value: 94 },
];

export const monthlyTrend = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.round(88 + 10 * Math.sin(i / 3) + (i % 4 === 0 ? -4 : 2)),
})).map((d) => ({ ...d, value: Math.max(78, Math.min(100, d.value)) }));

export const medicationAdherence = [
  { name: "Metformin", value: 97 },
  { name: "Aspirin", value: 100 },
  { name: "Atorvastatin", value: 91 },
];

export const doseBreakdown = [
  { name: "Taken", value: 172, color: "#1F9D57" },
  { name: "Late", value: 9, color: "#E0870A" },
  { name: "Missed", value: 3, color: "#D64545" },
];

export const dashboardAlerts = [
  {
    id: "a1", type: "missed", severity: "critical", title: "Missed Dose",
    message: "Metformin 500 mg was not confirmed at 1:00 PM.",
    action: "View Alert", patient: "Rajesh Kumar", time: "2 hours ago",
  },
  {
    id: "a2", type: "stock", severity: "warning", title: "Low Stock",
    message: "Aspirin has approximately 5 doses remaining.",
    action: "View Inventory", patient: "Rajesh Kumar", time: "5 hours ago",
  },
  {
    id: "a3", type: "device", severity: "device", title: "Smart Box Offline",
    message: "Last connected 12 minutes ago.",
    action: "Check Device", patient: "Sunita Sharma", time: "12 minutes ago",
  },
];

export const patients = [
  {
    id: "p1", name: "Rajesh Kumar", age: 68, medicines: 5, adherence: 94,
    status: "Stable", box: "Online", initials: "RK",
    conditions: ["Type 2 Diabetes", "Hypertension"],
  },
  {
    id: "p2", name: "Sunita Sharma", age: 61, medicines: 3, adherence: 87,
    status: "Attention", box: "Offline", initials: "SS",
    conditions: ["Osteoporosis", "High Cholesterol"],
  },
];

export const medicationList = [
  { name: "Metformin", strength: "500 mg", freq: "2×/day", food: "After food", remaining: 12, adherence: 97, compartment: "01" },
  { name: "Aspirin", strength: "75 mg", freq: "Once daily", food: "After food", remaining: 5, adherence: 100, compartment: "02" },
  { name: "Atorvastatin", strength: "20 mg", freq: "Once daily", food: "Before bed", remaining: 21, adherence: 91, compartment: "03" },
];

export const extractedMedicines = [
  {
    id: "e1", name: "Metformin", strength: "500 mg", dose: "1 tablet",
    frequency: "2 times/day", food: "After breakfast & dinner", duration: "30 days", confidence: 97,
  },
  {
    id: "e2", name: "Aspirin", strength: "75 mg", dose: "1 tablet",
    frequency: "Once daily", food: "After food", duration: "30 days", confidence: 96,
  },
  {
    id: "e3", name: "Atorvastatin", strength: "20 mg", dose: "1 tablet",
    frequency: "Once daily", food: "Before bed", duration: "30 days", confidence: 94,
  },
  {
    id: "e4", name: "Amlodipine", strength: "5 mg", dose: "1 tablet",
    frequency: "Once daily", food: "Morning", duration: "30 days", confidence: 92,
  },
  {
    id: "e5", name: "Vitamin D3", strength: "60,000 IU", dose: "1 sachet",
    frequency: "Once weekly", food: "After food", duration: "4 weeks", confidence: 89,
  },
];

export const scheduleRows = [
  { time: "08:00 AM", name: "Metformin 500 mg", dose: "1 tablet", food: "After food", compartment: "01" },
  { time: "08:00 AM", name: "Amlodipine 5 mg", dose: "1 tablet", food: "Morning", compartment: "04" },
  { time: "01:00 PM", name: "Aspirin 75 mg", dose: "1 tablet", food: "After food", compartment: "02" },
  { time: "08:00 PM", name: "Metformin 500 mg", dose: "1 tablet", food: "After food", compartment: "01" },
  { time: "10:00 PM", name: "Atorvastatin 20 mg", dose: "1 tablet", food: "Before bed", compartment: "03" },
];

export const compartments = [
  { id: "01", name: "Metformin 500 mg", remaining: 12, next: "08:00 PM", status: "loaded" },
  { id: "02", name: "Aspirin 75 mg", remaining: 5, next: "01:00 PM", status: "low" },
  { id: "03", name: "Atorvastatin 20 mg", remaining: 21, next: "10:00 PM", status: "loaded" },
  { id: "04", name: "Empty", remaining: 0, next: "—", status: "empty" },
];

export const allAlerts = [
  {
    id: "al1", category: "Missed Dose", severity: "critical", title: "Missed Dose",
    message: "Metformin 500 mg was not confirmed.", time: "2 hours ago",
    patient: "Rajesh Kumar", action: "View Details",
  },
  {
    id: "al2", category: "Low Stock", severity: "warning", title: "Low Stock",
    message: "Aspirin has 5 doses remaining.", time: "5 hours ago",
    patient: "Rajesh Kumar", action: "View Inventory",
  },
  {
    id: "al3", category: "Device", severity: "device", title: "Smart Box Offline",
    message: "Last connected 12 minutes ago.", time: "12 minutes ago",
    patient: "Sunita Sharma", action: "Check Device",
  },
  {
    id: "al4", category: "Safety", severity: "warning", title: "Interaction Review",
    message: "Aspirin + Atorvastatin flagged for caregiver review.", time: "1 day ago",
    patient: "Rajesh Kumar", action: "View Details",
  },
  {
    id: "al5", category: "Missed Dose", severity: "critical", title: "Missed Dose",
    message: "Amlodipine 5 mg was not confirmed at 8:00 AM.", time: "1 day ago",
    patient: "Sunita Sharma", action: "View Details",
  },
];
