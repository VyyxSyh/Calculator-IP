# Nestly — Student Task & Study Dashboard

[![Status](https://img.shields.io/badge/Status-Phase%201%20(Frontend)-blue?style=for-the-badge)](#)
[![Storage](https://img.shields.io/badge/Data-LocalStorage-orange?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

> 🎓 **All-in-one academic dashboard for students.** Track tasks, monitor progress, manage schedules, and optimize study sessions — beautifully organized in one place.

 **Live Demo :** [Link Demo]

 **Current Phase :** Frontend Only (v1.0)

---

## 🚀 About Nestly

Nestly is a web application designed to help students manage their academic life without the clutter. From tracking assignment deadlines to visualizing study progress, Nestly turns chaotic schedules into a clear, actionable dashboard.

Currently in **Phase 1 (Frontend Development)**, Nestly runs entirely in the browser using `localStorage` for data persistence. No sign-up, no backend required — just open and start organizing. The architecture is built to seamlessly scale into a full-stack application with user authentication and cloud sync in future phases.

---

## ✨ Core Features (Phase 1)

###  Task Management
- Create, edit, delete, and categorize academic tasks
- Track status: `Not Started` → `In Progress` → `Completed`
- Set deadlines & priority levels

###  Progress & Dashboard
- Visual progress bars for each task
- Dashboard overview: total tasks, completion rate, nearest deadlines
- Real-time statistics & study activity summary

### ⏰ Deadline Tracking
- Smart urgency indicators:
  - 🟢 **Green** — Safe & on track
  - 🟡 **Yellow** — Approaching deadline
  - 🟠 **Orange** — High priority needed
  - 🔴 **Red** — Overdue / Critical

### 🍅 Pomodoro Timer
- **Scheduled Mode:** Input total study time → auto-generates optimized Work/Break sessions (25m/5m cycles)
- Clean, distraction-free focus interface

### 🗓️ Schedule Management
- Log class schedules (Subject, Day, Time, Room, Lecturer)
- Quick reference for weekly academic planning

### 🔍 Search, Filter & Sort
- Filter by status, deadline, subject, or progress
- Sort by nearest deadline, highest/lowest progress, or creation date

### 🎨 Theme & UX
- Light / Dark mode toggle
- Preferences saved locally via `localStorage`
- Fully responsive design (Mobile, Tablet, Desktop)

---

## 🛠️ Tech Stack & Architecture

| Component | Technology |
|-----------|------------|
| **Frontend** | React |
| **Styling** | Tailwind CSS |
| **Data Storage** | `localStorage` |
| **State Management** | React State/Hooks + Local Storage API |
| **Deployment** | Static Hosting Netlify |

---

## 🗺️ Development Roadmap

Nestly is being built in structured phases to ensure scalability, clean architecture, and smooth UX progression:

| Phase | Focus | Key Deliverables |
|-------|-------|------------------|
| **Phase 1** 🟢 | **Frontend & Local Storage** | UI/UX, Dashboard, Task CRUD, Pomodoro, Filters, Dark/Light Mode, `localStorage` persistence |
| **Phase 2** 🟡 | **Backend & Authentication** | REST/GraphQL API, User Auth, Role Management, Data Validation, Server-side Logic |
| **Phase 3** 🔵 | **Full-Stack & Cloud Sync** | Database Integration, Cross-device Sync, Notifications, Advanced Analytics, Production Deployment |

---

##  Contributing & Feedback

Nestly is a personal academic project aimed at solving real student pain points. Feedback, feature requests, and collaboration are highly welcome!
- 🐛 Found a bug? Open an [Issue](#)
- 💡 Have an idea? Start a [Discussion](#)
- 🛠️ Want to contribute? Check the [Roadmap](#️-development-roadmap)

---

##  License

Distributed under the **MIT License**. See `LICENSE` for details.

> ⚠️ **Disclaimer:** Nestly is currently in active development (Phase 1). Features, UI, and tech stack may evolve as the project progresses toward full-stack architecture.

---

<div align="center">
  <sub>Built with ❤️ by <strong>Syukron Raffiansyah (Vyy)</strong> • 2026</sub>
</div>