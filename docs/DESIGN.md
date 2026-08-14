# Nestly - Design System

## 1. Design Overview

Nestly menggunakan desain yang sederhana, modern, clean, dan nyaman
digunakan untuk aktivitas belajar dalam jangka waktu yang cukup lama.

Design system dibuat dengan tujuan:

* Memudahkan pengguna memahami informasi dengan cepat.
* Mengurangi visual clutter.
* Membuat dashboard terasa ringan dan terorganisir.
* Memprioritaskan informasi penting seperti tugas, progress, dan
    deadline.
* Menjaga konsistensi tampilan pada seluruh halaman.
* Memberikan pengalaman yang nyaman pada desktop maupun mobile.

Desain Nestly harus terasa seperti productivity application, bukan
sekadar website informasi.

------------------------------------------------------------------------

## 2. Design Principles

### 2.1 Simple

Interface harus sederhana dan tidak menggunakan elemen visual yang tidak
diperlukan.

Setiap halaman harus memiliki hierarki informasi yang jelas.

### 2.2 Clear

Informasi penting seperti deadline, progress, status tugas, dan jadwal
harus mudah ditemukan.

### 2.3 Consistent

Komponen yang memiliki fungsi yang sama harus memiliki tampilan dan
behavior yang konsisten di seluruh website.

Contoh:

* Semua primary button memiliki style yang sama.
* Semua task card menggunakan struktur visual yang konsisten.
* Semua status menggunakan sistem warna yang sama.

### 2.4 Responsive

Interface harus dapat digunakan dengan baik pada:

* Desktop.
* Laptop.
* Tablet.
* Mobile.

Layout dapat berubah menyesuaikan ukuran layar tanpa menghilangkan
informasi penting.

### 2.5 Comfortable

Karena Nestly digunakan untuk aktivitas belajar dan produktivitas,
desain harus nyaman digunakan dalam waktu yang lama.

Hindari:

* Terlalu banyak warna.
* Animasi berlebihan.
* Kontras yang terlalu menyakitkan mata.
* Elemen yang terlalu padat.
* Informasi yang sulit dibaca.

------------------------------------------------------------------------

## 3. Visual Style

### Overall Style

Nestly menggunakan visual style:

* Modern.
* Minimalist.
* Clean.
* Soft.
* Organized.
* Friendly.
* Productivity-focused.

Interface tidak menggunakan desain yang terlalu formal seperti
enterprise dashboard, tetapi juga tidak terlalu playful seperti aplikasi
game.

Tujuannya adalah menciptakan keseimbangan antara profesional dan nyaman
digunakan.

------------------------------------------------------------------------

## 4. Color System

Color system masih dalam tahap perencanaan dan dapat berubah setelah
visual direction ditentukan.

### 4.1 Primary Color

Digunakan untuk:

* Primary button.
* Active navigation.
* Important actions.
* Selected states.
* Accent elements.

Primary color harus memiliki kontras yang cukup dengan background.

### 4.2 Secondary Color

Digunakan untuk:

* Secondary actions.
* Supporting elements.
* Additional highlights.

### 4.3 Background

Background utama sebaiknya menggunakan warna yang lembut dan tidak
terlalu kontras.

Contoh pendekatan:

``` text
Main Background
↓
Soft neutral color

Card Background
↓
Slightly different from main background
```

Tujuannya agar card dan section dapat dibedakan tanpa menggunakan border
atau shadow yang berlebihan.

### 4.4 Semantic Colors

Semantic colors digunakan untuk memberikan informasi mengenai status
atau kondisi tertentu.

#### Success

Digunakan untuk:

* Task completed.
* Successful action.
* Safe deadline.

#### Warning

Digunakan untuk:

* Deadline mulai mendekat.
* Attention required.
* Warning state.

#### Urgent

Digunakan untuk:

* Deadline sangat dekat.
* Task perlu segera diprioritaskan.

#### Danger

Digunakan untuk:

* Overdue task.
* Error.
* Destructive action.

### 4.5 Deadline Colors

Deadline menggunakan sistem warna berdasarkan tingkat urgensi:

``` text
🟢 Green
Safe / deadline masih cukup jauh

🟡 Yellow
Deadline mulai mendekat

🟠 Orange
Deadline sudah dekat

🔴 Red
Deadline sangat mendesak / overdue
```

Warna tidak boleh menjadi satu-satunya cara untuk menyampaikan
informasi.

