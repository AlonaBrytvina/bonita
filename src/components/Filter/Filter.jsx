import {
  Box, Button, ButtonGroup, Typography,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { forwardToPage } from '../../utils/history';

export const Filter = ({
  onClickUpload, linkToUser, linkToAll,
  selectedFilter, categoryName, count, onSelect,
}) => (
  <Box
    sx={{
      m: '10px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Box>
      <Button
        onClick={onClickUpload}
        variant="outlined"
      >
        <FileUploadIcon fontSize="small"/>
        <Typography marginLeft="5px" variant="button">
          {`Upload ${categoryName}`}
        </Typography>
      </Button>
    </Box>
    <ButtonGroup variant="outlined">
      <Button
        variant={selectedFilter === 'all' ? 'contained' : 'outlined'}
        onClick={() => {
          onSelect('all');
        }}
      >
        {`All ${categoryName}`}
      </Button>
      <Button
        variant={selectedFilter === 'my' ? 'contained' : 'outlined'}
        onClick={() => {
          onSelect('my');
        }}
      >
        {`My ${categoryName}`}
      </Button>
    </ButtonGroup>
    <Typography
      variant="button"
      color="primary"
      cursor="default"
    >
      {`Total - ${count}`}
    </Typography>
  </Box>
);
