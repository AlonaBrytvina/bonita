import React from 'react';
import {
  Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

export const RegisterPage = () => (
  <Paper elevation={10} className="paperStyle">
    <Grid
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      container
    >
      <Grid item>
        <Avatar>
          <AddCircleOutline/>
        </Avatar>
      </Grid>
      <Grid align="center" item>
        <Typography
          variant="h4"
          margin="20px 0"
        >
          Sign up
        </Typography>
        <Typography variant="caption">
          Please fill this form to create an account!
        </Typography>
      </Grid>
    </Grid>
    <TextField
      label="Name"
      variant="standard"
      placeholder="Enter name"
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
    <TextField
      label="Confirm password"
      variant="standard"
      placeholder="Confirm password"
      fullWidth
      required
    />
    <FormControlLabel
      sx={{
        marginRight: '0',
      }}
      control={<Checkbox name="Checked"/>}
      label="I accept the terms and conditions"
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
      Sign up
    </Button>
  </Paper>
);
