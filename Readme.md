# Safence - AI-Powered Illegal Electric Fence Detection

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python)](https://python.org/)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Computer%20Vision-FF6B6B)](https://github.com/ultralytics/ultralytics)
[![XGBoost](https://img.shields.io/badge/XGBoost-99%25%20Accuracy-FF6B35)](https://xgboost.readthedocs.io/)

> Intelligent surveillance system combining computer vision, IoT sensors, and machine learning to detect illegal electric fences and ensure power grid safety through real-time monitoring.

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Performance Metrics](#performance-metrics)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [AI Models](#ai-models)
- [Demo & Documentation](#demo--documentation)

---

## Overview

**Safence** tackles the growing problem of illegal electric fences that threaten both public safety and power grid stability. These unauthorized installations cause significant power theft, create dangerous conditions for civilians, and result in substantial revenue losses for utility companies. Traditional manual monitoring is inefficient and cannot scale to cover vast geographical areas effectively.

Our comprehensive solution integrates cutting-edge technologies to create an autonomous monitoring ecosystem. The system deploys drone-based surveillance equipped with computer vision algorithms to identify illegal fence installations from aerial footage. Simultaneously, IoT sensor networks monitor power consumption patterns in real-time, detecting anomalies that indicate unauthorized electrical usage. Machine learning models analyze grid data to predict and classify suspicious activities with exceptional accuracy.

<div align="center">

![Team](docs/architecture/teamicon.jpg)

</div>

### Solution Components

- **Computer Vision**: YOLOv8 for automated fence detection via drone surveillance
- **IoT Network**: ESP32 + LoRa modules for real-time power monitoring  
- **Machine Learning**: XGBoost classifier for grid anomaly detection (99% accuracy)
- **Alert System**: Automated notifications with zone classification

### System Architecture
![System Flow Diagram](docs/architecture/system-flow-diagram.jpg)

---

## Key Features

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/opencv.svg" width="16" height="16" style="vertical-align: text-bottom;"> Smart Detection
- YOLOv8-powered fence identification from drone footage
- XGBoost classifier analyzing 9,500+ KSEBL grid readings  
- Multi-zone safety classification (Green/Yellow/Red zones)

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/grafana.svg" width="16" height="16" style="vertical-align: text-bottom;"> Real-time Monitoring
- Interactive web dashboard with live maps
- Automated drone deployment to flagged areas
- LoRa-based sensor communication (up to 15km range)
- Heartbeat monitoring every 1-2 minutes

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/lightning.svg" width="16" height="16" style="vertical-align: text-bottom;"> Grid Analysis
- 24-feature dataset from Kerala State Electricity Board
- Power consumption pattern analysis
- Voltage estimation via magnetometer sensors
- Automated authority notifications

---

## Technology Stack

### Frontend & Dashboard
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)

### Machine Learning & AI
![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
![YOLOv8](https://img.shields.io/badge/-YOLOv8-FF6B6B)
![XGBoost](https://img.shields.io/badge/-XGBoost-FF6B35)
![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?logo=opencv&logoColor=white)

### IoT & Hardware
![ESP32](https://img.shields.io/badge/-ESP32-E7352C)
![LoRa](https://img.shields.io/badge/-LoRa-4CAF50)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?logo=arduino&logoColor=white)

---

## Performance Metrics

| Model | Accuracy | Precision | Recall |
|-------|----------|-----------|--------|
| **XGBoost Classifier** | 99% | 98.5% | 97.8% |
| **YOLOv8 Detection** | 95.2% | 94.1% | 93.7% |

### System Performance
- Response Time: < 2 seconds for critical alerts
- LoRa Range: Up to 15km in rural areas
- Battery Life: 6+ months for sensor nodes
- Drone Coverage: 5km² per flight mission

---

## Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- ESP32 development environment
- LoRa modules (SX1278/SX1276)

### Installation

```bash
# Clone the repository
git clone https://github.com/sidjay999/Safence.git
cd Safence

# Install dependencies
npm install
pip install -r requirements.txt

# Environment setup
cp .env.example .env
# Configure your environment variables

# Start development server
npm run dev
```

### Hardware Setup
1. Flash ESP32 with LoRa transmitter/receiver code
2. Configure LoRa frequency bands (433MHz/868MHz/915MHz)
3. Deploy sensor nodes in target monitoring areas

---

## Project Structure

```
Safence/
├── client/                     # React frontend (TypeScript + Vite)
│   ├── src/components/        # Reusable UI components
│   ├── src/pages/            # Application pages
│   └── src/hooks/            # Custom React hooks
│
├── Lora-Receiver/             # ESP32 receiver module
│   ├── src/main.cpp          # Main receiver code
│   └── alert_receiver/       # Alert handling logic
│
├── Lora-transmitter/          # ESP32 transmitter module  
│   ├── src/main.cpp          # Main transmitter code
│   └── sensor_data/          # Sensor data collection
│
├── Yolo & Grid-side ML model/ # AI/ML components
│   ├── fences/               # YOLOv8 fence detection
│   │   └── runs/train4/weights/best.pt  # Best model weights
│   └── gridsidemodel/        # XGBoost power classifier
│       ├── kerala_illegal_fence_detection_dataset.csv
│       └── xgboost_model.pkl # Trained model (99% accuracy)
│
└── fsd/                      # Backend services & API
```

---

## AI Models

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/yolo.svg" width="16" height="16" style="vertical-align: text-bottom;"> YOLOv8 Fence Detection
- **Training Data**: Custom annotated images via [Roboflow](https://app.roboflow.com/electric-fence/electric-fence-konqs/1)
- **Performance**: 95.2% accuracy on validation set
- **Model Location**: `fences/runs/train4/weights/best.pt`

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/xgboost.svg" width="16" height="16" style="vertical-align: text-bottom;"> XGBoost Grid Classifier
- **Dataset**: 9,500+ synthetic KSEBL grid readings
- **Features**: 24 engineered features including geographic data, consumption patterns, and grid metrics
- **Performance**: 99% test accuracy, 97% validation accuracy

**Key Features:**
```
area_id, district, city, area_name, latitude, longitude, area_type, 
households, distance_to_substation_km, expected_consumption_kwh, 
actual_consumption_kwh, voltage_reading_v, current_reading_a, 
consumption_deviation_pct, power_factor, load_factor, seasonal_data
```

---

## Demo & Documentation

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" width="16" height="16" style="vertical-align: text-bottom;"> Project Demo
[![Watch Demo](https://img.shields.io/badge/Watch%20Demo-FF0000?logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=7cNsytZVGlw)

### <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg" width="16" height="16" style="vertical-align: text-bottom;"> Research Documentation
[![View Research](https://img.shields.io/badge/View%20Research-6366F1?logo=notion&logoColor=white)](https://app.eraser.io/workspace/XtLtvYNHcFG9V9eLr2KM)


---

For support and questions:
- <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" width="16" height="16" style="vertical-align: text-bottom;"> [Issues](https://github.com/sidjay999/Safence/issues)
- <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" width="16" height="16" style="vertical-align: text-bottom;"> [Discussions](https://github.com/sidjay999/Safence/discussions)

---

<div align="center">

**Safence - Protecting Communities Through Smart Technology**

[![GitHub stars](https://img.shields.io/github/stars/sidjay999/Safence?style=social)](https://github.com/sidjay999/Safence/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sidjay999/Safence?style=social)](https://github.com/sidjay999/Safence/network/members)

</div>