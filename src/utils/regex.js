import React from 'react';

export const regex = (name) => {
  const result = name.replace(/\.(mp3|mp4|music-2021.com)$/i, '');
  return result.replace(/(\(.*?\))/g, '');
};
