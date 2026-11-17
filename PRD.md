# PRD – Lucky to Have You 💗 (v2.1 – Revisi Scrapbook Interaktif & Alur Otomatis)

*Revisi besar untuk v2.1 berdasarkan arahan desain romantis tanpa tombol (zero-button UI), alur otomatis berbasis waktu baca, gestur intuitif, scrapbook aesthetic anti-AI-slop, dan pemutar musik vinyl persisten.*

---

## 0. Aturan Eksekusi (Untuk Coding Agent)

1. **Kerjakan per fase** secara bertahap. Selesaikan dan uji build pada tiap fase sebelum lanjut.
2. **Jangan ubah teks.** Semua copy (judul, pesan, surat) tetap persis seperti v2.0, tersimpan di `src/data/*`.
3. **Konfigurasi konten terpusat** di `src/data/` dan `public/`.
4. **Tidak ada tombol (Zero-Button UI).** Hapus semua tombol tombolan gaya standar (`<button class="bg-pink-500...">MULAI/NEXT/BACK</button>`). Semua interaksi digantikan oleh manipulasi objek fisik/scrapbook (ketuk hati, tarik pita, buka lipatan amplop, balik kartu, geser foto).
5. **Alur otomatis:** scene berpindah otomatis setelah animasi/teks selesai dibaca (kalkulasi ~0.06 detik/karakter + jeda apresiasi). Gestur swipe (geser kanan/atas untuk lanjut, kiri/bawah untuk kembali) dan ketukan area kosong untuk mempercepat.
6. **Desain Anti-AI-Slop:** Gunakan estetika Handmade Romantic Scrapbook: tekstur kertas berpori (paper grain), washi tape realistis, foto polaroid bersegel stiker, kertas terlipat, bayangan bertingkat (realistic multi-layered shadows), spring physics, dan tipografi berkarakter (Playfair Display, Poppins, Dancing Script).

---

## 1. Ringkasan Produk & Karakter Visual

| Item | Spesifikasi |
| --- | --- |
| **Nama** | Lucky to Have You 💗 |
| **Jenis** | Personal Romantic Scrapbook Digital Experience |
| **Penerima** | Adik perempuan |
| **Pembuat** | Kakak |
| **Platform** | Mobile-First Web (dioptimalkan untuk viewport HP: 360px–430px, responsif ke tablet & desktop) |
| **Tema Estetika** | Warm Handmade Romantic Scrapbook (Kertas linen/craft hangat, washi tape, polaroid berbayang lembut, tulisan tangan, pita satin) |
| **Anti-AI-Slop** | Menghindari gradien ungu-pink generik seragam, kartu rounded seragam, dan dekorasi hampa |

---

## 2. Paradigma Navigasi: Zero-Button & Alur Otomatis

### A. Mekanisme Alur Otomatis (Auto-Advance)
- Setiap scene yang berisi teks memiliki timer membaca otomatis:
  $$\text{Waktu Tunggu} = (\text{Jumlah Karakter} \times 0.06\text{s}) + \text{Jeda Bernapas (1.5s–2.5s)}$$
- Pengguna tidak pernah dipaksa menunggu jika membaca cepat: **Ketuk area kosong** langsung mempercepat teks / transisi.
- Scene yang membutuhkan interaksi awal (misal: amplop di Scene 02, kartu di Scene 05) menunggu interaksi pertama selesai, lalu timer otomatis aktif.

### B. Gestur Intuitif (Swipe & Shortcuts)
- **Geser ke Kiri / Ke Atas (Swipe Left / Up):** Lewati ke scene berikutnya.
- **Geser ke Kanan / Ke Bawah (Swipe Right / Down):** Kembali ke scene sebelumnya.
- **Ketuk di Area Kosong:** Percepat animasi teks / selesaikan jeda.
- **Keyboard Fallback:** `ArrowRight` / `Space` / `Enter` (Lanjut / Aksi Utama), `ArrowLeft` (Kembali).

### C. Indikator Progres
- Menggunakan jahitan benang scrapbook halus (*stitched thread / mini dots*) di bagian atas layar sebagai indikator posisi visual tanpa tombol klik yang mencolok.

---

## 3. Sistem Musik: Persistent Vinyl Player

- **Komponen Persisten:** Ditampilkan di pojok atas pada seluruh scene tanpa putus.
- **Visual:** Piringan piringan hitam (vinyl) mini bertekstur alur realistis yang berputar halus saat audio berputar, dilengkapi jarum tonearm mini dan mini audio visualizer (gelombang suara).
- **Interaksi:**
  - Ketuk piringan vinyl: Toggle Play / Pause.
  - Tahan atau ketuk untuk membuka kartu kontrol kaset kecil (judul lagu, volume slider, next/prev) yang otomatis menutup sendiri setelah beberapa detik tidak disentuh.
- **Inisiasi Audio (Browser Compliance):** Audio dimulai saat interaksi pertama adik (mengetuk hati berdetak di Scene 01).
- **Fallback:** Bila audio gagal dimuat atau diblokir browser, piringan berkedip lembut dengan tag lucu *"dengerin lagunya yuk 🎵"* tanpa membuat aplikasi crash.

---

## 4. Spesifikasi Interaksi Tiap Scene

