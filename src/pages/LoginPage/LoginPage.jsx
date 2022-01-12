import React from 'react';
import {
  Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginPage.scss';

export const LoginPage = () => (
  <Paper elevation={10} className="paperStyle">
    <Grid
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      container
    >
      <Grid item>
        <Avatar>
          <LockOutlinedIcon/>
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          Sign in
        </Typography>
      </Grid>
    </Grid>
    <TextField
      label="Username"
      variant="standard"
      placeholder="Enter username"
      sx={{margin: '10px 0'}}
      fullWidth
      required
    />
    <TextField
      label="Password"
      variant="standard"
      placeholder="Enter password"
      fullWidth
      required
    />
    <FormControlLabel
      control={(
        <Checkbox
          color="primary"
        />
      )}
      label="Remember me"
    />
    <Button
      type="submit"
      color="primary"
      variant="contained"
      sx={{
        margin: '20px 0',
      }}
      fullWidth
    >
      Sign in
    </Button>
    <Typography>
      Do you have an account?
    </Typography>
  </Paper>
);
