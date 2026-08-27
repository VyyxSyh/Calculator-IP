# Nestly - Project System

## 1. Project Overview

**Nestly** adalah web application untuk membantu mahasiswa mengelola aktivitas perkuliahan dan tugas dalam satu dashboard.

Project ini dirancang untuk membantu pengguna memantau tugas, deadline, progress, jadwal, serta aktivitas belajar secara lebih terorganisir. 

Pengembangan project dilakukan secara bertahap. Versi awal berfokus pada **Frontend**, menggunakan data lokal melalui `localStorage`. Pada tahap berikutnya, project dapat dikembangkan menjadi aplikasi full-stack dengan **Backend dan Database** sehingga dapat mendukung akun pengguna dan sinkronisasi data antar perangkat.

---

## 2. Project Goals

Tujuan utama project:

* Membantu mahasiswa mengorganisir tugas dan aktivitas kuliah.
* Memudahkan pengguna memantau progress setiap tugas.
* Menampilkan informasi akademik dalam satu dashboard.
* Membuat pengalaman pengelolaan tugas yang sederhana dan mudah digunakan.
* Menjadi project yang dapat dikembangkan secara bertahap dari Frontend menjadi Full-stack Application.

---

## 3. Target Users

Target utama:

* Mahasiswa.
* Kelompok belajar.
* Circle atau kelompok kecil mahasiswa.
* Kelas yang ingin menggunakan dashboard bersama.

Versi awal dapat digunakan secara individual menggunakan `localStorage`.

Pada versi berikutnya, sistem dapat dikembangkan agar setiap pengguna memiliki akun dan data masing-masing menggunakan Backend dan Database.

---

## 4. Core Features

### 4.1 Task Management

Pengguna dapat mengelola tugas kuliah.

Fitur:

* Menambahkan tugas.
* Melihat daftar tugas.
* Mengubah informasi tugas.
* Menghapus tugas.
* Mengubah progress tugas.
* Menentukan deadline.
* Menentukan status tugas.

Contoh status:

* Not Started
* In Progress
* Completed

---

### 4.2 Task Progress

Setiap tugas memiliki progress yang dapat diperbarui.

Contoh:

```text
Project IoT
Progress: 70%

██████████████░░░░░░
```

Progress dapat diperbarui oleh pengguna dan disimpan ke penyimpanan lokal pada versi Frontend.

---

### 4.3 Dashboard

Dashboard menjadi halaman utama yang menampilkan ringkasan aktivitas pengguna.

Informasi yang dapat ditampilkan:

* Total tugas.
* Tugas yang belum dimulai.
* Tugas yang sedang dikerjakan.
* Tugas yang telah selesai.
* Progress keseluruhan.
* Deadline terdekat.
* Aktivitas belajar.

Contoh konsep:

```text
Total Tasks        8
Completed          3
In Progress        4
Not Started        1

Overall Progress
██████████████░░░░░░ 68%
```

---

### 4.4 Schedule

Pengguna dapat melihat jadwal perkuliahan atau aktivitas belajar.

Informasi dapat mencakup:

* Nama mata kuliah.
* Hari.
* Waktu.
* Ruangan.
* Dosen.

---

### 4.5 Deadline Tracking

Dashboard dapat menampilkan tugas berdasarkan deadline dan tingkat urgensinya.

Contoh kategori:

- Due Today
- Due Tomorrow
- Upcoming
- Overdue

Setiap tugas dapat memiliki indikator warna berdasarkan tingkat urgensi deadline:

- 🟢 **Green** — Deadline masih cukup jauh dan tugas dalam kondisi aman.
- 🟡 **Yellow** — Deadline mulai mendekat dan perlu diperhatikan.
- 🟠 **Orange** — Deadline sudah dekat dan tugas perlu segera diprioritaskan.
- 🔴 **Red** — Deadline sangat mendesak, sudah jatuh tempo, atau telah melewati deadline.

Tujuannya agar pengguna dapat mengetahui tugas mana yang perlu diprioritaskan hanya dengan melihat indikator visual.

---

