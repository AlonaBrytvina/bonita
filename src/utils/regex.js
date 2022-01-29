export const regex = (name) => name
  .replace(/\.(mp3|mp4|music-2021.com|wav|flac)$/i, '')
  .replace(/(\(.*?\))/g, '');
