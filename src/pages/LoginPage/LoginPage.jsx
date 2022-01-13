import React, { useState } from 'react';
import {
  Avatar, Button, Checkbox, FormControlLabel, Grid, OutlinedInput, Paper, TextField, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginPage.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import { actionLogin, actionLoginSuccess } from '../../store/types/authTypes';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const signIn = () => {
    dispatch(actionLogin({login, password}));
  };

  return (
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
          <Typography
            variant="h4"
            margin="0 20px 0 10px"
          >
            Sign in
          </Typography>
        </Grid>
      </Grid>
      <TextField
        label="Username"
        variant="standard"
        placeholder="Enter username"
        sx={{margin: '10px 0'}}
        onChange={onChangeLogin}
        fullWidth
        required
      />
      <TextField
        label="Password"
        variant="standard"
        placeholder="Enter password"
        onChange={onChangePassword}
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
        onClick={signIn}
        fullWidth
      >
        Sign in
      </Button>
      <Typography>
        Do you have an account?
        <Link
          to="/register"
        >
          <Button>
            Sign up
          </Button>
        </Link>
      </Typography>
    </Paper>
  );
};
