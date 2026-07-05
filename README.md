# SentinelEdge AI 🏭
**Predictive Maintenance & Worker Safety Platform for Industrial Heavy Machinery**

## 🚀 Overview
SentinelEdge AI is an enterprise-grade, AI-powered edge platform designed for industrial environments (such as Tata Motors, Tata Steel, and Tata Power plants). It monitors industrial heavy machinery in real time, predicts equipment failures, detects safety violations, and provides actionable maintenance recommendations through an interactive digital twin dashboard.

## 🔥 Key Features
- **Predictive Maintenance:** Estimates machine failure risk using real-time vibration, temperature, and current data.
- **Anomaly Detection:** Identifies deviations from normal operating patterns instantly.
- **Remaining Useful Life (RUL):** Predicts how much longer a machine component can operate safely before requiring replacement.
- **Worker Safety Module:** Uses computer vision for PPE detection (helmets, vests, gloves), restricted zone monitoring, and fall detection.
- **Digital Twin Dashboard:** Live visual representation of the machine's health score, sensor telemetry, and AI insights.
- **Real-Time Alerts:** Triggers dashboard and emergency alerts upon detecting critical risks.

## 🏗️ System Architecture
1. **Sensors / Cameras:** (Vibration, Temp, Current, CCTV)
2. **Edge Device:** (NVIDIA Jetson Orin Nano / Raspberry Pi AI Kit) for local processing.
3. **Backend:** (FastAPI) handles APIs, auth, and alert routing.
4. **ML Service:** Computes failure risk, anomaly scores, and RUL.
5. **Frontend:** (React/HTML Prototype) displays KPIs, charts, and digital twin.

### Tech Stack Blueprint
| Layer | Technology |
| --- | --- |
| **Backend** | FastAPI, SQLAlchemy, PostgreSQL |
| **Machine Learning** | Python, scikit-learn, XGBoost |
| **Computer Vision** | YOLOv11, OpenCV |
| **Frontend** | React, Tailwind CSS, HTML/Vanilla CSS |
| **Edge Compute** | NVIDIA Jetson Orin Nano / Raspberry Pi AI Kit |
| **Messaging & Deployment**| MQTT, Docker, Docker Compose |

## 🛠️ Current Prototype
This repository currently contains the **Frontend UI Prototype** of the main dashboard:
- `index.html`: Core dashboard layout and digital twin skeleton.
- `style.css`: Ultra-modern, premium dark theme with neon highlights and glassmorphism.
- `script.js`: Real-time chart simulations using Chart.js and navigation logic.

## 🏃‍♂️ How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Yashm2610/SentinelEdge.git
   ```
2. Navigate to the folder and run a local server:
   ```bash
   cd SentinelEdge
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser to view the live dashboard.

## 🎯 Business Impact
- **Downtime Reduction:** Identifies issues before they cause unplanned outages.
- **Maintenance Cost Savings:** Optimizes repair schedules based on AI recommendations rather than fixed intervals.
- **Worker Safety:** Ensures 24/7 monitoring of hazardous zones and PPE compliance.
