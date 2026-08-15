# Product Requirements Document (PRD)
## Nestly — Student Task & Study Dashboard

**Version:** 1.0 (Phase 1 — Frontend)
**Author:** Syukron Raffiansyah (Vyy)
**Status:** In Development
**Last Updated:** 2026

---

## 1. Problem Statement

Mahasiswa umumnya mengelola tugas kuliah, deadline, jadwal, dan sesi belajar secara terpisah — lewat catatan manual, aplikasi to-do generik, kalender, dan pengingat yang tidak saling terhubung. Akibatnya:

- Tugas dan deadline mudah terlewat karena tidak ada satu tempat yang menampilkan urgensi secara jelas.
- Progress pengerjaan tugas sulit dipantau secara visual.
- Jadwal kuliah dan sesi belajar tidak terintegrasi dengan daftar tugas.
- Tidak ada sistem yang membantu mahasiswa fokus belajar secara terstruktur (misalnya dengan teknik Pomodoro).

Mahasiswa membutuhkan satu dashboard terpusat yang dapat menampilkan tugas, progress, jadwal, dan tingkat urgensi deadline secara jelas, tanpa proses setup yang rumit (tanpa akun di phase 1, tanpa instalasi tambahan).

---

## 2. Goals & Objectives

**Tujuan Utama:**
- Membantu mahasiswa mengorganisir tugas dan aktivitas kuliah dalam satu dashboard terpusat.
- Memudahkan pengguna memantau progress setiap tugas secara visual.
- Menampilkan informasi akademik (tugas, jadwal, deadline) dalam satu tampilan yang ringkas dan mudah dipahami.
- Membuat pengalaman pengelolaan tugas yang sederhana, cepat digunakan, dan tanpa hambatan (no sign-up di Phase 1).
- Membangun arsitektur yang dapat berkembang secara bertahap dari Frontend-only menjadi Full-stack application tanpa perlu membangun ulang Frontend dari awal.

**Objectives (Terukur):**
- Pengguna dapat menambah, mengedit, menghapus, dan melacak status tugas dalam <3 langkah interaksi.
- Dashboard menampilkan ringkasan aktivitas (total tugas, status, progress keseluruhan, deadline terdekat) tanpa perlu berpindah halaman.
- Sistem memberi indikator urgensi visual (warna) otomatis berdasarkan kedekatan deadline.
- Timer Pomodoro dapat otomatis menghitung pembagian sesi belajar berdasarkan total durasi yang diinput pengguna.
- Semua data (tugas, progress, jadwal, tema) tetap tersimpan setelah browser ditutup, selama data tidak dihapus dari `localStorage`.

---

## 3. Target Users

| Segmen | Deskripsi |
|---|---|
| **Mahasiswa (individu)** | Pengguna utama Phase 1 — menggunakan Nestly secara personal untuk mengelola tugas kuliah masing-masing melalui `localStorage`. |
| **Kelompok belajar / study circle** | Kelompok kecil mahasiswa yang ingin memakai konsep dashboard yang sama untuk masing-masing anggota. |
| **Kelas** | Berpotensi menggunakan dashboard bersama pada pengembangan lanjutan (Phase 2–3) saat multi-user sudah tersedia. |

**Karakteristik pengguna:**
- Memiliki banyak tugas kuliah dengan deadline berbeda-beda dalam satu waktu.
- Menginginkan solusi cepat pakai, tanpa proses registrasi/login (di versi awal).
- Terbiasa menggunakan aplikasi berbasis web/browser.
- Ingin memantau progress belajar dan pengerjaan tugas secara visual.

> Catatan: Pada versi awal (Phase 1), setiap pengguna menggunakan Nestly secara individual via `localStorage` browser masing-masing — belum ada akun atau data bersama antar pengguna.

---

## 4. Functional Requirements

### FR-1 — Task Management
- FR-1.1 Pengguna dapat menambahkan tugas baru.
- FR-1.2 Pengguna dapat melihat daftar seluruh tugas.
- FR-1.3 Pengguna dapat mengubah informasi tugas (judul, deadline, status, dll).
- FR-1.4 Pengguna dapat menghapus tugas.
- FR-1.5 Pengguna dapat memperbarui progress tugas (dalam persentase).
- FR-1.6 Pengguna dapat menentukan deadline tugas.
- FR-1.7 Pengguna dapat menentukan status tugas: `Not Started`, `In Progress`, `Completed`.

### FR-2 — Task Progress
- FR-2.1 Setiap tugas menampilkan progress bar visual berdasarkan persentase penyelesaian.
- FR-2.2 Progress dapat diperbarui secara manual oleh pengguna.
- FR-2.3 Progress tersimpan otomatis ke `localStorage` setiap kali diperbarui.

### FR-3 — Dashboard
- FR-3.1 Menampilkan total jumlah tugas.
- FR-3.2 Menampilkan jumlah tugas per status (Not Started / In Progress / Completed).
- FR-3.3 Menampilkan progress keseluruhan (agregat semua tugas).
- FR-3.4 Menampilkan deadline terdekat.
- FR-3.5 Menampilkan ringkasan aktivitas belajar pengguna.

