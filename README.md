# Lucky to Have You 💗

Website hadiah digital personal bertema *Romantic Digital Scrapbook*, dibuat khusus dari seorang kakak untuk adik perempuannya yang berharga.

---

## 🚀 Cara Menjalankan Website Ini

Kamu bisa langsung menjalankan website ini di komputermu dengan langkah mudah berikut:

### 1. Menjalankan Mode Development (Untuk Melihat Langsung)
Buka terminal di folder proyek ini (`/home/zikripacaryuha/adik-ku`), lalu ketik:
```bash
npm run dev
```
Setelah itu, terminal akan menampilkan tautan lokal, biasanya:
👉 **`http://localhost:5173/`** atau **`http://localhost:3000/`**
Buka tautan tersebut di browser (Chrome, Edge, Firefox, atau Safari). Kamu juga bisa membuka fitur *Inspect Element* (F12) lalu klik ikon ponsel untuk melihat tampilan mobile yang pas.

### 2. Membangun & Meninjau Versi Siap Deploy (Production Preview)
```bash
# Bangun aplikasi menjadi bundle produksi
npm run build

# Jalankan server pratinjau lokal
npm run preview
```
Buka tautan pratinjau (biasanya `http://localhost:4173/`).

---

## 📸 Galeri 5 Foto Adik
Sesuai arahan, galeri kenangan telah diperluas menjadi **5 foto lengkap**:
1. `public/images/photo-1.jpg`: Foto potret *close-up* dengan kacamata & bunga lili pink.
2. `public/images/photo-2.jpg`: Foto refleksi stiker *"oh, nona cantik, ko paling talalu"*.
3. `public/images/photo-3.jpg`: Foto kolase 4-grid senyum manis.
4. `public/images/photo-4.jpg`: Foto 3-strip bernuansa ungu dengan kacamata.
5. `public/images/photo-5.jpg`: Foto 3-strip filmstrip vintage.

Setiap foto dilengkapi sudut kemiringan scrapbook yang unik, caption penuh kasih di `src/data/memories.js`, dan modal **Lightbox** yang dapat menampilkan foto vertikal secara penuh saat disentuh.

---

## 🎵 Musik Latar
File musik latar diletakkan di:
- `public/music/background-music.mp3`
- Judul lagu dan nama artis dapat disesuaikan di `src/data/tracks.js`.

---

## 🌐 Deploy Online
Website ini berupa *Static Single Page Application (SPA)* berbasis Vite + React, sangat siap untuk dideploy gratis ke:
- **Vercel**: tinggal import repositori GitHub atau jalankan `npx vercel`
- **Netlify**: drag and drop folder `dist` ke dashboard Netlify.
URL publik yang didapat dapat dijadikan QR code cantik bergambar hati untuk dikirimkan ke adik via WhatsApp!

---

*Dibuat dengan penuh cinta dari seorang kakak untuk adik tersayang. 💗*
