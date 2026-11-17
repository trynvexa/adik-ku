const baseUrl = import.meta.env.BASE_URL || './';
const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const tracks = [
  {
    id: 1,
    title: "Sebuah Lagu Untukmu",
    artist: "Melodi Hangat Kakak",
    src: `${cleanBase}music/glue-song.mp3`,
  },
];