Gunakan juga text atau icon agar informasi tetap dapat dipahami oleh
pengguna yang memiliki keterbatasan penglihatan warna.

------------------------------------------------------------------------

## 5. Typography

Typography harus mudah dibaca dan memiliki hierarchy yang jelas.

### 5.1 Font

Font utama masih dalam tahap perencanaan.

Karakter font yang diutamakan:

* Modern.
* Clean.
* Readable.
* Cocok untuk dashboard.
* Nyaman dibaca dalam waktu lama.

Font dapat menggunakan satu font family utama dengan beberapa weight.

### 5.2 Typography Hierarchy

Contoh hierarchy:

``` text
Heading 1
Dashboard

Heading 2
Today's Tasks

Heading 3
Project IoT

Body
Complete the documentation before Friday.

Caption
Due in 2 days
```

### 5.3 Font Weight

Contoh penggunaan:

* Regular → body text.
* Medium → supporting information.
* Semibold → labels dan heading.
* Bold → informasi penting.

Hindari penggunaan terlalu banyak font weight dalam satu halaman.

------------------------------------------------------------------------

## 6. Spacing System

Spacing harus menggunakan sistem yang konsisten.

Contoh dasar:

``` text
4px
8px
12px
16px
24px
32px
48px
64px
```

Spacing kecil digunakan untuk elemen yang berdekatan.

Spacing besar digunakan untuk memisahkan section.

Contoh:

``` text
Card
├── Title
│
├── Content
│
└── Action
```

Jarak antar elemen di dalam card harus lebih kecil dibandingkan jarak
antar card.

------------------------------------------------------------------------

## 7. Layout

### 7.1 Desktop Layout

Dashboard desktop dapat menggunakan struktur:

``` text
┌─────────────────────────────────────────────┐
│                  Navbar                     │
├──────────────┬──────────────────────────────┤
│              │                              │
│   Sidebar    │          Main Content        │
│              │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

Sidebar digunakan untuk navigasi utama.

Main content digunakan untuk:

* Dashboard.
* Tasks.
* Schedule.
* Pomodoro.
* Settings.

### 7.2 Mobile Layout

Pada mobile, sidebar dapat berubah menjadi:

* Bottom navigation.
* Collapsible navigation.
* Hamburger menu.

Contoh:

``` text
┌─────────────────────┐
│       Navbar        │
├─────────────────────┤
│                     │
│    Main Content     │
│                     │
│                     │
├─────────────────────┤
│ Home Tasks Schedule │
└─────────────────────┘
```

Layout mobile harus memprioritaskan informasi dan action yang paling
sering digunakan.

------------------------------------------------------------------------

## 8. Navigation

Navigation utama dapat terdiri dari:

``` text
Dashboard
Tasks
Schedule
Pomodoro
Settings
```

Navigation harus menunjukkan halaman yang sedang aktif.

Contoh:

``` text
Dashboard    ← Active
Tasks
Schedule
Pomodoro
Settings
```

Active state dapat menggunakan:

* Background highlight.
* Primary color.
* Icon.
* Font weight.

------------------------------------------------------------------------

## 9. Dashboard Design

Dashboard merupakan halaman utama sehingga informasi harus disusun
berdasarkan tingkat kepentingan.

Contoh struktur:

``` text
┌─────────────────────────────────────────────┐
│ Greeting / Overview                         │
├─────────────────────────────────────────────┤
│                                             │
│  Total Tasks   Completed   In Progress      │
│                                             │
├──────────────────────┬──────────────────────┤
│                      │                      │
│  Today's Tasks       │  Upcoming Deadline  │
│                      │                      │
├──────────────────────┴──────────────────────┤
│                                             │
│          Overall Progress                   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│          Today's Schedule                   │
│                                             │
└─────────────────────────────────────────────┘
```

Dashboard tidak harus menampilkan seluruh informasi sekaligus.

Informasi yang kurang penting dapat dipindahkan ke halaman khusus.

------------------------------------------------------------------------

## 10. Task Card

Task card digunakan untuk menampilkan informasi tugas.

Contoh:

``` text
┌──────────────────────────────────┐
│ Project IoT              🟠      │
│                                  │
│ Progress                         │
│ ██████████████░░░░ 70%           │
│                                  │
│ 📅 Due in 2 days                 │
│ 🏫 IoT                           │
│                                  │
│ [Edit]                 [•••]     │
└──────────────────────────────────┘
```

Task card dapat menampilkan:

* Task title.
* Subject/category.
* Progress.
* Deadline.
* Status.
* Urgency indicator.
* Action menu.

Card harus tetap mudah dipindai tanpa membuat pengguna membaca terlalu
banyak informasi.

------------------------------------------------------------------------

## 11. Buttons

Button dibagi menjadi beberapa jenis.

### Primary Button

Digunakan untuk action utama.

Contoh:

``` text
+ Add Task
Start Timer
Save Changes
```

### Secondary Button

Digunakan untuk action tambahan.

Contoh:

``` text
Cancel
View Details
```

### Destructive Button

Digunakan untuk action yang dapat menghapus atau merusak data.

Contoh:

``` text
Delete Task
```

Destructive action sebaiknya memiliki confirmation apabila action
tersebut tidak dapat dibatalkan.

------------------------------------------------------------------------

## 12. Forms

Form digunakan untuk:

* Add Task.
* Edit Task.
* Add Schedule.
* Settings.

Form harus memiliki:

* Label.
* Input.
* Placeholder jika diperlukan.
* Validation message.
* Clear action.

Contoh:

``` text
Task Title
[________________________]

