# LAST-FIVE-BRAIN-CELLS--PRIYANSHITA-SINGH-
# VeritasOne AI 🛡️
> **AI-Powered NGO Forensic Verification & Social Impact Platform**

VeritasOne AI is an advanced forensic verification and transparency platform designed to build trust between donors, volunteers, and Non-Governmental Organizations (NGOs). By leveraging automated document auditing, financial forensics, geolocation proximity, and AI trust scoring, VeritasOne AI ensures that every contribution reaches verified, high-impact social initiatives.

PROTOTYPE LINK : https://ng-ozip--singhpriyanshit.replit.app/

---

## ✨ Key Features

- **🤖 AI Forensic Verification Studio**: Analyzes 80G, 12A, FCRA registrations, tax filings, and audited financial statements with real-time risk indicator scoring and confidence levels.
- **🔍 NGO Explorer & Distance Mapping**: Geolocation-based discovery of nearby verified NGOs, filterable by sector (Education, Healthcare, Environment, Women Empowerment, etc.), trust rating, and radius.
- **📄 NGO Upload Portal**: Secure document submission portal for NGOs to submit government registrations, financial audits, and project reports for verification.
- **🔒 Backend OTP Authentication Service**: Node.js & Express authentication server for passwordless login via Mobile OTP and Email OTP.
- **🤝 Volunteer & Donor Hub**: Interactive modals to join active volunteer drives, connect directly with NGO representatives, or make verified donations.
- **💬 Feedback & Transparency Hub**: Community feedback system, donor testimonials, and forensic audit reports.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts

### **Backend**
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Middleware**: CORS, Body Parser
- **Authentication**: Custom OTP Generator & In-Memory Verification Engine

---

## 📁 Repository Structure & File Classification

```
NGO/
├── server.js               # [Backend] Express Node.js backend server (API & OTP Service)
├── index.html              # [Frontend] Main HTML template
├── standalone_demo.html    # [Frontend] Standalone HTML demo interface
├── vite.config.ts          # [Frontend Tooling] Vite bundler configuration
├── tailwind.config.js      # [Frontend Tooling] Tailwind CSS framework config
├── postcss.config.js       # [Frontend Tooling] PostCSS config
├── tsconfig.json           # [Tooling] TypeScript configuration
├── package.json            # [Tooling] Project metadata & npm dependencies
└── src/                    # [Frontend Source Code]
    ├── main.tsx            # React application entry point
    ├── App.tsx             # Root component with state management & views
    ├── index.css           # Global CSS styles & Tailwind imports
    ├── components/         # UI Components
    │   ├── AIVerificationStudio.tsx   # AI Forensic Analysis Dashboard
    │   ├── ArchitectureView.tsx       # System Architecture & Flow Diagram
    │   ├── AuthLocationModal.tsx      # Auth & Geolocation Selector Modal
    │   ├── ContactNGOModal.tsx         # Direct NGO Contact Form
    │   ├── FeedbackHub.tsx            # Community Reviews & Ratings
    │   ├── NGODetailView.tsx          # Full NGO Profile & Impact Metrics
    │   ├── NGOExplorer.tsx            # Interactive Search & Filter Directory
    │   ├── NGOUploadPortalModal.tsx   # Document Upload & Verification Portal
    │   ├── Navbar.tsx                 # Navigation Bar
    │   ├── OpenVolunteerDriveModal.tsx# Volunteer Drive Creation Modal
    │   └── VolunteerModal.tsx         # Volunteer Application Modal
    ├── data/
    │   └── mockNGOs.ts     # Mock NGO dataset & verification records
    ├── types/
    │   └── index.ts        # TypeScript data contracts & type definitions
    └── utils/
        ├── authApi.ts      # API client for backend authentication
        └── distance.ts    # Haversine geolocation distance utility
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### **1. Installation**
Clone the repository and install all dependencies:
```bash
npm install
```

### **2. Running the Application**

#### **Start the Frontend Development Server**
```bash
npm run dev
```
The frontend web application will start at `http://localhost:5173`.

#### **Start the Backend API Server**
In a separate terminal window, start the Node.js backend:
```bash
npm run server
```
The backend authentication server will run at `http://localhost:3001`.

---

## 📡 API Endpoints

The backend Express server (`server.js`) exposes the following endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint returning server status & timestamp |
| `POST` | `/api/auth/send-otp` | Generates & sends a 6-digit numeric OTP to email or phone |
| `POST` | `/api/auth/verify-otp` | Verifies the submitted OTP against stored session data |

---

## 📦 Production Build

To compile TypeScript and create an optimized production build for deployment:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🛡️ License

This project is open source and available under the MIT License.