### 4.6 Pomodoro Timer

Dashboard menyediakan timer belajar menggunakan metode Pomodoro dengan dua mode penggunaan.

#### Mode 1 — Scheduled Pomodoro

Pengguna menentukan total durasi belajar yang diinginkan.

Sistem kemudian secara otomatis membagi durasi tersebut menjadi beberapa Work Session dan Break Session berdasarkan metode Pomodoro.

Contoh:

```text
Total Study Time: 2 Hours

25m Work
5m Break
25m Work
5m Break
25m Work
5m Break
25m Work
```

### 4.7 Search, Filter & Sorting

Pengguna dapat mencari dan mengatur daftar tugas.

Contoh filter:

* Status.
* Deadline.
* Mata kuliah.
* Progress.

Contoh sorting:

* Deadline terdekat.
* Progress tertinggi.
* Progress terendah.
* Tugas terbaru.

---

### 4.8 Theme

Website mendukung:

* Light mode.
* Dark mode.

Preferensi theme dapat disimpan secara lokal sehingga pilihan pengguna tetap digunakan ketika website dibuka kembali.

---

## 5. Data Storage

### Version 1 — Frontend Only

Versi awal menggunakan:

```text
Frontend
   ↓
JavaScript
   ↓
localStorage
```

Data yang disimpan secara lokal dapat meliputi:

* Task.
* Progress.
* Deadline.
* Status.
* Schedule.
* Theme preference.
* Pengaturan pengguna.

Data akan tetap tersedia setelah browser atau website ditutup selama data pada browser tidak dihapus.

### Future Version — Full Stack

Pada tahap pengembangan berikutnya:

```text
Frontend
   ↓
  API
   ↓
Backend
   ↓
Database
```

Backend dan Database akan digunakan untuk:

* Authentication.
* User management.
* Penyimpanan data terpusat.
* Data per pengguna.
* Sinkronisasi antar perangkat.
* Pengelolaan data untuk banyak pengguna.

---

## 6. User Account

### Version 1

Versi awal tidak menggunakan authentication sungguhan.

Data pengguna disimpan secara lokal pada browser.

### Future Version

Sistem dapat dikembangkan menjadi multi-user.

Contoh:

```text
User
├── Profile
├── Tasks
├── Schedule
└── Progress
```

Setiap user memiliki data masing-masing.

Contoh:

```text
Vyy
├── Project IoT → 80%
└── Mobile Development → 60%

User B
├── Project IoT → 40%
└── Mobile Development → 90%
```

Data tersebut nantinya disimpan pada Database melalui Backend.

---

## 7. Project Development Strategy

Project dikembangkan secara bertahap.

### Phase 1 — Frontend

Fokus:

* UI/UX.
* Responsive design.
* Dashboard.
* Task management.
* Progress tracking.
* Schedule.
* Pomodoro.
* Search & filter.
* Local storage.

### Phase 2 — Backend

Fokus:

* Backend API.
* Authentication.
* User management.
* Database.
* CRUD melalui API.
* Data validation.

### Phase 3 — Full Stack

Frontend dihubungkan dengan Backend dan Database.

Target:

```text
User
  ↓
Frontend
  ↓
Backend API
  ↓
Database
```

Dengan demikian, data pengguna dapat tersimpan secara terpusat dan dapat diakses dari berbagai perangkat.

---

## 8. Technology Stack

### Current Development

Frontend:

- React
- Tailwind CSS

Data Storage:

- localStorage

### Future Development

Backend:

- [To be decided]

Database:

- [To be decided]

Backend, database, dan teknologi tambahan akan ditentukan berdasarkan kebutuhan project dan hasil diskusi sebelum masuk ke tahap pengembangan lebih lanjut (Phase 2 & 3).

---

## 9. Deployment

Versi Frontend dapat di-host menggunakan layanan hosting gratis yang mendukung static websites.

Karena versi awal tidak membutuhkan server-side processing, website dapat berjalan sebagai static web application.

Pada tahap Full Stack, deployment akan disesuaikan dengan kebutuhan Backend dan Database.

---