### FR-4 — Schedule
- FR-4.1 Pengguna dapat menambahkan jadwal kuliah/aktivitas belajar dengan informasi: nama mata kuliah, hari, waktu, ruangan, dosen.
- FR-4.2 Pengguna dapat melihat, mengedit, dan menghapus jadwal.
- FR-4.3 Jadwal ditampilkan dalam format yang mudah dibaca (mis. per hari/minggu).

### FR-5 — Deadline Tracking
- FR-5.1 Tugas dikategorikan otomatis berdasarkan urgensi deadline: `Due Today`, `Due Tomorrow`, `Upcoming`, `Overdue`.
- FR-5.2 Setiap tugas memiliki indikator warna urgensi otomatis:
  - 🟢 Green — deadline masih jauh, aman.
  - 🟡 Yellow — deadline mulai mendekat.
  - 🟠 Orange — deadline dekat, perlu diprioritaskan.
  - 🔴 Red — deadline mendesak / overdue.
- FR-5.3 Indikator warna diperbarui otomatis berdasarkan tanggal sistem saat ini.

### FR-6 — Pomodoro Timer
- FR-6.1 Pengguna dapat menentukan total durasi belajar yang diinginkan (Scheduled Mode).
- FR-6.2 Sistem otomatis membagi total durasi menjadi sesi Work (25 menit) dan Break (5 menit) berulang sesuai metode Pomodoro.
- FR-6.3 Timer menampilkan sesi yang sedang berjalan (Work/Break) beserta hitung mundur.
- FR-6.4 Pengguna dapat memulai, menjeda, dan menghentikan timer.

### FR-7 — Search, Filter & Sorting
- FR-7.1 Pengguna dapat mencari tugas berdasarkan kata kunci.
- FR-7.2 Pengguna dapat memfilter tugas berdasarkan: status, deadline, mata kuliah, progress.
- FR-7.3 Pengguna dapat mengurutkan tugas berdasarkan: deadline terdekat, progress tertinggi, progress terendah, tugas terbaru.

### FR-8 — Theme
- FR-8.1 Pengguna dapat beralih antara Light mode dan Dark mode.
- FR-8.2 Preferensi tema disimpan di `localStorage` dan diterapkan otomatis saat website dibuka kembali.

### FR-9 — Data Persistence (Phase 1)
- FR-9.1 Seluruh data (task, progress, deadline, status, schedule, theme, pengaturan pengguna) disimpan di `localStorage` browser.
- FR-9.2 Data tetap tersedia setelah browser/website ditutup, selama data browser tidak dihapus pengguna.

---

## 5. Non-Functional Requirements

| Kategori | Kebutuhan |
|---|---|
| **Usability** | Antarmuka harus intuitif dan dapat digunakan tanpa onboarding/tutorial; alur menambah tugas maksimal 3 langkah. |
| **Performance** | Interaksi CRUD tugas dan update progress harus terasa instan (< 200ms) karena seluruh data berjalan di sisi klien (`localStorage`). |
| **Responsiveness** | Tampilan harus responsif dan berfungsi baik di perangkat Mobile, Tablet, dan Desktop. |
| **Reliability** | Data tidak boleh hilang selama pengguna tidak menghapus data browser/localStorage secara manual. |
| **Availability** | Aplikasi dapat diakses tanpa koneksi backend (fully client-side di Phase 1); idealnya mendukung penggunaan offline dasar. |
| **Maintainability** | Struktur kode harus modular dan framework-agnostic agar mudah dimigrasikan ke arsitektur Full-stack (Phase 2–3) tanpa membangun ulang UI dari nol. |
| **Scalability** | Arsitektur data harus dirancang agar model data (task, schedule, progress) mudah dipetakan ke skema database saat masuk Phase 2. |
| **Security (Future)** | Saat Phase 2 (Backend & Auth) diimplementasi, autentikasi pengguna dan data per-user harus terlindungi dan tervalidasi di sisi server. |
| **Portability** | Versi Frontend harus dapat di-deploy sebagai static site di layanan hosting gratis (GitHub Pages, Vercel, Netlify). |
| **Accessibility** | Kontras warna (termasuk indikator urgensi & dark/light mode) harus tetap terbaca dan sesuai standar aksesibilitas dasar. |

---

## 6. Product Scope

### 6.1 In Scope — Phase 1 (Frontend Only)
- Student dashboard (ringkasan aktivitas).
- Task management (CRUD tugas).
- Progress tracking per tugas.
- Deadline management & indikator urgensi warna.
- Schedule (jadwal kuliah).
- Pomodoro timer (Scheduled Mode).
- Search, filter & sorting tugas.
- Theme preference (Light/Dark mode).
- Local data persistence via `localStorage`.
- Responsive interface (Mobile, Tablet, Desktop).

### 6.2 Out of Scope — Future Phases

**Phase 2 — Backend & Authentication:**
- REST/GraphQL API.
- User authentication.
- Role management.
- Data validation sisi server.

