# Data Visualization Platform

A modern data visualization dashboard built with React, TypeScript, and Vite, featuring interactive charts, variable editing, and real-time data visualization.

## 🚀 Features

### Core Screens
- **Dashboard Screen**
  - Interactive data visualization component
  - Variables Panel for parameter adjustments
  - Edit Variables button with slide-over functionality

- **Variable Editing Screen**
  - Slide-over card interface
  - Real-time visualization updates
  - Smooth transitions and focus states

- **Details Screen**
  - Data point hover interactions
  - Contextual information display
  - Fade-in animations

### Key Interactions
- 🔄 Slide-Over Variable Editing
- 💡 Data Point Hover Details
- ✨ Variable Selection & Toggle

### Technical Features
- 📱 Responsive Layout
- 🔐 Firebase Authentication
- 🎯 State Management (Redux/Zustand)
- 🎨 Modern UI/UX with Smooth Transitions

## 🛠️ Technical Stack

- **Frontend:** React 18+ with TypeScript
- **State Management:** Redux Toolkit/Zustand
- **Routing:** React Router v6+
- **Styling:** Tailwind CSS
- **Authentication:** Firebase (Google OAuth + Email/Password)
- **Build Tool:** Vite

## 🏗️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/data-viz-platform.git
   cd data-viz-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=<Your_Firebase_API_Key>
   VITE_FIREBASE_AUTH_DOMAIN=<Your_Firebase_Auth_Domain>
   VITE_FIREBASE_PROJECT_ID=<Your_Firebase_Project_ID>
   VITE_FIREBASE_STORAGE_BUCKET=<Your_Firebase_Storage_Bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<Your_Firebase_Messaging_Sender_ID>
   VITE_FIREBASE_APP_ID=<Your_Firebase_App_ID>
   ```

## 🚦 Running the Application

**Development**
```bash
npm run dev
# Open http://localhost:5173
```

**Production**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
data-viz-platform/
├─ src/
│  ├─ components/    # UI components
│  ├─ features/      # Feature logic
│  ├─ hooks/         # Custom hooks
│  ├─ pages/         # Page components
│  ├─ state/         # State management
│  ├─ styles/        # Global styles
│  ├─ utils/         # Utilities
│  ├─ App.tsx        # Root component
│  └─ main.tsx       # Entry point
├─ public/
└─ [config files]
```

## 🤔 Technical Decisions & Trade-offs

### Chosen Technologies
- **State Management:** Redux Toolkit/Zustand for scalability
- **Styling:** Utility-first CSS with Tailwind
- **TypeScript:** Enhanced type safety and maintainability
- **Firebase Auth:** Quick integration and scalability

### Current Limitations
- 📊 Uses mock data (needs real data integration)
- ⚠️ Basic error handling (needs enhancement)
- 🌐 Modern browser focus (needs broader support)

## ⏱️ Development Timeline

| Phase | Time |
|-------|------|
| Initial Setup | ~2 hours |
| Design & Layout | ~4-6 hours |
| State & Interactions | ~3-4 hours |
| Styling & Animations | ~2-3 hours |
| Review & Documentation | ~1-2 hours |

## 📞 Contact

- Design Questions: shaurya@answersai.ai
- Technical Questions: siddhant@answersai.com