## 10. Project Scope

### Included

* Student dashboard.
* Task management.
* Progress tracking.
* Deadline management.
* Schedule.
* Pomodoro timer.
* Search, filter & sorting.
* Theme preference.
* Local data persistence.
* Responsive interface.

### Future Scope

* User authentication.
* Multi-user support.
* Backend API.
* Database.
* Cross-device synchronization.
* User profile.
* Role management.
* Notifications.
* Advanced analytics.

---

## 11. Expected Result

Project diharapkan menjadi web application yang dapat membantu mahasiswa mengelola tugas dan aktivitas akademik dengan lebih terorganisir.

Versi awal akan berfungsi sebagai Frontend application yang dapat digunakan secara lokal dan di-host sebagai static website.

Project kemudian dapat dikembangkan secara bertahap menjadi Full-stack Application tanpa harus membangun ulang seluruh Frontend dari awal.

## 12. Color System 

### Light Mode

| Token | Color | Hex | Usage |
|---|---|---|---|
| Primary | Mint Teal | `#2A9D8F` | Primary buttons, active states, links, main accents |
| Secondary | Soft Teal | `#52B7A9` | Secondary actions, supporting accents |
| Tertiary | Pale Mint | `#D8EFEB` | Subtle backgrounds, badges, highlights |
| Background | Warm Off-White | `#F5F4F0` | Main page background |
| Surface | White | `#FFFFFF` | Cards, navbar, panels, modals |
| Text | Charcoal | `#202522` | Headings and primary text |
| Text Muted | Muted Gray-Green | `#68716D` | Descriptions, metadata, secondary text |
| Border | Soft Gray-Green | `#D9DEDA` | Borders, dividers, input outlines |

### Dark Mode

| Token | Color | Hex | Usage |
|---|---|---|---|
| Primary | Bright Mint | `#5FD1C2` | Primary buttons, active states, links, main accents |
| Secondary | Deep Teal | `#3BAFA2` | Secondary actions, supporting accents |
| Tertiary | Dark Teal | `#163D39` | Subtle backgrounds, badges, highlights |
| Background | Deep Charcoal | `#0D1211` | Main page background |
| Surface | Dark Charcoal | `#151B19` | Cards, navbar, panels, modals |
| Text | Soft White | `#EAF3F0` | Headings and primary text |
| Text Muted | Muted Gray | `#9AA9A4` | Descriptions, metadata, secondary text |
| Border | Dark Gray-Teal | `#293531` | Borders, dividers, input outlines |

### Color Usage Guidelines

- **Primary** should be used for the main brand identity and important interactive elements.
- **Secondary** should support primary actions without competing with them.
- **Tertiary** should be used for subtle visual emphasis rather than large areas.
- **Background** is reserved for the main application canvas.
- **Surface** is used for elevated UI elements such as cards, panels, and navigation.
- **Text** is used for primary content and headings.
- **Text Muted** is used for secondary information and supporting content.
- **Border** should remain subtle and should not overpower the content.

### Schedule Card Accent Colors

| Token | Color | Hex | Usage |
|---|---|---|---|
| Accent 1 | Coral Red | `#E85D68` | Schedule card left border (random/user-selected) |
| Accent 2 | Vibrant Orange | `#F07845` | Schedule card left border (random/user-selected) |
| Accent 3 | Mustard Yellow | `#E7C23B` | Schedule card left border (random/user-selected) |
| Accent 4 | Emerald Green | `#4CAF72` | Schedule card left border (random/user-selected) |
| Accent 5 | Cyan Blue | `#35B9C4` | Schedule card left border (random/user-selected) |
| Accent 6 | Royal Blue | `#4D83D1` | Schedule card left border (random/user-selected) |
| Accent 7 | Deep Purple | `#8666D5` | Schedule card left border (random/user-selected) |
| Accent 8 | Hot Pink | `#E7659A` | Schedule card left border (random/user-selected) |

### Color Usage Guidelines

- **Schedule Accents** are applied dynamically (randomly or user-selected) to card borders to provide visual variety without relying on hardcoded category mappings.