Subject
[________________________]

Deadline
[________________________]

Progress
[____%]

Status
[ In Progress ▼ ]

[Cancel] [Save Task]
```

Validation harus memberikan feedback yang jelas apabila input tidak
valid.

------------------------------------------------------------------------

## 13. Modal

Modal dapat digunakan untuk action yang membutuhkan perhatian pengguna
tanpa meninggalkan halaman.

Contoh:

* Add Task.
* Edit Task.
* Delete Confirmation.
* Task Details.

Modal tidak boleh digunakan terlalu sering.

Jika sebuah action dapat dilakukan langsung pada halaman, modal
sebaiknya tidak digunakan.

------------------------------------------------------------------------

## 14. Pomodoro Design

Pomodoro memiliki dua mode:

### Scheduled Pomodoro

User menentukan total waktu belajar.

Contoh:

``` text
┌─────────────────────────┐
│ Scheduled Pomodoro      │
│                         │
│ Study Duration          │
│ [ 2 Hours ▼ ]           │
│                         │
│       25:00             │
│                         │
│     [ Start ]           │
└─────────────────────────┘
```

Sistem kemudian menjalankan Work Session dan Break Session secara
otomatis.

### Flexible Pomodoro

User langsung memulai sesi belajar tanpa menentukan total durasi.

Contoh:

``` text
┌─────────────────────────┐
│ Flexible Pomodoro       │
│                         │
│       25:00             │
│       WORK              │
│                         │
│     [ Start ]           │
└─────────────────────────┘
```

Setelah Work Session selesai:

``` text
🔔 Work Session Complete

Time for a break.
```

Setelah Break Session selesai:

``` text
🔔 Break Complete

Ready for another work session?
```

Alarm atau notification digunakan agar pengguna mengetahui pergantian
session.

------------------------------------------------------------------------

## 15. Notification & Feedback

Interface harus memberikan feedback ketika pengguna melakukan action.

Contoh:

### Success

``` text
✓ Task added successfully
```

### Update

``` text
✓ Task updated
```

### Delete

``` text
Task deleted
```

### Error

``` text
⚠ Something went wrong
```

Feedback dapat menggunakan:

* Toast.
* Inline message.
* Modal.
* Browser notification.
* Sound notification.

Feedback harus singkat dan tidak mengganggu aktivitas pengguna.

------------------------------------------------------------------------

## 16. Icons

Icons digunakan sebagai visual support, bukan pengganti text pada
informasi penting.

Contoh:

``` text
🏠 Dashboard
✓ Completed
📅 Deadline
⏱ Pomodoro
⚙ Settings
```

Icon yang digunakan dalam implementation sebaiknya berasal dari satu
icon library atau memiliki visual style yang konsisten.

------------------------------------------------------------------------

## 17. Cards & Containers

Cards digunakan untuk mengelompokkan informasi yang memiliki hubungan.

Card dapat digunakan untuk:

* Task.
* Schedule.
* Statistics.
* Pomodoro.
* Progress.

Cards sebaiknya:

* Memiliki spacing yang cukup.
* Tidak menggunakan shadow berlebihan.
* Memiliki hierarchy yang jelas.
* Memiliki border radius yang konsisten.

------------------------------------------------------------------------

## 18. Border Radius & Shadows

Border radius dan shadow harus digunakan secara konsisten.

Contoh:

``` text
Small radius
→ Buttons
→ Inputs

