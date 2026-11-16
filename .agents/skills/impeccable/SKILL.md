---
name: impeccable
description: "Panduan dan prinsip desain UI/UX mobile-first kelas dunia: tata letak mobile, tipografi, palet warna, hierarki visual, micro-interactions, aksesibilitas, dan penyusunan DESIGN.md tanpa slop."
---

# Impeccable (UI/UX Design Craft)

Prinsip desain UI/UX tingkat tinggi untuk frontend web & mobile: berkarakter kuat, fungsional, presisi, dan bebas dari tampilan AI generik ("AI slop").

## Prinsip Utama

1. **Desain dengan Sudut Pandang (Strong POV)**
   - Setiap aplikasi memiliki jiwa, tema, dan tujuan spesifik. Hindari tampilan generik template AI (seperti card putih membosankan dengan rounded standar dan shadow ungu acak).
   - Selaraskan tema visual dengan domain aplikasi (contoh: tema lapangan badminton modern menggunakan hijau court yang kaya, kontras slate tajam, dan aksen garis putih/lime net).

2. **Mobile-First & Sentuhan Jari (Touch-First ergonomics)**
   - Prioritaskan viewport mobile (360px - 430px).
   - Target sentuhan minimal 44x44px untuk elemen interaktif (tombol, ikon navigasi, input).
   - Elemen penting dan navigasi primer diletakkan dalam zona jangkauan jempol (Thumb Zone), terutama Bottom Navigation Bar.
   - Hindari overflow horizontal: pastikan teks, tabel, dan card responsif serta wrap dengan benar.

3. **Hierarki Visual & Spacing (White Space & Rhythm)**
   - Gunakan skala spasi kelipatan 4px atau 8px (4px, 8px, 12px, 16px, 24px, 32px).
   - Kontras ukuran font dan ketebalan bobot (font-weight) harus tegas membedakan judul, subjudul, body, dan caption.
   - Kelompokkan informasi yang saling berkaitan (prinsip Gestalt proximity) dalam card atau section berbatas tegas.

4. **Sistem Warna & Kontras**
   - Batasi palet primer: 1 warna dominan (misal: Emerald Court Green), 1 warna permukaan/background (light clean surface), 1 warna teks kontras tinggi (dark slate), dan 1 warna aksen fungsional (amber/lime untuk badge/status).
   - Rasio kontras teks terhadap latar belakang minimal 4.5:1 (WCAG AA).
   - Jangan gunakan warna hanya untuk hiasan; warna harus mengomunikasikan fungsi, kategori, atau status.

5. **Komponen & State Lengkap**
   - Setiap elemen interaktif wajib memiliki state visual yang jelas:
     - `Default`: bersih dan mengundang interaksi.
     - `Active / Focus`: indikator fokus yang terlihat jelas.
     - `Loading / Skeleton`: transisi halus saat menunggu data REST API.
     - `Empty State`: pesan ramah dan tindakan pemulihan saat data kosong.
     - `Error State`: pesan kesalahan informatif dan tombol retry.

6. **Tipografi Bersih & Mudah Dibaca**
   - Gunakan font modern sans-serif (misal: Inter, Plus Jakarta Sans, atau sistem UI font native).
   - `line-height` ideal: 1.2–1.3 untuk heading, 1.5–1.6 untuk body text.
   - Panjang baris teks mobile maksimal 45–65 karakter agar mata tidak lelah.

7. **Dokumentasi Sistem Desain (DESIGN.md)**
   - Sebelum atau saat mendesain UI, tuangkan sistem token, skala warna, tipografi, struktur komponen, dan layout ke dalam `DESIGN.md`.
