# IP Network Toolkit

Kumpulan tools jaringan IPv4 (Subnet Calculator, VLSM/Subnet Splitter, CIDR
Summarization, Ping Simulator, Traceroute Simulator) dalam satu halaman.
Dibangun dengan React + Vite + Tailwind CSS.

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
                           # alokasi VLSM, agregasi CIDR, helper dummy data
  components/
    Sidebar.jsx            # navigasi tab (sidebar desktop / tab bar mobile)
    BitVisualizer.jsx       # visual bit network vs host per oktet
    SubnetCalculator.jsx    # tool 1 (juga menyimpan primitive UI bersama:
                             # ToolHeader, Field, Row, inputClass)
    VlsmSplitter.jsx        # tool 2
    CidrSummarization.jsx   # tool 3
    PingSimulator.jsx       # tool 4 (terminal style, simulasi client-side)
    TracerouteSimulator.jsx # tool 5 (terminal style, simulasi client-side)
  App.jsx                  # state tab aktif + layout
  main.jsx / index.css     # entry point & base styles
```

## Catatan penting

- **Ping & Traceroute murni simulasi.** Browser tidak bisa mengirim paket
  ICMP langsung, jadi kedua tool ini menghasilkan IP, hostname, dan waktu
  respons acak (dengan pola yang realistis) — bukan hasil pengukuran
  jaringan sungguhan.
- Semua perhitungan subnetting (network/broadcast address, VLSM, CIDR
  summarization) memakai operasi bitwise murni di `src/utils/ipUtils.js`,
  tidak ada nilai yang di-hardcode per kelas/prefix.
- Palet warna & tipografi didefinisikan sebagai token di `tailwind.config.js`
  (warna `paper/panel/ink/muted/line/signal/term`, font `IBM Plex Sans` untuk
  teks dan `IBM Plex Mono` untuk semua data IP/biner).
