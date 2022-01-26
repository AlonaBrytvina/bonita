import React from 'react';
import {
  Box, Grid, Paper, Skeleton,
} from '@mui/material';

export const SkeletonProduct = () => (
  <Box sx={{width: '600px', height: '100%', ml: '20px'}}>
    {
      Array(7).fill(undefined).map((item, index) => (
        <Skeleton key={index} width="100%" height={70} animation="wave"/>
      ))
    }
  </Box>
);

export const SkeletonProductPlaylists = () => (
  <Grid
    spacing={3}
    container
  >
    {
      Array(12).fill(undefined).map((item, index) => (
        <Grid
          key={index}
          item
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={155}
            height={190}
            sx={{
              margin: '24px 0 0 20px',
              borderRadius: '5%',
            }}
          />
        </Grid>
      ))
    }
  </Grid>
);
