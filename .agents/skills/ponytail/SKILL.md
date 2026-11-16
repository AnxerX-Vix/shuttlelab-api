---
name: ponytail
description: "Arsitektur folder modular dan prinsip minimalis: pemisahan tanggung jawab file secara tegas, struktur direktori lurus, tanpa abstraksi berlebihan (YAGNI), serta solusi terkecil yang menyelesaikan tugas secara tuntas."
---

# Ponytail (Modular Architecture & Minimalist Dev)

Prinsip rekayasa perangkat lunak: kode terbaik adalah kode paling sederhana yang menyelesaikan masalah secara tuntas. Pisahkan tanggung jawab file secara jelas, hindari abstraksi dini, dan jaga struktur kode mudah dipahami manusia.

## Prinsip Arsitektur Folder Modular

1. **Struktur Lurus dan Mudah Ditelusuri**
   - Pisahkan layer aplikasi sesuai fungsi spesifiknya:
     - `config`: konfigurasi koneksi lingkungan dan library (misal: koneksi Supabase).
     - `models`: representasi skema data dan interaksi query database.
     - `controllers`: logika pemrosesan request dan response HTTP.
     - `routes`: pemetaan endpoint URL ke controller yang bersangkutan.
     - `components`: komponen UI modular dan dapat digunakan kembali.
     - `pages` / `views`: halaman utama aplikasi.
   - Jangan menyembunyikan alur kode di balik 5 lapis folder bersarang (nested directories) jika 1 atau 2 level sudah cukup.

2. **Pemisahan Tanggung Jawab (Separation of Concerns)**
   - Setiap file hanya memiliki 1 tanggung jawab utama:
     - Route tidak boleh berisi query SQL atau manipulasi database langsung.
     - Controller fokus memvalidasi input, memanggil model/service, dan mengembalikan HTTP status + JSON.
     - UI Component fokus pada rendering tampilan dan menerima event handler, bukan membungkus logika backend yang berat.

3. **Prinsip YAGNI (You Aren't Gonna Need It)**
   - Jangan membuat kelas generic, factory pattern rumit, atau wrapper berlebihan untuk fitur yang belum tentu dibutuhkan.
   - Tulis solusi paling langsung dan eksplisit terlebih dahulu.
   - Hindari membuat file utilitas (`utils.js`, `helpers.js`) yang hanya berisi 1–2 baris fungsi sepele.

4. **Kerapian Dependensi**
   - Gunakan fitur native bawaan JavaScript/Node.js jika sudah tersedia (misal: `fetch`, `URLSearchParams`, `Array.prototype.find`).
   - Jangan menginstal dependensi pihak ketiga untuk tugas sepele yang bisa diselesaikan dalam 3 baris kode standar.

5. **Kode Mudah Dijelaskan Saat Evaluasi / Responsi**
   - Setiap baris kode harus memiliki alasan keberadaan yang logis dan mudah diterangkan kepada asisten laboratorium atau penguji.
   - Jika sebuah fungsi terasa sulit dijelaskan alurnya dalam 1 menit, refactor fungsi tersebut menjadi lebih lurus dan lugas.
