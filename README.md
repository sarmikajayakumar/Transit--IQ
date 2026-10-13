# TransitIQ 🚍
**AI-Powered Demand Prediction, Dynamic Route Optimization & Public Transit Intelligence**

TransitIQ is a full-stack smart public transit platform designed for both **Bus Operators / Transit Authorities** and **Daily Passengers**. Built with React, Tailwind CSS, Leaflet Maps, Express.js, and Groq GenAI (`openai/gpt-oss-20b`).

---

## 🌟 Key Features

### 1. 🤖 Dual-Role Bilingual AI Chatbot (Tamil தமிழ் & English)
- **Automatic Language Detection & Toggle**: Switch between **English** and **Tamil (தமிழ்)** with 1-click.
- **Dual Role Switching**:
  - **Passenger Mode**: Guides commuters on which bus to take, how to avoid crowds, active flood detours, live timetables, and **advance prior warnings for broken-down buses** with backup relief bus arrival times.
  - **Bus Operator / Depot Mode**: Provides dispatch advice, headway optimization, fleet capacity adjustments, flood emergency routing, and mobile workshop coordination.
- **Voice Text-to-Speech (TTS)**: Built-in voice synthesizer for auditory route instructions in Tamil & English.
- **Powered by Groq GenAI & Local Fallback**: Uses Groq LLM API with an offline rule-based fallback for 100% uptime.

### 2. 👥 Crowd Detection & Dynamic Route Optimization
- **Corridor Telemetry**: Compares parallel routes (Route 29C, Route 15B, Route 21M) on the Chennai Central ↔ Tambaram corridor.
- **Explainable Rule Engine**:
  - *Crowding > 100%*: Suggests adding buses and shifting passengers to less crowded parallel corridors.
  - *Crowding < 40%*: Identifies underutilized buses for reallocation.
- **Before vs After Optimization Simulator**:
  - Demonstrates how adding 2 standby buses cuts average wait time from **14.2 min to 6.8 min** (52% cut!) and reduces crowding from **128% to 84%**.

### 3. 🌧️ Flood & Roadblock Hazard Management
- **Inundation Detection**: Real-time simulation of flooded streets (e.g. Kathipara Junction & Guindy Underpass, Velachery Lake Road).
- **Dynamic Detours**: Automatically reroutes affected buses (Route 29C diverted via 100ft Inner Ring Road, +7 min ETA) and broadcasts instant alerts to passenger apps.

### 4. 🛠️ Vehicle Breakdown Prior Alert & Relief Bus Dispatch
- **Prior Notice System**: Detects and broadcasts breakdowns before passengers get stranded at stops.
- **Relief Bus Telemetry**: Tracks the dispatched relief bus (`TN-01-N-8802`) with live ETA (5 minutes).
- **Immediate Alternates**: Recommends immediate nearby alternatives (`Route 15B arriving in 2 mins`).

### 5. 🗺️ Interactive Live Map (Leaflet)
- Visualizes the corridor routes with crowd color-coding:
  - 🔴 **Red**: Overcrowded / Detoured
  - 🟢 **Green**: Optimal / Free seats
  - 🟡 **Yellow**: Moderate
- Live moving bus pins with registration numbers, occupancy %, speed, and status.
- Flood danger zones with animated radar circles.

---

## 🚀 How to Run

### Method 1: Using the Quick Launcher
Double-click `start_transitiq.bat` in `D:\Hackzen\`. It will automatically launch the server and open `http://localhost:5000` in your browser.

### Method 2: Manual Terminal
```bash
cd D:\Hackzen\transitiq
node server/index.js
```
Then open `http://localhost:5000` in your web browser.

---

## 📋 Technology Stack
- **Frontend**: React 18, Tailwind CSS, Lucide React, Leaflet Maps
- **Backend**: Node.js, Express.js, CORS
- **AI Engine**: Groq Cloud API (`openai/gpt-oss-20b`) + Deterministic Rule Optimizer
- **Localization**: Tamil (தமிழ்) & English (EN)
