# PROGRESS.md — Nestly Development Log

> File ini dipakai sebagai catatan "handoff" antar sesi kerja (termasuk kalau pindah akun Claude karena limit). Update bagian di bawah setiap sesi kerja selesai/mau berhenti, lalu lampirkan file ini di sesi berikutnya bareng PRD.md, PROJECT.md, README.md, dan TODO.md.

---

## 🕒 Sesi Terakhir
**Tanggal:** (isi tanggal sesi ini)
**Akun Claude yang dipakai:** (misal: Akun A / Akun B — biar bisa dilacak kalau ada gaya beda dikit)

---

## ✅ Sudah Selesai (Checklist yang sudah dicentang di TODO.md)
- (contoh) Setup project Laravel + Livewire + Tailwind di `laragon/www/nestly`
- (contoh) Migration & model `Task` sudah jalan, tabel muncul di HeidiSQL

## ~ Sedang Dikerjakan (belum selesai total)
- (contoh) Livewire component form tambah tugas — UI sudah ada, validasi belum

## 🧠 Keputusan Teknis Penting
> Catat keputusan yang mungkin gak eksplisit ada di PRD/PROJECT, biar sesi berikutnya konsisten.
- (contoh) Nama tabel keuangan pakai `finance_records`, bukan `finances`
- (contoh) Progress task disimpan sebagai integer 0–100, bukan enum

## 🐛 Kendala / Belum Terselesaikan
- (contoh) Livewire real-time search masih lag pas data banyak, belum sempat dioptimasi

## ➡️ Next Step (harus dikerjakan di sesi berikutnya)
1. (contoh) Lanjutkan validasi form Task (judul wajib, deadline tidak boleh masa lalu)
2. (contoh) Mulai kerjain Schedule CRUD sesuai TODO.md section "🗓️ Schedule"

## 📁 Referensi Cepat
- Lokasi project: `laragon/www/nestly`
- Section TODO.md yang sedang dikerjakan: (misal: "✅ Task Management")