# DESIGN.md — Sistem Desain Mobile-First ShuttleLab

Tema: **Modern Badminton Court Aesthetic**  
Prinsip Desain: Mengacu pada standar skill `impeccable` (fungsional, presisi, berkarakter kuat, mobile-first, bebas slop visual).

---

## 1. Konsep & Karakter Visual (Design POV)

ShuttleLab mengusung estetika arena badminton modern:
- **Court Green**: Mengadopsi warna karpet lapangan turnamen BWF (hijau zamrud matang yang segar dan fokus).
- **Clean White Court Lines**: Garis batas court putih bersih diwujudkan dalam pembatas card yang rapi dan kontras tinggi.
- **Deep Slate Contrast**: Slate gelap pekat untuk teks dan header agar ketajaman membaca di layar mobile tetap prima.
- **Shuttlecock Volt / Amber Accent**: Aksen kuning volt/lime untuk badge interaktif, status kesulitan, dan indikator aktif.

---

## 2. Palet Warna (Color Tokens)

Sistem warna dioptimalkan untuk tema terang bersih (Light Surface) dengan rasio kontras WCAG AA (minimal 4.5:1 untuk teks biasa, 3:1 untuk elemen UI grafis).

```css
/* Color Palette Tokens */
:root {
  /* Surface & Background */
  --bg-app: #F8FAFC;          /* slate-50: Latar belakang kanvas aplikasi */
  --bg-surface: #FFFFFF;      /* white: Latar belakang kartu & navigasi */
  --bg-surface-subtle: #F1F5F9; /* slate-100: Input & badge netral */

  /* Court Green (Primary Brand) */
  --court-green-50: #ECFDF5;  /* emerald-50: Background badge & highlight */
  --court-green-100: #D1FAE5; /* emerald-100: Active chip selection */
  --court-green-500: #10B981; /* emerald-500: Ikon aktif & tombol sekunder */
  --court-green-600: #059669; /* emerald-600: Tombol primer & brand core */
  --court-green-700: #047857; /* emerald-700: State pressed / hover */

  /* Deep Slate (Typography & Structure) */
  --slate-text-main: #0F172A; /* slate-900: Judul utama & heading tegas */
  --slate-text-body: #334155; /* slate-700: Paragraf deskripsi & nilai spek */
  --slate-text-muted: #64748B;/* slate-500: Label spek, tanggal, placeholder */
  --slate-border: #E2E8F0;    /* slate-200: Garis pembatas kartu & border */
  --slate-border-light: #F1F5F9; /* slate-100: Garis pemisah internal */

  /* Functional Accents */
  --accent-lime: #84CC16;     /* lime-500: Badge beginner & shuttlecock accent */
  --accent-amber: #F59E0B;    /* amber-500: Badge intermediate & wishlist bookmark */
  --accent-rose: #EF4444;     /* rose-500: Badge advanced & error state */
}
```

---

## 3. Tipografi (Typography Scale)

Menggunakan keluarga font sans-serif modern (`Inter` atau `Plus Jakarta Sans`) dengan ketegasan hierarki:

| Peran | Kelas Tailwind | Ukuran (px) | Weight | Line Height | Keterangan |
|---|---|---|---|---|---|
| **App Title** | `text-xl font-bold tracking-tight` | 20px | 700 | 28px | Header aplikasi & nama gear utama |
| **Section Header** | `text-lg font-semibold tracking-tight` | 18px | 600 | 24px | Judul kelompok konten / section |
| **Card Title** | `text-base font-semibold` | 16px | 600 | 22px | Nama produk pada kartu list |
| **Body Text** | `text-sm font-normal` | 14px | 400 | 20px | Deskripsi gear dan paragraf teknik |
| **Meta / Badge** | `text-xs font-medium` | 12px | 500 | 16px | Tag brand, tingkat kesulitan, harga |
| **Micro Caption** | `text-[11px] font-medium tracking-wide` | 11px | 500 | 14px | Label bawah Bottom Navigation Bar |

---

## 4. Sistem Spasi & Geometri (Layout & Spacing)

- **Mobile Viewport Boundary**: Kontainer dibatasi `max-w-md mx-auto` agar konsisten di semua layar (360px hingga tablet/desktop).
- **Rhythm Grid**: Kelipatan 4px/8px:
  - Padding kontainer utama: `px-4 py-5` (16px horizontal, 20px vertikal).
  - Jarak antar card: `space-y-3` atau `gap-3` (12px).
  - Jarak internal card: `p-3.5` (14px) hingga `p-4` (16px).
