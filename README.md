# Octet — IP Network Toolkit

Kumpulan tools subnetting IPv4 (Subnet Calculator, VLSM/Subnet Splitter,
CIDR Summarization) dalam satu halaman. Dibangun dengan React + Vite +
Tailwind CSS, mengikuti design system glassmorphism (lihat `design.md`
di project asal untuk acuan lengkap).

## Menjalankan

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan (biasanya `http://localhost:5173`).

Build produksi:

```bash
npm run build
npm run preview
```

## Struktur proyek

```
src/
  utils/ipUtils.js         # semua logic bitwise: parsing, subnet math,
                            # alokasi VLSM, agregasi CIDR
  hooks/useCanHover.js      # deteksi device hover-capable (buat popup biner)
  context/ThemeContext.jsx  # provider light/dark mode, persist ke localStorage
  components/
    Sidebar.jsx             # sidebar glass (desktop) + navbar/hamburger/
                             # dropdown dengan efek scroll (mobile/tablet)
    Hamburger.jsx / hamburger.css   # ikon hamburger animasi
    ThemeToggle.jsx          # switch light/dark
    BitVisualizer.jsx        # visual bit network vs host per oktet
    SubnetCalculator.jsx     # tool 1 (+ primitive UI bersama: ToolHeader,
                              # Field, Row, ResultCard w/ popup biner,
                              # inputClass, buttonFocusClass)
    VlsmSplitter.jsx         # tool 2
    CidrSummarization.jsx    # tool 3
  App.jsx                   # ThemeProvider + layout + background blobs
  main.jsx / index.css      # entry point, CSS variable tema, .glass utility
```

## Sistem desain

- **Tema**: light/dark lewat class `.dark` di `<html>`, semua warna
  (`base`, `ink`, `muted`, `surface`, `accent`, dst) di-resolve dari CSS
  variable di `index.css` — jadi satu toggle otomatis ganti seluruh tema
  tanpa perlu prefix `dark:` di setiap elemen.
- **Glass effect**: satu utility class `.glass` (translucent + blur + border
  tipis + shadow lembut) dipakai konsisten di semua card/navbar/dropdown.
- **Radius**: besar di semua elemen (`rounded-2xl`/`rounded-3xl`/`rounded-full`),
  tidak ada sudut tajam.
- **Aksen**: biru/teal (`accent`, `accentSolid`, `accentTint`), konsisten di
  kedua mode dengan kecerahan disesuaikan biar tetap kontras.
- **Tipografi**: Nunito (rounded sans-serif) untuk teks/label, IBM Plex Mono
  untuk semua data teknis (IP, mask, biner).
- **Motion**: framer-motion untuk indikator tab aktif (sidebar desktop),
  buka/tutup dropdown mobile, dan popup biner (masuk lebih pelan, keluar
  lebih cepat).

## Fitur popup biner (desktop only)

Card ringkasan yang nilainya berupa satu alamat IP tunggal (network,
broadcast, subnet mask, wildcard mask) menampilkan popup biner saat
di-hover — hanya di device dengan mouse/trackpad (`useCanHover`), teks
popup tidak bisa diseleksi (`select-none`).

## Catatan penting

- Semua perhitungan subnetting tetap bitwise murni di `src/utils/ipUtils.js`
  — tidak ada nilai yang di-hardcode per kelas/prefix.
- Setiap tool tervalidasi input-nya secara independen per field, pesan error
  tampil langsung di bawah field terkait.
