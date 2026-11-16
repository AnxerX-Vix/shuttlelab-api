---
name: anti-slop
description: "Standar kebersihan dan kesederhanaan kode: eliminasi boilerplate AI slop, penghapusan komentar redundan/dekoratif, larangan wrapper tidak perlu, dan penegakan penulisan kode lurus yang mudah dibaca manusia."
---

# Anti-Slop (Code Cleanliness & Simplicity)

Panduan menjaga kebersihan kode dari pola-pola generik AI ("AI slop"). Tujuannya menghasilkan kode yang bersih, fungsional, profesional, dan terasa seperti ditulis oleh developer berpengalaman.

## Larangan Keras (Banned Slop Patterns)

1. **Komentar Redundan & Menjelaskan yang Jelas (Restating the Obvious)**
   - DILARANG menulis komentar yang hanya mengulang nama fungsi atau variabel:
     - ❌ `// Inisialisasi variabel gears` di atas `const [gears, setGears] = useState([]);`
     - ❌ `// Fetch data gear dari API` di atas `const fetchGear = async () => ...`
     - ❌ `// Fungsi untuk menghandle klik` di atas `const handleClick = () => ...`
   - Biarkan kode berbicara sendiri melalui penamaan yang jelas dan ekspresif.

2. **Komentar Narasi Alur Kerja (Workflow Narration)**
   - DILARANG menomori atau menarasikan langkah per langkah yang sudah jelas dari urutan kode:
     - ❌ `// Langkah 1: Ambil ID dari params`
     - ❌ `// Langkah 2: Query ke database`
     - ❌ `// Langkah 3: Kembalikan respon json`

3. **Banner Dekoratif & Emoji Berlebihan**
   - DILARANG menggunakan banner karakter berulang atau emoji dekoratif di dalam kode:
     - ❌ `// ==========================================`
     - ❌ `/* ---------- CONTROLLERS ---------- */`
     - ❌ `// 🚀 Start Express Server`
     - ❌ `// ✅ Validasi Berhasil`

4. **Abstraksi Palsu & Wrapper Kosong**
   - DILARANG membuat fungsi wrapper yang kerjanya hanya meneruskan argumen tanpa ada transformasi nilai nyata:
     - ❌ `const executeQuery = (query) => query;`
     - ❌ `class ResponseFormatter { static format(data) { return data; } }`
   - Gunakan pendekatan langsung: kirim response langsung `res.status(200).json(data)`.

5. **Penamaan Variabel Konsisten & Eksplisit**
   - Gunakan kata benda jamak untuk array: `gears`, `techniques`, `categories`.
   - Gunakan kata kerja aktif untuk fungsi: `fetchGears`, `getGearById`, `createGear`, `toggleWishlist`.
   - Hindari singkatan tidak umum seperti `grs`, `tchnq`, `c_id`, atau nama ambigu seperti `data1`, `tempObj`.

6. **Kapan Komentar Diperbolehkan?**
   - Komentar hanya ditulis jika menjelaskan **mengapa** (alasan bisnis, batasan teknis eksternal, atau edge case aneh yang tidak bisa diekspresikan oleh kode itu sendiri), bukan **apa** yang dilakukan kode.
   - Contoh komentar yang sah:
     - `// localStorage fallback jika kuota penyimpanan browser penuh`
     - `// Supabase anon key hanya diizinkan untuk operasi baca publik`
