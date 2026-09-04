<div align="center">

# 🌐 IP Network Toolkit

**Kalkulator subnetting IPv4 yang lebih dari sekadar kalkulator biasa.**

Hitung subnet, bagi network dengan VLSM, dan gabungkan CIDR — semua dalam satu tempat, langsung dari browser.

<br/>

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=blue)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

<br/>

[**🚀 Coba Demo**](https://calculator-ipv4.vercel.app/) · [Fitur](#-fitur) · [Tech Stack](#️-tech-stack) · [Instalasi](#-menjalankan-secara-lokal)

</div>

---

## 💡 Kenapa Toolkit Ini?

Kebanyakan kalkulator IP di luar sana cuma bisa satu hal: masukin IP, keluar subnet mask. Selesai. Begitu kamu butuh membagi satu network jadi beberapa subnet, atau menggabungkan beberapa network jadi satu rute, kamu harus cari tools lain lagi — dengan tampilan yang beda-beda dan kadang bikin bingung.

**IP Network Toolkit** menyatukan tiga kebutuhan itu dalam satu antarmuka yang simple dan enak dipakai. Cocok buat mahasiswa yang lagi belajar subnetting, network engineer yang butuh hitungan cepat di tengah kerjaan, atau siapa pun yang penasaran gimana IP address sebenarnya bekerja di balik layar.

## 🧰 Fitur

<table>
<tr>
<td width="33%" valign="top">

### 📍 Subnet Calculator
Masukkan satu IP address dan prefix CIDR, dapatkan semuanya sekaligus:
- Network & broadcast address
- Subnet mask & wildcard mask
- Rentang IP host yang valid
- Jumlah host, kelas IP, status private/public
- Visualisasi biner per oktet

</td>
<td width="33%" valign="top">

### 🔀 VLSM Splitter
Punya satu network tapi butuh dibagi jadi beberapa subnet dengan kebutuhan host yang beda-beda?
- Pembagian otomatis berbasis VLSM
- Tabel hasil yang rapi dan mudah dibaca
- Validasi jika kebutuhan tidak muat

</td>
<td width="33%" valign="top">

### 🧩 CIDR Summarization
Punya beberapa network terpisah dan ingin tahu satu CIDR gabungan yang mencakupnya?
- Input banyak network sekaligus
- Hasil rute agregat otomatis
- Cocok untuk perencanaan routing

</td>
</tr>
</table>

## 🖥️ Tech Stack

| Layer | Teknologi |
|---|---|
| ⚛️ Framework | React |
| 🎨 Styling | Tailwind CSS |
| ☁️ Hosting | Vercel |
| 🧮 Logika perhitungan | Bitwise operation (native JavaScript) |

> Semua perhitungan berjalan **100% di browser** — tidak ada data yang dikirim atau disimpan di server mana pun.

## 🚀 Menjalankan Secara Lokal

```bash
# 1. Clone repo ini
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka `http://localhost:5173` (atau port yang tertera di terminal) di browser kamu. Selesai — tidak perlu setup backend atau database apa pun.

## 📐 Cara Kerja Singkat

Semua logika perhitungan — network address, broadcast, subnetting, VLSM, hingga CIDR summarization — dihitung dengan **operasi bitwise**, bukan tabel hardcode. Jadi hasilnya akurat untuk kombinasi IP dan prefix berapa pun, dari `/1` sampai `/32`.

```
192.168.1.10/24
        │
        ▼
┌───────────────────────────────────────┐
│ 11000000.10101000.00000001.00001010    │
│ └──────── network ────────┘ └ host ┘   │
└───────────────────────────────────────┘
        │
        ▼
Network   : 192.168.1.0
Broadcast : 192.168.1.255
Host valid: 192.168.1.1 – 192.168.1.254
```

## 🗺️ Rencana ke Depan

- [ ] Dukungan IPv6
- [ ] Ekspor hasil perhitungan (PDF/CSV)
- [ ] Riwayat perhitungan
- [ ] Dark mode

## 🤝 Kontribusi

Ide, laporan bug, atau pull request selalu terbuka. Kalau kamu punya masukan fitur, silakan buka issue baru di repo ini.

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT. Bebas digunakan untuk keperluan belajar maupun pengembangan lebih lanjut.

---

<div align="center">

Dibuat untuk siapa pun yang pernah bingung menghitung subnet manual di kertas 📝

⭐ Kalau toolkit ini membantu, jangan lupa kasih star di repo ini!

</div>