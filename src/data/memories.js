const baseUrl = import.meta.env.BASE_URL || './';
const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const memories = [
  {
    id: 1,
    src: `${cleanBase}images/photo-1.jpg`,
    caption: "Senyum dan tatapan manismu yang selalu bikin hari-hari lebih cerah ✨",
    rotation: -3,
  },
  {
    id: 2,
    src: `${cleanBase}images/photo-2.jpg`,
    caption: "Nona cantik kesayangan kakak yang selalu luar biasa 💖",
    rotation: 2.5,
  },
  {
    id: 3,
    src: `${cleanBase}images/photo-3.jpg`,
    caption: "Setiap tawa kecilmu selalu punya tempat istimewa di hati kakak 🌸",
    rotation: -2,
  },
  {
    id: 4,
    src: `${cleanBase}images/photo-4.jpg`,
    caption: "Terima kasih sudah selalu jadi dirimu sendiri yang hebat 🌷",
    rotation: 3,
  },
  {
    id: 5,
    src: `${cleanBase}images/photo-5.jpg`,
    caption: "Momen berharga yang akan selalu kakak jaga dan simpan rapi 💫",
    rotation: -2.5,
  },
];
