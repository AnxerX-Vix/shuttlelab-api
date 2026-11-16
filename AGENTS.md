# AGENTS.md — ShuttleLab (Tugas Akhir Praktikum PPB 2026)

## 1. Gaya Komunikasi & Eksekusi
- Jawab singkat, padat, dan langsung ke eksekusi kode (gaya caveman). Hindari basa-basi pembuka atau penutup.
- Gunakan bahasa Indonesia yang santai dan lugas saat menjelaskan langkah atau perubahan file.

## 2. Standar Kode & Anti-Slop (Wajib Mudah Dipahami)
- Tulis kode yang lurus, eksplisit, dan mudah dibaca manusia agar mudah dijelaskan saat asistensi dan responsi.
- DILARANG membuat abstraksi berlebihan, wrapper rumit, atau file utilitas yang tidak dibutuhkan.
- DILARANG menulis komentar kode yang menjelaskan hal yang sudah jelas dari nama fungsi atau variabel.
- Gunakan penamaan variabel yang jelas dan konsisten seperti `gears`, `techniques`, `fetchGearDetail`, dan `wishlist`.

## 3. Spesifikasi Wajib Praktikum PPB
- **Backend API (`shuttlelab-api`)**: Node.js, Express.js, dan `@supabase/supabase-js` dengan struktur folder Modul 1 (`config`, `models`, `controllers`, `routes`, `index.js`), wajib mengaktifkan `cors`, dan siap deploy ke Vercel.
- **Frontend PWA (`shuttlelab-pwa`)**: React, Vite, Tailwind CSS, `vite-plugin-pwa`, dan Axios, siap deploy ke Vercel.
- **Struktur 5 Halaman Wajib**:
  1. Halaman List 1: Katalog Gear Badminton (`GET /api/gears`)
  2. Halaman Detail 1: Detail Spesifikasi Gear (`GET /api/gears/:id`)
  3. Halaman List 2: Panduan Teknik & Footwork (`GET /api/techniques`)
  4. Halaman Detail 2: Detail Langkah Teknik (`GET /api/techniques/:id`)
  5. Halaman Profile / About Aplikasi + fitur Wishlist lokal menggunakan `localStorage`
- **Navigasi**: Wajib memakai Bottom Navigation Bar di bagian bawah layar untuk berpindah antar tab utama (`Gear`, `Teknik`, `Profile`).
- **Sumber Data**: Data utama halaman List dan Detail wajib berasal dari REST API buatan sendiri, dilarang memakai array statis hardcoded sebagai sumber data utama.

## 4. Pemanggilan Skills
- Cek folder `.agents/skills/` dan terapkan instruksi yang relevan sebelum mengeksekusi tugas:
  - Gunakan `impeccable` saat merancang UI/UX, tata letak mobile, tipografi, dan palet warna.
  - Gunakan `ponytail` saat menyusun struktur folder dan memisahkan tanggung jawab antar file.
  - Gunakan `anti-slop` untuk meninjau kebersihan dan kesederhanaan kode.