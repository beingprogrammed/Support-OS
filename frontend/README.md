# SupportOS - Premium Support Platform Frontend

SupportOS is a next-generation support and ticketing platform built with React and Vite. It features a modern "White Theme" aesthetic with high-fidelity interactivity, role-based workflows, and advanced administrative tools.

## 🚀 Key Features

- **Role-Based Workspaces:** Dedicated dashboards and tools for Customers, Agents, Admins, and SuperAdmins.
- **Advanced Ticketing:** Full lifecycle management including creation, queue filtering, detailed timelines, and status tracking.
- **Premium Chat Interface:** Professional full-page chat with AI-powered reply suggestions and attachment support.
- **Interactive Global Systems:** Functional notification system, global search, and real-time theme customization.
- **Authentication:** Secure login flow with role selection and Protected Routes.
- **Administrative Suite:** Tenant management for SuperAdmins and agent performance monitoring for Admins.

## 📂 Project Structure

```text
src/
├── components/
│   ├── chat/     # Reusable chat windows, bubbles, and indicators
│   ├── common/   # Universal UI elements (Button, Input, Modal, etc.)
│   ├── layout/   # Core application shell (Header, Sidebar, Protected Routes)
│   └── ticket/   # Specialized ticket cards, badges, and timelines
├── pages/
│   ├── admin/      # Management, Analytics, and FAQ settings
│   ├── agent/      # Dashboard, Queue, and Detailed Ticket views
│   ├── auth/       # Login, Registration, and Password recovery
│   ├── customer/   # Ticket portal and Live Chat
│   └── superadmin/ # Platform-wide tenant and analytics management
├── hooks/        # Custom logic for Auth, Notifications, and Sockets
├── services/     # API integration layer and role-specific services
├── store/        # Lightweight state management
├── contexts/     # Global providers (NotificationProvider)
└── utils/        # Shared constants and helper functions
```

## 🛠️ Technology Stack

- **React 18** (Vite-powered)
- **Lucide React** (Modern Iconography)
- **MUI Material** (Specialized alerts and UI components)
- **Vanilla CSS** (Custom high-performance styling)
- **React Router 6** (Dynamic Routing)

## 🚦 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Log In with Demo Credentials:**
   - **Admin:** `admin@supportos.com` / `admin123`
   - **Agent:** `agent@supportos.com` / `agent123`
   - **Customer:** `customer@supportos.com` / `customer123`

---

Built with precision for the modern support ecosystem.
