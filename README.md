# Nestly — Student Task & Study Dashboard

[![Status](https://img.shields.io/badge/Status-In%20Development-blue?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Stack-Laravel%20%2B%20Livewire-red?style=for-the-badge)](#)
[![Storage](https://img.shields.io/badge/Data-LocalStorage-orange?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

> 🎓 **All-in-one academic dashboard for students.** Track tasks, monitor progress, manage class schedules, and keep your student finances in check — all in one place.

**Live Demo :** Coming Soon

**Current Status :** Full Stack Development (Laravel + Livewire)

---

## 🚀 About Nestly

Nestly is a web application designed to help students manage their academic life without the clutter. From tracking assignment deadlines to keeping monthly finances under control, Nestly turns a chaotic student life into a clear, actionable dashboard.

Nestly is built as a **full stack application** using **Laravel** for both backend and frontend (via Blade + Livewire), with data stored in a **MySQL database**. The app runs locally using **Laragon** as the local development server, and the database is managed through **HeidiSQL**.

---

## ✨ Core Features

### 📝 Task Management
- Create, edit, delete, and categorize academic tasks
- Track status: `Not Started` → `In Progress` → `Completed`
- Set deadlines, priority levels, and progress percentage (0–100%)

### 📊 Progress & Dashboard
- Visual progress bars for each task
- Dashboard overview: total tasks, completion rate, nearest deadlines
- Real-time statistics summary powered by Livewire

### ⏰ Deadline Tracking
- Smart urgency indicators:
  - 🟢 **Green** — Safe & on track
  - 🟡 **Yellow** — Approaching deadline
  - 🟠 **Orange** — High priority needed
  - 🔴 **Red** — Overdue / Critical

### 🗓️ Schedule Management
- Log class schedules (Subject, Day, Time, Room, Lecturer)
- Quick reference for weekly academic planning

### 💰 Finance Tracker
- Record income & expenses with categories (food, transport, allowance, academic needs, etc.)
- Set monthly budget and track remaining balance
- Visual indicator when spending is approaching or exceeding budget

### 🔍 Search, Filter & Sort
- Filter by status, deadline, subject, or progress
- Sort by nearest deadline, highest/lowest progress, or creation date

### 🎨 Theme & UX
- Light / Dark mode toggle
- Fully responsive design (Mobile, Tablet, Desktop)

---

## 🛠️ Tech Stack & Architecture

| Component | Technology |
|-----------|------------|
| **Frontend & Backend** | Laravel (Blade + Livewire) |
| **Styling** | Tailwind CSS |
| **Database** | MySQL |
| **Local Dev Server** | Laragon |
| **Database Management Tool** | HeidiSQL |
| **Deployment** | Localhost (personal project / portfolio) |

> ℹ️ No separate JavaScript framework is used — all dynamic/interactive features (real-time updates, filters, progress indicators) are handled through **Livewire**.

---

## 🗺️ Development Roadmap

| Phase | Focus | Key Deliverables |
|-------|-------|------------------|
| **Phase 1** 🟢 | **Core Full Stack Build** | Database design, Task CRUD, Schedule CRUD, Finance Tracker, Dashboard, Livewire integration, Tailwind UI |
| **Phase 2** 🟡 | **Refinement & UX Polish** | Search/filter/sort improvements, deadline urgency indicators, dark/light mode, responsive design |
| **Phase 3** 🔵 | **Enhancements (Future)** | User authentication (multi-user support), notifications, advanced analytics/reports, potential cloud deployment |

---

## 🤝 Contributing & Feedback

Nestly is a personal academic project aimed at solving real student pain points. Feedback, feature requests, and collaboration are highly welcome!
- 🐛 Found a bug? Open an [Issue](#)
- 💡 Have an idea? Start a [Discussion](#)
- 🛠️ Want to contribute? Check the [Roadmap](#️-development-roadmap)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

> ⚠️ **Disclaimer:** Nestly is currently in active development. Features and architecture may evolve as the project progresses.

---

<div align="center">
  <sub>Built with ❤️ by <strong>Syukron Raffiansyah (Vyy)</strong> • 2026</sub>
</div>