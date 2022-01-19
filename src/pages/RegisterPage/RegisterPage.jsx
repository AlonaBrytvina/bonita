import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton, Input,
  InputAdornment, InputLabel,
  Paper, Snackbar,
  Typography,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { actionLogin, actionRegister } from '../../store/types/authTypes';

export const RegisterPage = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPsw, setConfirmPsw] = useState(null);
  const [visiblePsw, setVisiblePsw] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const history = useHistory();

  const onChangeName = (e) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const confirmPassword = (e) => {
    setConfirmPsw(e.target.value);
  };

  const signUp = () => {
    if (password === confirmPsw) {
      dispatch(actionRegister({login, password}));
      console.log(auth);

      if (auth.login.length !== 0 && localStorage.getItem('authToken') !== null) {
        setOpenSnackBar(!openSnackBar);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
    history.push('/');
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
          <Avatar sx={{mb: '15px', backgroundColor: '#9c27b0'}}>
            <LockOutlinedIcon color="white"/>
          </Avatar>
        </Grid>
        <Grid
          align="center"
          sx={{mb: '10px'}}
          item
        >
          <Typography variant="h4">
            Sign up
          </Typography>
          <Typography variant="caption">
            Create an account!
          </Typography>
        </Grid>
      </Grid>
      <FormControl className="formControl" sx={{mb: '10px'}}>
        <InputLabel>Login</InputLabel>
        <Input
          label="Login"
          variant="standard"
          placeholder="Enter login"
          sx={{margin: '10px 0'}}
          onChange={onChangeName}
          fullWidth
          required
        />
      </FormControl>
      <FormControl className="formControl" sx={{mb: '10px'}}>
        <InputLabel>Password</InputLabel>
        <Input
          variant="standard"
          placeholder="Enter password"
          onChange={onChangePassword}
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
      <FormControl className="formControl" sx={{mb: '10px'}}>
        <InputLabel>Confirm password</InputLabel>
        <Input
          label="Confirm password"
          variant="standard"
          placeholder="Confirm password"
          onChange={confirmPassword}
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
        onClick={signUp}
        fullWidth
      >
        Sign up
      </Button>
      <Typography sx={{display: 'flex', alignItems: 'center'}}>
        Already have an account?
        <Link to="/login">
          <Button>
            Sign in
          </Button>
        </Link>
      </Typography>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert
          severity="success"
          onClose={handleClose}
        >
          Success registration and log in!
        </Alert>
      </Snackbar>
    </Paper>
  );
};
