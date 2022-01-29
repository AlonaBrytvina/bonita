import React from 'react';
import {
  Box, Grid, Skeleton,
} from '@mui/material';

export const SkeletonProduct = () => (
  <Box sx={{width: '90%', height: '100%', ml: '20px'}}>
    {
      Array(7).fill(undefined).map((item, index) => (
        <Box sx={{display: 'flex'}} key={index}>
          <Skeleton sx={{mr: '10px'}} width="5%" height={70} animation="wave"/>
          <Skeleton width="80%" height={70} animation="wave"/>
        </Box>
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
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          item
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={155}
            height={190}
            sx={{
              position: 'relative',
              zIndex: '1',
              margin: '24px 0 0 20px',
              borderRadius: '5%',
            }}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={125}
            height={125}
            sx={{
              position: 'absolute',
              bgcolor: 'grey.300',
              borderRadius: '50%',
              margin: '24px 0 0 20px',
            }}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
            sx={{
              position: 'absolute',
              bgcolor: 'white.100',
              borderRadius: '50%',
              margin: '24px 0 0 20px',
            }}
          />
          <Skeleton
            variant="circular"
            width={8}
            height={8}
            sx={{
              position: 'absolute',
              bgcolor: 'white.900',
              borderRadius: '50%',
              margin: '24px 0 0 20px',
            }}
          />
        </Grid>
      ))
    }
  </Grid>
);