### Scene 01 — Welcome
- **Visual:** Kertas surat bertekstur blush lembut dengan pencahayaan hangat. Hati 3D berdetak lembut di tengah.
- **Interaksi:** Ketuk hati berdetak untuk memulai.
- **Respons:** Haptic feedback ringan, denyut hati membesar melepaskan sparkle partikel cinta, audio musik mulai berputar, dan meluncur mulus ke Scene 02.
- **Petunjuk Lucu:** Tulisan tangan meliuk *"ketuk hatinya yaa~ ✨"*

### Scene 02 — Little Surprise
- **Visual:** Amplop kerajinan tangan tertutup dengan pita satin merah muda dan cap lilin/stiker hati.
- **Interaksi:** Geser tutup amplop ke atas atau tarik pita.
- **Respons:** Amplop terbuka secara elastis (spring animation), kertas pesan menyembul keluar disertai partikel kelopak bunga mini.
- **Alur Otomatis:** Setelah surat terbuka dan teks terbaca, otomatis beralih ke Scene 03.

### Scene 03 — Our Little Memories
- **Visual:** Album scrapbook dengan washi tape bermotif pastel yang menempelkan 3 foto polaroid dengan sudut rotasi natural.
- **Interaksi:** Foto dapat digeser/diseret secara interaktif, bergoyang saat disentuh (*wiggle*), dan bila diketuk akan membuka tampilan polaroid zoom dengan keterangan foto (*caption*).
- **Alur Otomatis:** Berpindah ke Scene 04 setelah momen apresiasi foto selesai.

### Scene 04 — Why I'm Grateful
- **Visual:** Lembaran diary antik dengan hiasan kelopak bunga kering.
- **Interaksi:** 5 poin rasa syukur muncul bergantian dengan animasi tulisan pena yang mengalir bertahap.
- **Alur Otomatis:** Dihitung berdasarkan panjang teks per poin. Ketuk layar di area kosong untuk mempercepat kemunculan teks.

### Scene 05 — Things I Want to Say
- **Visual:** 5 amplop lipat mini / tag kado gantung bertekstur kertas kraft.
- **Interaksi:** Ketuk amplop mini untuk membalik (*3D flip reveal*) pesan di dalamnya. Setiap flip memunculkan ledakan mini confetti hati dan getaran haptic.
- **Alur Otomatis:** Berpindah otomatis setelah pesan dibuka dan terbaca.

### Scene 06 — Music For You
- **Visual:** Sudut pemutar piringan hitam klasik yang intim di atas meja kayu/kertas bertekstur.
- **Interaksi:** Piringan vinyl berputar dengan visualizer dinamis, judul lagu dari `tracks.js`. Ketuk vinyl untuk play/pause atau geser piringan.
- **Alur Otomatis:** Memberi waktu adik menikmati lagu sebelum meluncur halus ke Scene 07.

### Scene 07 — A Letter For You
- **Visual:** Kertas surat panjang bertekstur linen dengan lipatan realistis yang terbuka perlahan.
- **Alur Otomatis:** Paragraf muncul mengalir dengan jeda membaca yang nyaman (~0.06s/karakter). Surat dapat digulir lembut ke bawah jika layar mungil. Tidak pernah melompat sebelum paragraf penutup selesai terbaca.
- **Akselerasi:** Ketuk area surat untuk langsung menampilkan seluruh teks jika adik ingin membaca cepat.

### Scene 08 — Final Surprise
- **Visual:** Kolase scrapbook perayaan yang manis: foto kenangan berbingkai washi tape, taburan kelopak bunga, dan partikel hati melayang yang berkumpul mengikuti gerakan sentuhan jari/kursor.
- **Pemberhentian Akhir (Tanpa Tombol):**
  - Ketuk tumpukan polaroid kecil di sudut: Bernostalgia melihat galeri kenangan lagi (Scene 03).
  - Tarik pita satin dekoratif di bagian bawah: Mengulang pengalaman dari Scene 01 dengan manis.

---

## 5. Roadmap Fase & Verifikasi

- **Fase 1 — Fondasi & Arsitektur Zero-Button (CURRENT):**
  - Setup token scrapbook, tekstur kertas, font handwriting, soundwave visualizer styling.
  - Implementasi Gesture Engine (Swipe Left/Right/Up/Down, Tap accelerate).
  - Implementasi Auto-advance Timing Hook & Haptic Utility.
  - Persistent Vinyl Player di `App.jsx`.
  - Hapus tombol button navigasi konvensional.
  - Verifikasi: `npm run build` sukses.
- **Fase 2 — Welcome & Surprise (Scene 01 & 02):**
  - Animasi Beating Heart dengan audio trigger & Envelope drag/unfold.
- **Fase 3 — Memories Scrapbook (Scene 03):**
  - Polaroid interaktif, drag & drop / wiggle, lightbox organik.
- **Fase 4 — Pesan Emosional (Scene 04, 05, 07):**
  - Text reveal bertahap terukur waktu, 3D flip tags, surat linen berlipat.
- **Fase 5 — Music Room & Final Experience (Scene 06 & 08):**
  - Full vinyl experience, partikel hati interaktif mengikuti kursor/jari, pita pengulang.
- **Fase 6 — Polish, Accessibility & End-to-End Verification:**
  - Audit kontras, keyboard accessibility, `prefers-reduced-motion`, responsiveness 360px–desktop.
