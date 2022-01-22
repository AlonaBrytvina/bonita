import { Box, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import React from 'react';
import { useDropzone } from 'react-dropzone';

export const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept,
  });

  return (
    <Box
      sx={{
        mt: '50px',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '1px dashed #9c27b0',
      }}
      {...getRootProps()}
    >
      <UploadIcon
        color="primary"
        sx={{
          height: '40px',
          width: '40px',
          mb: '20px',
        }}
      />
      <input {...getInputProps()} />
      <Typography>
        {isDragActive ? (
          <Box component="span">Release to drop the files here</Box>
        ) : (
          <Box component="span">
            Drag some files here, or click to select files
          </Box>
        )}
      </Typography>
    </Box>
  );
};
