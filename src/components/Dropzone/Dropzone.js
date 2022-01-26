import {
  Box, List, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({file, i}) => {
  const [selectedIndex, setSelectedIndex] = useState(i);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <ListItem
      sx={{
        padding: '0',
      }}
    >
      <ListItemButton
        selected={selectedIndex === i}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemText primary={`${i + 1} - ${file?.name}`}/>
      </ListItemButton>
    </ListItem>
  );
});

export const SortableList = SortableContainer(({files}) => (
  <List sx={{width: '400px', mt: '20px'}}>
    {files.map((file, index) => (
      <SortableItem
        key={`${file.name}item-${+index}`}
        i={index}
        index={index}
        file={file}
      />
    ))}
  </List>
));

export const Dropzone = ({
  onDrop, onSortEnd, files, multiple,
}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple,
    accept: 'audio/*',
  });

  return (
    <Box
      sx={{
        m: '30px 0',
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '1px dashed #9c27b0',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <SortableList files={files} onSortEnd={onSortEnd}/>
      ) : (
        <>
          <UploadIcon
            color="primary"
            sx={{
              height: '40px',
              width: '40px',
              mb: '20px',
            }}
          />
          <Typography>
            {isDragActive ? (
              <Box component="span">Release to drop the files here</Box>
            ) : (
              <Box component="span">
                Drag some files here, or click to select files
              </Box>
            )}
          </Typography>
        </>
      )}

    </Box>
  );
};
