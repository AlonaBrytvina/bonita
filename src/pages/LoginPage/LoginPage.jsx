import React, { useState } from 'react';
import {
  Avatar, Box,
  Button,
  FormControl,
  Grid,
  IconButton, Input,
  InputAdornment, InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './LoginPage.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { actionLogin } from '../../store/types/authTypes';
import { ROUTES } from '../../constants';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [visiblePsw, setVisiblePsw] = useState(false);

  const [loginDirty, setLoginDirty] = useState(false);
  const [pswDirty, setPswDirty] = useState(false);

  const isPswValid = password?.length >= 4 && password?.length <= 20;
  const isLoginValid = login?.length >= 2 && login?.length <= 10;

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
    <Box position="relative">
      <Paper elevation={10} className="paperStyle">
        <Grid
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          container
        >
          <Grid item>
            <Avatar sx={{mb: '15px', backgroundColor: '#9c27b0'}}>
              <LockOutlinedIcon color="white"/>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
            >
              Sign in
            </Typography>
          </Grid>
        </Grid>
        <FormControl className="formControl" sx={{margin: '15px 0'}}>
          <InputLabel error={!!loginDirty && !isLoginValid}>Username</InputLabel>
          <Input
            name="userName"
            variant="standard"
            placeholder="Enter username"
            onChange={onChangeLogin}
            error={!!loginDirty && !isLoginValid}
            onBlur={() => setLoginDirty(true)}
            fullWidth
            required
          />
        </FormControl>
        <FormControl className="formControl" sx={{margin: '15px 0'}}>
          <InputLabel error={!!pswDirty && !isPswValid}>Password</InputLabel>
          <Input
            name="password"
            variant="standard"
            placeholder="Enter password"
            onChange={onChangePassword}
            onBlur={() => setPswDirty(true)}
            error={!!pswDirty && !isPswValid}
            sx={{margin: '10px 0'}}
            type={visiblePsw ? 'text' : 'password'}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton onClick={() => setVisiblePsw(!visiblePsw)}>
                  {visiblePsw
                    ? (<VisibilityIcon/>)
                    : (<VisibilityOffIcon/>)}
                </IconButton>
              </InputAdornment>
            )}
            fullWidth
            required
          />
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            margin: '20px 0',
          }}
          onClick={signIn}
          disabled={!(isLoginValid && isPswValid)}
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          Don't you have an account?
          <Link
            to={ROUTES.REGISTER_PAGE}
          >
            <Button>
              Sign up
            </Button>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
