# PRD: Octet

## 1. Problem Statement
Kalkulator IP yang beredar saat ini kebanyakan hanya menyediakan fitur dasar (konversi IP ke subnet mask, network address, broadcast address) dalam satu form sederhana. Untuk kebutuhan yang lebih kompleks — seperti membagi satu network jadi beberapa subnet (VLSM) atau menggabungkan beberapa network jadi satu CIDR (summarization) — pengguna harus berpindah ke banyak tools berbeda yang sering kali tampilannya tidak konsisten, sulit dipahami, atau justru terlalu teknis tanpa konteks visual yang membantu.

Dibutuhkan satu tools terpadu yang mengumpulkan kebutuhan perhitungan dan simulasi jaringan dasar dalam satu tempat, dengan tampilan yang simple dan mudah dipahami baik oleh pemula maupun yang sudah terbiasa dengan jaringan.

## 2. Goals & Objectives
- Menyediakan satu platform terpadu untuk perhitungan subnetting IPv4 (basic, VLSM, dan summarization) tanpa perlu berpindah tools.
- Membantu pengguna memvisualisasikan konsep jaringan (bit network vs bit host) secara lebih intuitif, tidak hanya angka mentah.
- Memberikan hasil perhitungan yang akurat secara matematis dan bisa diandalkan untuk keperluan belajar maupun kerja praktis (network engineer, mahasiswa, IT support).
- Menghadirkan pengalaman yang cepat dan ringan — tanpa perlu instalasi, langsung bisa dipakai dari browser.

## 3. Target Users
- **Mahasiswa/pelajar IT & jaringan komputer** — butuh alat bantu belajar subnetting dan konsep dasar jaringan dengan visualisasi yang jelas.
- **Network engineer & IT support** — butuh tools cepat untuk perhitungan subnetting saat konfigurasi jaringan sehari-hari.
- **Pemula yang belajar mandiri (self-taught)** — butuh tools yang tidak mengintimidasi, dengan tampilan simple dan penjelasan hasil yang mudah dibaca.

## 4. Functional Requirements

### 4.1 Subnet Calculator
- Pengguna dapat memasukkan IP address dan prefix CIDR (atau subnet mask).
- Sistem menghitung dan menampilkan: network address, broadcast address, subnet mask, wildcard mask, rentang IP host (first–last), jumlah host valid, kelas IP, dan status private/public.
- Sistem menampilkan representasi biner per oktet dengan pembeda visual antara bit network dan bit host.
- Sistem memvalidasi input dan menampilkan pesan error jika format IP atau prefix tidak valid.

### 4.2 VLSM / Subnet Splitter
- Pengguna dapat memasukkan satu network address beserta prefix awal.
- Pengguna dapat memilih mode pembagian: jumlah subnet yang diinginkan, atau kebutuhan jumlah host per subnet (VLSM).
- Sistem menghasilkan tabel berisi seluruh subnet hasil pembagian (network address, broadcast, rentang host, jumlah host per subnet).
- Sistem menampilkan pesan error jika kebutuhan host/subnet tidak muat dalam network yang tersedia.

### 4.3 CIDR Summarization
- Pengguna dapat memasukkan beberapa network address/prefix sekaligus (multi-input).
- Sistem menghitung dan menampilkan hasil CIDR gabungan (summary/aggregate route) yang mencakup seluruh network yang dimasukkan.

### 4.4 Navigasi
- Pengguna dapat berpindah antar tools (Subnet Calculator, VLSM, CIDR Summarization) tanpa reload halaman.
- **Desktop**: navigasi berupa sidebar dengan transisi antar menu yang smooth.
- **Tablet & Mobile**: navigasi berubah menjadi navbar horizontal di bagian atas, dengan menu-menu dikumpulkan dalam dropdown yang dibuka lewat hamburger menu icon di sisi kanan navbar.
- Navbar pada tablet & mobile bersifat transparan saat halaman berada di posisi paling atas, dan mendapatkan background blur saat halaman di-scroll.

### 4.5 Visualisasi Biner Interaktif (Desktop)
- Pada tampilan desktop, saat pointer meng-hover salah satu card hasil ringkasan (network address, broadcast, subnet mask, dll), sistem menampilkan popup berisi representasi biner dari nilai tersebut.
- Konten popup biner tidak dapat diseleksi/disalin (non-copyable), untuk mendorong pemahaman konsep dibanding menyalin langsung.
- Fitur ini tidak diterapkan pada mobile/tablet karena interaksi hover tidak relevan pada touch device.

