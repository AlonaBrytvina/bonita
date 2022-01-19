import React from 'react';
import { Box } from '@mui/material';
import './GenerateGradient.scss';

const GenGradient = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

export const GenerateGradient = () => {
  const deg = Math.floor(Math.random() * 360);
  return (
    <Box
      className="vinylPlate"
      sx={{
        background: `linear-gradient(${deg}deg,${GenGradient()},${GenGradient()},${GenGradient()})`,
      }}
    >
      <Box className="vinylPlate__middleCircle">
        <Box className="vinylPlate__innerCircle"/>
      </Box>
    </Box>
  );
};
