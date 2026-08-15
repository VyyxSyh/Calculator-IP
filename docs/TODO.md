# TODO — Nestly (Phase 1: Frontend)

Checklist pengembangan Nestly, dikelompokkan per fitur sesuai PRD.md. Centang item yang sudah selesai.

> Legend: `[ ]` belum dikerjakan · `[x]` selesai · `[~]` sedang dikerjakan

---

## 🏗️ Setup & Foundation
- [ z] Finalisasi tech stack Frontend (framework/library)
- [ ] Setup project structure (folder, routing, base config)
- [ ] Setup styling system (utility framework / CSS architecture)
- [ ] Setup linting & formatting (ESLint/Prettier atau setara)
- [ ] Setup deployment pipeline (GitHub Pages / Vercel / Netlify)
- [ ] Buat struktur data dasar (schema task, schedule, theme) di `localStorage`

## ✅ Task Management
- [ ] UI form tambah tugas (judul, mata kuliah, deadline, status)
- [ ] Simpan tugas baru ke `localStorage`
- [ ] Tampilkan daftar tugas (Task List view)
- [ ] Fitur edit tugas
- [ ] Fitur hapus tugas (dengan konfirmasi)
- [ ] Fitur update status tugas (Not Started / In Progress / Completed)
- [ ] Fitur set & update deadline tugas
- [ ] Validasi input form (judul wajib, deadline valid, dll)

## 📊 Task Progress
- [ ] Komponen progress bar per tugas
- [ ] Fitur update progress manual (slider/input persentase)
- [ ] Sinkronisasi progress ke `localStorage` setiap perubahan
- [ ] Animasi/transisi progress bar (opsional, UX enhancement)

## 🏠 Dashboard
- [ ] Layout halaman utama (Dashboard)
- [ ] Widget total tugas
- [ ] Widget breakdown status (Not Started / In Progress / Completed)
- [ ] Widget progress keseluruhan (agregat semua tugas)
- [ ] Widget deadline terdekat
- [ ] Widget ringkasan aktivitas belajar
- [ ] Responsive layout untuk dashboard widgets

## 🗓️ Schedule
- [ ] UI form tambah jadwal (mata kuliah, hari, waktu, ruangan, dosen)
- [ ] Simpan jadwal ke `localStorage`
- [ ] Tampilan daftar/tabel jadwal
- [ ] Fitur edit jadwal
- [ ] Fitur hapus jadwal
- [ ] Tampilan jadwal per hari/minggu

## ⏰ Deadline Tracking
- [ ] Logika kategorisasi otomatis (Due Today / Due Tomorrow / Upcoming / Overdue)
- [ ] Logika indikator warna urgensi (🟢🟡🟠🔴) berdasarkan tanggal sistem
- [ ] Update otomatis kategori & warna secara real-time
- [ ] Tampilan filter tugas berdasarkan kategori urgensi

## 🍅 Pomodoro Timer
- [ ] UI input total durasi belajar
- [ ] Logika auto-split sesi Work (25m) & Break (5m)
- [ ] Komponen countdown timer
- [ ] Kontrol start / pause / stop timer
- [ ] Notifikasi/sound saat sesi berganti (opsional)
- [ ] Tampilan progress sesi (mis. sesi ke-berapa dari total)

## 🔍 Search, Filter & Sorting
- [ ] Fitur search tugas berdasarkan kata kunci
- [ ] Filter berdasarkan status
- [ ] Filter berdasarkan deadline
- [ ] Filter berdasarkan mata kuliah
- [ ] Filter berdasarkan progress
- [ ] Sorting: deadline terdekat
- [ ] Sorting: progress tertinggi / terendah
- [ ] Sorting: tugas terbaru

## 🎨 Theme
- [ ] Implementasi Light mode
- [ ] Implementasi Dark mode
- [ ] Toggle switch tema
- [ ] Simpan preferensi tema ke `localStorage`
- [ ] Terapkan tema otomatis saat aplikasi dibuka kembali

## 💾 Data Persistence
- [ ] Struktur penyimpanan `localStorage` final (task, progress, deadline, status, schedule, theme, settings)
- [ ] Fungsi read/write helper untuk `localStorage`
- [ ] Handling error/edge case (localStorage penuh, data corrupt, dll)
- [ ] Testing persistence setelah refresh/close browser

## 📱 Responsive & UX Polish
- [ ] Uji tampilan di Mobile
- [ ] Uji tampilan di Tablet
- [ ] Uji tampilan di Desktop
- [ ] Review aksesibilitas kontras warna (light/dark & indikator urgensi)
- [ ] Loading/empty state untuk setiap halaman (Task List kosong, Schedule kosong, dll)

## 🧪 Testing & QA
- [ ] Manual testing seluruh fitur CRUD
- [ ] Testing across browser (Chrome, Firefox, Safari, Edge)
- [ ] Bug fixing round sebelum rilis Phase 1

## 🚀 Release Phase 1
- [ ] Finalisasi README.md (update tech stack setelah fix)
- [ ] Deploy ke static hosting
- [ ] Update Live Demo link di README.md
- [ ] Tag release `v1.0`

---

## 🔮 Future (Phase 2 & 3 — Reference Only)
> Tidak dikerjakan di Phase 1, dicatat untuk konteks roadmap ke depan.

- [ ] Setup Backend API (REST/GraphQL)
- [ ] Implementasi User Authentication
- [ ] Role management
- [ ] Setup Database
- [ ] Migrasi data dari `localStorage` ke server-based
- [ ] Cross-device synchronization
- [ ] Notifications system
- [ ] Advanced analytics