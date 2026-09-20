# 💊 PillGuard

### Smart safety for every dose.

PillGuard is an **AI-powered Smart Medicine Safety & Reminder System** designed to help patients and caregivers manage medications safely and consistently.

It combines an AI-powered prescription analysis layer with a connected Smart Medicine Box to create an end-to-end medication management workflow — from prescription capture and safety checks to reminders, dose confirmation, adherence tracking, and caregiver alerts.

---

## 🚨 Problem

Medication non-adherence is a major and preventable healthcare problem, particularly for elderly, chronically ill, and visually impaired patients managing multiple medications.

Common challenges include:

* Missed or double doses
* Difficult-to-understand prescriptions
* Incorrect medication timing
* Confusion about before/after-food instructions
* Potential drug–drug interactions
* Lack of real-time caregiver visibility

Traditional smart pillboxes often focus primarily on reminders or basic logging rather than supporting the complete medication journey.

---

## 💡 Our Solution

PillGuard combines **AI software + a Smart Medicine Box**.

### 🤖 AI & Cloud Layer

The system:

* Scans prescriptions using OCR
* Extracts medicine names, dosage, frequency, timing, duration, and food instructions
* Performs drug–drug interaction checks
* Generates a 30-day medication schedule
* Provides understandable safety warnings
* Synchronizes the approved schedule with the Smart Medicine Box

### 📦 Smart Medicine Box

The physical device:

* Provides audible medication reminders
* Uses LEDs for visual food/timing cues
* Displays medication instructions
* Supports voice instructions
* Allows patients to confirm doses
* Records adherence events
* Can continue scheduled reminders even during temporary connectivity loss

The system's core workflow is:

**Prescription → AI Analysis → Safety Check → Schedule → Smart Box Reminder → Patient Confirmation → Adherence Log → Caregiver Alert**

---

## ✨ Key Features

### 📸 AI Prescription Understanding

Caregivers can upload or photograph a prescription. AI/OCR extracts:

* Medicine name
* Strength
* Dose
* Frequency
* Timing
* Duration
* Before/after-food instructions

### ⚠️ Medication Safety Check

PillGuard checks the patient's medications for potential drug–drug interactions and presents warnings using clear severity levels and plain-language explanations.

### 📅 30-Day Medication Schedule

Extracted prescriptions are converted into a 30-day schedule containing:

* Medication
* Dose
* Time
* Food instructions
* Smart Box compartment mapping

### 🔔 Smart Reminders

At medication time, the Smart Box can trigger:

* Buzzer/alarm
* RGB LED
* Display instructions
* Voice instructions

For example:

> **Take 1 tablet after food**

### ✅ Dose Confirmation

Patients can confirm a dose using a button or compartment sensor. The event is then recorded as **taken, missed, or late**.

### 👨‍⚕️ Caregiver Dashboard

Caregivers can monitor:

* Today's doses
* Adherence percentage
* Missed doses
* Medication status
* Low-stock warnings
* Smart Box status
* Alerts

### ♿ Accessibility

The system is designed with accessibility in mind, including:

* Large visual cues
* Simple instructions
* Voice guidance
* Color-coded food instructions
* Multilingual/regional language support
* Low-literacy-friendly interfaces

---

## 🖥️ Prototype

### Live Prototype

👉 **[PillGuard Live Prototype](https://pillguard.figma.site/)**

The prototype demonstrates the main caregiver workflow:

**Dashboard → Prescription Upload → AI Processing → Prescription Review → Safety Check → Schedule → Smart Box Sync → Adherence**

> Replace the URL above with your final Figma/production URL before submitting the project.

---

## 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │     Caregiver App    │
                 │   Web / Mobile UI   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    API / Backend    │
                 │      FastAPI        │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
   │ OCR / AI    │  │ Safety Engine│  │   Schedule   │
   │ Prescription│  │ Drug Checks  │  │   Generator  │
   └─────────────┘  └──────────────┘  └──────┬───────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ Smart Medicine  │
                                    │      Box        │
                                    │     ESP32       │
                                    └────────┬────────┘
                                             │
                                             ▼
                                    Dose Confirmation
                                             │
                                             ▼
                                    Adherence Logging
                                             │
                                             ▼
                                      Caregiver Alerts
```

---

## 🛠️ Technology Stack

### Frontend

* React / Next.js

### Backend

* FastAPI
* REST APIs

### Database

* PostgreSQL
* Firebase / Realtime Database

### AI / OCR

* Tesseract
* GPT-4o Vision

### Safety Engine

* Drug interaction API / knowledge graph
* DrugBank or public DDI datasets

### Device Communication

* MQTT / WebSockets / REST
* Wi-Fi / BLE

### Hardware

* ESP32
* RTC module
* OLED/LCD
* RGB LEDs
* Buzzer
* Push buttons
* Optional reed switches
* Optional speaker

### Voice

* Text-to-Speech engine

The proposed architecture and technology stack are based on the PillGuard project specification.

---

## 🔄 How It Works

### 1. Prescription Capture

The caregiver uploads a prescription through the application.

### 2. AI Processing

OCR and AI extract the medication information.

### 3. Safety Check

The system checks for potential drug interactions and presents warnings.

### 4. Schedule Generation

A 30-day medication plan is generated.

### 5. Human Review

The caregiver reviews the prescription, safety warnings, and schedule.

### 6. Smart Box Sync

After explicit confirmation, the approved schedule is synchronized with the Smart Medicine Box.

### 7. Medication Reminder

At the scheduled time, the Smart Box activates its alarm, LED, display, and optional voice instruction.

### 8. Dose Confirmation

The patient takes the medication and confirms the dose.

### 9. Adherence Logging

The event is recorded as taken, missed, or late.

### 10. Caregiver Notification

Missed doses and other important events can trigger caregiver alerts.

---

## 🔐 Safety by Design

PillGuard follows a **human-in-the-loop** approach.

The AI:

* Does **not** prescribe medication
* Does **not** modify prescriptions automatically
* Only interprets information and provides warnings
* Requires caregiver review before schedule activation

Schedule changes and AI safety warnings are intended to be auditable.

---

## 🚀 Future Scope

Future versions could include:

* Advanced pill-count sensing using load cells or IR sensors
* Personalized reminder timing
* Adaptive escalation from app → Smart Box → call
* Expanded regional language support
* Voice-only interaction
* E-prescription integration
* Pharmacy refill alerts
* Clinician dashboards
* Validated medical-device/regulatory pathway

---

## 🎯 Expected Impact

PillGuard aims to:

* Improve medication adherence
* Reduce wrong-dose and wrong-time errors
* Improve caregiver visibility
* Provide clearer medication instructions
* Enable timely intervention for missed doses
* Make medication management more accessible

---

## 👥 Project

**PillGuard — Smart safety for every dose.**

Built as a healthcare technology prototype combining **AI, software, IoT, and an accessible Smart Medicine Box**.

---

## ⚠️ Disclaimer

PillGuard is a prototype concept. It is not a substitute for professional medical advice, diagnosis, or prescription decisions. Medication schedules should be reviewed and confirmed by an appropriate caregiver/healthcare professional before use.