Medium radius
→ Cards
→ Containers

Large radius
→ Modal
→ Major UI sections
```

Shadow digunakan secara ringan untuk memberikan hierarchy dan
separation.

Hindari penggunaan shadow yang terlalu kuat.

------------------------------------------------------------------------

## 19. Progress Visualization

Progress dapat ditampilkan menggunakan:

* Progress bar.
* Percentage.
* Circular progress.
* Statistics.

Contoh:

``` text
Project IoT

██████████████░░░░░░ 70%
```

Progress visualization harus tetap menyertakan angka atau text agar
informasi dapat dipahami dengan jelas.

------------------------------------------------------------------------

## 20. Empty States

Ketika belum terdapat data, website harus memberikan empty state.

Contoh:

``` text
No tasks yet.

Start by adding your first task.

[ + Add Task ]
```

Empty state sebaiknya:

* Menjelaskan kondisi.
* Memberikan konteks.
* Menawarkan action yang relevan.

------------------------------------------------------------------------

## 21. Loading States

Jika terdapat proses yang membutuhkan waktu, interface harus menyediakan
loading state.

Contoh:

``` text
Loading tasks...
```

Pada versi Frontend-only, loading state dapat digunakan sebagai bagian
dari UI simulation atau untuk future API integration.

------------------------------------------------------------------------

## 22. Error States

Error state harus memberikan informasi yang jelas mengenai masalah yang
terjadi.

Contoh:

``` text
Something went wrong.

Please try again.

[Retry]
```

Pesan error sebaiknya tidak terlalu teknis untuk pengguna umum.

------------------------------------------------------------------------

## 23. Responsive Behavior

### Desktop

Prioritas:

* Multi-column layout.
* Sidebar navigation.
* Dashboard overview.
* Multiple cards dalam satu row.

### Tablet

Prioritas:

* Mengurangi jumlah column.
* Menyesuaikan ukuran card.
* Navigation tetap mudah digunakan.

### Mobile

Prioritas:

* Single-column layout.
* Bottom navigation atau collapsible navigation.
* Touch-friendly buttons.
* Informasi utama tetap terlihat.
* Horizontal scrolling hanya jika benar-benar diperlukan.

------------------------------------------------------------------------

## 24. Accessibility

Design harus mempertimbangkan accessibility.

Prinsip dasar:

* Text harus memiliki contrast yang cukup.
* Button dan interactive element harus mudah ditekan.
* Informasi tidak hanya dibedakan berdasarkan warna.
* Form memiliki label yang jelas.
* Icon penting memiliki accessible label.
* Keyboard navigation dipertimbangkan.
* Font size tetap mudah dibaca.

Contoh deadline:

Jangan hanya:

``` text
🔴
```

Gunakan:

``` text
🔴 Overdue
```

Dengan demikian informasi tetap dapat dipahami tanpa bergantung pada
warna.

------------------------------------------------------------------------

## 25. Animation & Motion

Animation digunakan untuk meningkatkan feedback dan pengalaman pengguna,
bukan sekadar dekorasi.

Contoh:

* Button hover.
* Card hover.
* Modal transition.
* Toast appearance.
* Progress update.
* Page transition.

Animation harus:

* Singkat.
* Smooth.
* Tidak berlebihan.
* Tidak mengganggu workflow.

------------------------------------------------------------------------

## 26. Dark Mode

Dark mode harus memiliki design system sendiri, bukan hanya membalik
warna light mode.

Perhatian khusus:

* Background.
* Card.
* Text.
* Border.
* Input.
* Semantic colors.
* Progress indicators.

Contrast tetap harus dijaga agar informasi mudah dibaca.

------------------------------------------------------------------------

## 27. Design Consistency

Semua halaman harus mengikuti design system yang sama.

Konsistensi mencakup:

* Color.
* Typography.
* Spacing.
* Button.
* Input.
* Card.
* Icon.
* Border radius.
* Shadow.
* Animation.

Komponen yang sudah dibuat sebaiknya digunakan kembali daripada membuat
variasi baru tanpa alasan.

------------------------------------------------------------------------

## 28. Design Status

Design system masih dalam tahap development.

Bagian yang masih dapat berubah:

* Color palette.
* Font family.
* Typography scale.
* Layout detail.
* Icon library.
* Border radius.
* Shadow.
* Animation.
* Component design.

Final design akan ditentukan setelah visual direction dan technology
stack project ditetapkan.