**Phase 3 — Full-Stack & Cloud Sync:**
- Integrasi database.
- Sinkronisasi data antar perangkat (cross-device sync).
- Notifikasi.
- Analitik lanjutan (advanced analytics).
- Multi-user support & user profile.
- Production deployment skala penuh.

> Catatan: Fitur-fitur di atas TIDAK termasuk dalam scope PRD versi 1.0 ini, namun arsitektur Phase 1 harus dirancang agar kompatibel untuk pengembangan ke fase tersebut.

---

## 7. Features & Requirements Summary

| # | Fitur | Deskripsi Singkat | Prioritas |
|---|---|---|---|
| 1 | Task Management | CRUD tugas, status, deadline | Must Have |
| 2 | Task Progress | Progress bar per tugas, update manual | Must Have |
| 3 | Dashboard | Ringkasan total tugas, status, progress, deadline terdekat | Must Have |
| 4 | Schedule | Jadwal kuliah (mata kuliah, hari, waktu, ruangan, dosen) | Must Have |
| 5 | Deadline Tracking | Kategori urgensi + indikator warna otomatis | Must Have |
| 6 | Pomodoro Timer | Scheduled mode — auto-split work/break session | Must Have |
| 7 | Search, Filter & Sorting | Cari & atur tugas berdasarkan kriteria | Should Have |
| 8 | Theme (Light/Dark) | Toggle tema + preferensi tersimpan lokal | Should Have |
| 9 | Data Persistence | Simpan semua data ke `localStorage` | Must Have |
| 10 | Responsive Design | Optimal di Mobile, Tablet, Desktop | Must Have |

---

## 8. Design System

> Design System versi lengkap (warna, tipografi, komponen) akan ditentukan lebih lanjut. Berikut garis besar awal berdasarkan dokumentasi project:

### 8.1 Prinsip Desain
- **Simple & Clean** — fokus pada keterbacaan informasi, minim clutter.
- **Visual-first for urgency** — pengguna dapat langsung mengenali prioritas tugas hanya lewat warna/indikator visual, tanpa perlu membaca detail.
- **Consistency** — komponen UI (card, button, progress bar) konsisten di seluruh halaman (Dashboard, Task List, Schedule, Pomodoro).
- **Distraction-free** — khususnya pada tampilan Pomodoro Timer, UI harus minim elemen yang mengganggu fokus.

### 8.2 Tema (Theming)
- Mendukung **Light Mode** dan **Dark Mode**.
- Preferensi tema disimpan secara lokal (`localStorage`) dan diterapkan otomatis saat aplikasi dibuka kembali.

### 8.3 Sistem Warna — Urgency Indicator
Warna berikut digunakan secara konsisten sebagai bahasa visual utama untuk deadline tracking:

| Warna | Makna |
|---|---|
| 🟢 Green | Aman, deadline masih jauh |
| 🟡 Yellow | Mulai mendekat, perlu diperhatikan |
| 🟠 Orange | Mendesak, perlu diprioritaskan |
| 🔴 Red | Overdue / sangat kritis |

### 8.4 Komponen Utama (Preliminary)
- **Task Card** — menampilkan judul tugas, progress bar, status, dan indikator warna urgensi.
- **Progress Bar** — representasi visual progress (persentase) per tugas dan progress keseluruhan.
- **Dashboard Summary Widget** — kartu ringkasan statistik (total tugas, status, deadline terdekat).
- **Schedule Table/List** — menampilkan jadwal kuliah secara terstruktur.
- **Pomodoro Timer Display** — tampilan countdown sesi Work/Break.
- **Filter & Sort Bar** — kontrol untuk pencarian, filter, dan pengurutan tugas.
- **Theme Toggle** — switch Light/Dark mode.

### 8.5 Layout & Responsiveness
- Layout harus adaptif untuk 3 breakpoint utama: Mobile, Tablet, Desktop.
- Dashboard sebagai halaman utama (landing) setelah aplikasi dibuka.

> Detail lanjutan (color palette spesifik/hex, font family, spacing scale, komponen library) akan dilengkapi setelah tech stack Frontend difinalisasi dan asset desain tersedia.

---

## Appendix — Referensi Tambahan (dari PROJECT.md & README.md)

- **Data yang disimpan di `localStorage` (Phase 1):** Task, Progress, Deadline, Status, Schedule, Theme preference, Pengaturan pengguna.
- **Roadmap Pengembangan:**
  - Phase 1 (🟢 Current) — Frontend & Local Storage.
  - Phase 2 (🟡 Future) — Backend & Authentication (REST/GraphQL API, User Auth, Role Management, Data Validation).
  - Phase 3 (🔵 Future) — Full-Stack & Cloud Sync (Database Integration, Cross-device Sync, Notifications, Advanced Analytics).
- **Deployment (Phase 1):** Static hosting (GitHub Pages / Vercel / Netlify) karena tidak membutuhkan server-side processing.
- **Tech Stack:** Belum difinalisasi (Frontend framework/library, Backend, dan Database masih berstatus "To be decided"); struktur kode Phase 1 dibuat framework-agnostic agar mudah dimigrasi.