## 5. Non-Functional Requirements
- **Akurasi**: seluruh logika perhitungan subnetting menggunakan operasi bitwise, bukan nilai hardcode, dan harus akurat 100% secara matematis.
- **Performa**: seluruh perhitungan berjalan di sisi client (browser), tanpa backend, sehingga hasil muncul instan.
- **Responsiveness**: tampilan dapat digunakan dengan baik di perangkat mobile, tablet, dan desktop.
- **Reliability**: validasi input mencegah error/crash akibat input yang tidak valid, dengan pesan error yang jelas.
- **Maintainability**: kode terstruktur per komponen (tiap tools jadi komponen React terpisah) agar mudah dikembangkan lebih lanjut.
- **Aksesibilitas dasar**: kontras warna cukup untuk keterbacaan, elemen interaktif dapat diakses lewat keyboard (focus state terlihat).
- **No data persistence**: tidak ada data pengguna yang disimpan atau dikirim ke server manapun; seluruh proses terjadi lokal di browser.
- **Konsistensi visual**: seluruh tampilan mengikuti design system terpadu (glassmorphism dengan sudut rounded, dukungan light/dark mode, aksen warna biru/teal) sesuai yang didokumentasikan di `design.md`.

## 6. Product Scope

### In Scope
- Kalkulator subnetting IPv4 (basic, VLSM, CIDR summarization).
- Single-page web app tanpa autentikasi/login.

### Out of Scope (untuk versi ini)
- Dukungan IPv6.
- Ping/traceroute (simulasi maupun request jaringan sungguhan).
- Riwayat perhitungan (history) atau penyimpanan data pengguna.
- Fitur akun pengguna, login, atau kolaborasi multi-user.
- Ekspor hasil (PDF/CSV) — dapat dipertimbangkan di iterasi berikutnya.

## 7. Features & Requirements Summary

| Fitur | Deskripsi Singkat | Prioritas |
|---|---|---|
| Subnet Calculator | Hitung network, broadcast, mask, host range dari 1 IP + CIDR | Must Have |
| VLSM / Subnet Splitter | Bagi 1 network jadi beberapa subnet sesuai kebutuhan | Must Have |
| CIDR Summarization | Gabungkan beberapa network jadi 1 CIDR agregat | Should Have |
| Validasi Input | Deteksi & tampilkan error untuk input tidak valid di semua tools | Must Have |
| Navigasi Adaptif | Sidebar (desktop) / navbar + dropdown hamburger (mobile/tablet) | Must Have |
| Popup Biner (Hover) | Tampilkan representasi biner saat hover card ringkasan (desktop) | Should Have |
| Light/Dark Mode | Toggle mode warna dengan gaya glassmorphism | Must Have |
| Responsive Layout | Tampilan menyesuaikan mobile & desktop | Must Have |

## 8. Design System

- **Tech stack tampilan**: React + Tailwind CSS.
- **Gaya visual**: Glassmorphism yang lembut (frosted glass effect) dikombinasikan dengan sudut membulat (rounded corners) di seluruh elemen — kesan modern, ringan, dan friendly, bukan dashboard teknis yang kaku.
- **Mode warna**: Mendukung toggle Light mode & Dark mode.
- **Tipografi**:
  - Font monospace untuk seluruh data teknis (alamat IP, subnet mask, representasi biner).
  - Font sans-serif (rounded) untuk label, judul, dan teks penjelasan.
- **Warna**:
  - Warna aksen utama: biru/teal, konsisten di light mode maupun dark mode.
  - Latar & permukaan card menggunakan efek glass (semi-transparan + blur), bukan warna solid datar.
- **Komponen UI utama**:
  - Sidebar navigasi (desktop) yang berubah jadi navbar + dropdown hamburger menu (tablet/mobile).
  - Form input dengan validasi inline (pesan error di bawah field terkait).
  - Tabel hasil untuk VLSM.
  - Card/grid hasil untuk Subnet Calculator, dengan popup biner saat hover (khusus desktop).
- **Interaksi & motion**: transisi smooth dan halus pada perpindahan menu, buka/tutup dropdown, serta perubahan navbar saat scroll. Popup biner muncul dengan transisi masuk halus dan hilang dengan transisi lebih cepat saat pointer menjauh. Animasi dihindari dari kesan bouncy/berlebihan.

> Detail lengkap warna, radius, efek glass, dan pedoman motion didokumentasikan terpisah di `design.md` sebagai acuan implementasi.