- **Border Radius**:
  - Kartu & Kontainer: `rounded-2xl` (16px) untuk kesan modern dan ramah sentuhan.
  - Button & Chips: `rounded-xl` (12px) atau `rounded-full` untuk badge kategori.
- **Shadows**:
  - Card biasa: `shadow-sm border border-slate-200/80` (hindari shadow tebal keruh).
  - Sticky Bar / Floating Nav: `shadow-lg border-t border-slate-200/90`.

---

## 5. Komponen Utama

### A. Kartu List Gear (`GearCard`)
- **Struktur**:
  - Horizontal layout untuk kartu ringkas atau 2-column grid untuk katalog visual.
  - Gambar gear di latar belakang abu-abu terang netral (`bg-slate-100 rounded-xl`).
  - Badge Brand (`text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full`).
  - Nama model raket/sepatu tebal (`text-slate-900 font-semibold line-clamp-1`).
  - Baris spesifikasi mini: Bobot (`4U`) & Balance (`Head-Heavy`).
  - Baris harga & tombol pintas Wishlist berbentuk hati / bookmark di pojok kanan bawah.

### B. Kartu Panduan Teknik (`TechniqueCard`)
- **Struktur**:
  - Layout baris vertikal rapi (`bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm`).
  - Header kartu: Kategori pukulan (`Footwork` / `Stroke`) dan Badge Difficulty dengan warna semantik:
    - `Beginner`: `bg-emerald-50 text-emerald-700 border border-emerald-200`
    - `Intermediate`: `bg-amber-50 text-amber-700 border border-amber-200`
    - `Advanced`: `bg-rose-50 text-rose-700 border border-rose-200`
  - Nama teknik tebal (`text-base font-semibold text-slate-900`).
  - Ringkasan 1-2 baris deskripsi (`text-xs text-slate-500 line-clamp-2`).
  - Footer kartu: Indikator jumlah langkah (`4 Langkah Praktik`) + ikon panah kanan (`lucide chevron-right`).

### C. Bottom Navigation Bar (`BottomNav`)
- **Spesifikasi Teknis**:
  - Letak: Menempel permanen di bawah (`fixed bottom-0 left-0 right-0 z-50`).
  - Kontainer: Dibatasi `max-w-md mx-auto` agar pas di atas kontainer aplikasi mobile.
  - Visual: `bg-white/90 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 shadow-lg`.
  - Ukuran target sentuh: Tinggi minimal 56px (`min-h-[56px]`), setiap tab memiliki area klik minimal `48x48px`.
  - Item Navigasi (3 Tab Utama):
    1. **Gear**: Ikon Raket / Grid (`lucide-shopping-bag` atau `lucide-layers`), label "Gear".
    2. **Teknik**: Ikon Shuttlecock / Book (`lucide-activity` atau `lucide-book-open`), label "Teknik".
    3. **Profile**: Ikon User (`lucide-user`), label "Profile" (lengkap dengan badge titik jika ada item di wishlist).
  - State Aktif:
    - Ikon dan teks berubah menjadi `text-emerald-600 font-semibold`.
    - Di atas ikon muncul indikator pil hijau lembut (`bg-emerald-50 text-emerald-600 rounded-xl px-3 py-1`).
  - State Non-Aktif: `text-slate-400 font-medium hover:text-slate-600`.

---

## 6. Feedback & Interaction States (Anti-Slop UI)

1. **Active Tap (Micro-Scale Feedback)**
   - Semua tombol dan kartu interaktif memiliki efek tekan lembut: `active:scale-[0.98] transition-transform duration-100 ease-out`.
2. **Skeleton Loading**
   - Saat request REST API berjalan, tampilkan skeleton card berwarna `bg-slate-200 animate-pulse rounded-2xl` dengan dimensi yang identik dengan kartu aslinya, menghindari lonjakan tata letak (CLS - Cumulative Layout Shift).
3. **Empty State Bersih**
   - Jika hasil pencarian atau daftar wishlist kosong, tampilkan ilustrasi minimalis bertema shuttlecock, pesan ramah ("Belum ada gear di wishlist kamu"), dan tombol aksi langsung ("Jelajahi Katalog").
4. **Detail Page Bottom Action Bar**
   - Di halaman detail gear, sediakan floating action bar di atas bottom nav berisi tombol besar "Simpan ke Wishlist" dengan state:
     - Belum tersimpan: Border `border-emerald-600 text-emerald-600 bg-white` dengan ikon Bookmark outline.
     - Sudah tersimpan: Background penuh `bg-emerald-600 text-white shadow-md` dengan ikon Bookmark terisi solid.
