# Design System — IP Network Toolkit (OCTET)

Dokumen ini jadi acuan visual untuk seluruh pengembangan tampilan project, supaya konsisten di semua komponen dan halaman.

## 1. Konsep Visual

**Glassmorphism yang lembut (soft glassmorphism).** Elemen-elemen utama (card, navbar, dropdown, popup) menggunakan efek kaca buram (frosted glass) — background semi-transparan dengan blur — dikombinasikan dengan sudut yang membulat (rounded corners) supaya terasa ramah dan tidak kaku, bukan glassmorphism yang tajam/futuristik ala sci-fi.

Kesan yang ingin dicapai: **modern, ringan, dan nyaman dipakai lama**, bukan dashboard teknis yang dingin dan penuh garis tegas.

## 2. Mode Warna

Website mendukung **toggle light mode & dark mode**, dengan switch yang bisa diakses dari navbar.

### Light Mode
- Background dasar: putih kebiruan sangat terang (bukan putih polos, agar glass effect terlihat)
- Permukaan glass (card, navbar): putih dengan opacity ~60-70% + blur
- Border tipis semi-transparan untuk mempertegas tepi elemen glass
- Teks utama: abu-abu gelap (bukan hitam pekat)
- Teks sekunder: abu-abu medium

### Dark Mode
- Background dasar: biru gelap keabu-abuan (navy charcoal), bukan hitam pekat
- Permukaan glass (card, navbar): warna gelap dengan opacity ~50-60% + blur
- Border tipis semi-transparan (lebih terang dari background) untuk mempertegas tepi
- Teks utama: putih keabu-abuan lembut
- Teks sekunder: abu-abu terang

## 3. Warna Aksen

Warna aksen utama: **biru/teal**, mencerminkan tema networking/tech secara klasik tanpa terkesan generik.

- Aksen primer: biru cerah dengan sedikit campuran teal — dipakai untuk tombol utama, tab aktif, highlight bit network, link, dan elemen interaktif penting
- Aksen sekunder (opsional): teal lebih muda/soft — dipakai untuk elemen pendukung (badge, ikon, hover state ringan)
- Warna aksen ini **konsisten dipakai di light mode maupun dark mode**, hanya disesuaikan tingkat kecerahannya agar tetap kontras di masing-masing mode

## 4. Tipografi

- Font sans-serif untuk judul, label, dan teks penjelasan — pilih yang modern dan mudah dibaca (rounded sans-serif lebih disukai untuk memperkuat kesan "soft & friendly")
- Font monospace untuk seluruh data teknis: alamat IP, subnet mask, representasi biner, hasil perhitungan numerik
- Hierarki ukuran jelas: judul besar dan tebal, label kecil dengan warna teks sekunder, nilai hasil perhitungan lebih besar dan tegas

## 5. Bentuk & Radius

- Semua elemen container (card, navbar, dropdown, popup, tombol) menggunakan **border radius besar** (rounded-xl ke atas), tidak ada sudut tajam sama sekali di seluruh UI
- Tombol menggunakan bentuk pill atau rounded besar
- Input field juga rounded, konsisten dengan card di sekitarnya

## 6. Efek Glass — Detail Teknis

- Kombinasi: `background` semi-transparan + `backdrop-filter: blur()` + `border` tipis semi-transparan + `box-shadow` lembut (soft shadow, tidak tajam)
- Ketebalan blur disesuaikan agar teks tetap terbaca jelas di atasnya (jangan terlalu blur sampai kontras hilang)
- Efek glass dipakai di: card hasil kalkulasi, navbar/sidebar, dropdown menu (mobile), popup hover biner

## 7. Navigasi

### Desktop
- Sidebar di sisi kiri, menggunakan efek glass, dengan indikator menu aktif yang jelas (highlight dengan warna aksen)
- Transisi antar menu di sidebar menggunakan animasi yang smooth (transisi warna, posisi indikator, dan konten halaman)

### Tablet & Mobile
- Sidebar berubah jadi navbar horizontal di bagian atas
- Menu-menu dipindah ke dalam dropdown yang dibuka lewat hamburger icon di kanan navbar
- Navbar bersifat **transparan saat berada di posisi paling atas halaman**, lalu saat halaman di-scroll, navbar mendapatkan background dengan opacity sekitar 70% dan efek blur (kesan navbar "muncul" secara halus, bukan tiba-tiba)

## 8. Motion & Animasi

- Semua transisi (perpindahan menu, hover, buka/tutup dropdown, transisi navbar saat scroll) menggunakan animasi yang **smooth dan halus**, dengan durasi singkat (tidak lambat, tidak juga instan/kaku)
- Popup biner saat hover pada card ringkasan: muncul dengan transisi cepat, dan saat kursor menjauh (mouse leave), popup hilang dengan transisi yang **lebih cepat** dari saat muncul — bukan fade out lambat
- Hindari animasi yang berlebihan (bouncy/elastic) — gerakan tetap terasa halus dan profesional, bukan playful berlebihan

## 9. Prinsip Umum

- Konsistensi lebih penting daripada variasi — satu jenis efek glass, satu skema radius, satu palet aksen dipakai berulang di seluruh komponen
- Kontras teks terhadap background harus tetap terjaga di kedua mode (light & dark), meskipun menggunakan efek transparan
- Style tetap ringan secara visual: hindari terlalu banyak layer glass bertumpuk yang membuat halaman terasa berat/ramai