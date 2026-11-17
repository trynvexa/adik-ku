const baseUrl = import.meta.env.BASE_URL || './';
const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const tracks = [
  {
    id: 1,
    title: "Glue Song",
    artist: "beabadoobee",
    src: `${cleanBase}music/glue-song.mp3`,
  },
  {
    id: 2,
    title: "Those Eyes",
    artist: "New West",
    src: `${cleanBase}music/those-eyes.mp3`,
  },
];
