# IP Network Toolkit

Kumpulan tools subnetting IPv4 (Subnet Calculator, VLSM/Subnet Splitter,
CIDR Summarization) dalam satu halaman. Dibangun dengan React + Vite +
Tailwind CSS.

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
  utils/ipUtils.js        # semua logic bitwise: parsing, subnet math,
                           # alokasi VLSM, agregasi CIDR
  components/
    Sidebar.jsx            # navigasi tab (sidebar desktop / tab bar mobile)
    BitVisualizer.jsx       # visual bit network vs host per oktet
    SubnetCalculator.jsx    # tool 1 (juga menyimpan primitive UI bersama:
                             # ToolHeader, Field, Row, ResultCard, inputClass,
                             # buttonFocusClass)
    VlsmSplitter.jsx        # tool 2
    CidrSummarization.jsx   # tool 3
  App.jsx                  # state tab aktif + layout
  main.jsx / index.css     # entry point & base styles
```

## Catatan penting

- Semua perhitungan subnetting (network/broadcast address, VLSM, CIDR
  summarization) memakai operasi bitwise murni di `src/utils/ipUtils.js`,
  tidak ada nilai yang di-hardcode per kelas/prefix.
- Palet warna & tipografi didefinisikan sebagai token di `tailwind.config.js`
  (warna `paper/panel/ink/muted/line/signal`, font `IBM Plex Sans` untuk
  teks dan `IBM Plex Mono` untuk semua data IP/biner).
- Setiap tool tervalidasi input-nya secara independen per field, pesan error
  tampil langsung di bawah field terkait.
