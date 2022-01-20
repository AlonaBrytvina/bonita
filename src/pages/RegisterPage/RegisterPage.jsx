import React, { useState } from 'react';
import {
  Alert,
  Avatar, Box,
  Button,
  FormControl,
  Grid,
  IconButton, Input,
  InputAdornment, InputLabel,
  Paper, Snackbar,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { actionRegister } from '../../store/types/authTypes';

export const RegisterPage = () => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPsw, setConfirmPsw] = useState(null);

  const [visiblePsw, setVisiblePsw] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [loginDirty, setLoginDirty] = useState(false);
  const [pswDirty, setPswDirty] = useState(false);

  const [pswConfirmDirty, setConfirmPswDirty] = useState(false);

  const isPswValid = password?.length >= 4 && password?.length <= 20;
  const isConfirmPswValid = password?.length >= 4 && password?.length <= 20;
  const isLoginValid = login?.length >= 2 && login?.length <= 10;

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
        <InputLabel error={!!loginDirty && !isLoginValid}>Login</InputLabel>
        <Input
          label="Login"
          variant="standard"
          placeholder="Enter login"
          sx={{margin: '10px 0'}}
          onChange={onChangeName}
          onBlur={() => setLoginDirty(true)}
          error={!!loginDirty && !isLoginValid}
          fullWidth
          required
        />
      </FormControl>
      <FormControl className="formControl" sx={{mb: '10px'}}>
        <InputLabel error={!!pswDirty && !isPswValid}>Password</InputLabel>
        <Input
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
      <FormControl className="formControl" sx={{mb: '10px'}}>
        <InputLabel error={!!pswConfirmDirty && !isConfirmPswValid}>Confirm password</InputLabel>
        <Input
          label="Confirm password"
          variant="standard"
          placeholder="Confirm password"
          onChange={confirmPassword}
          onBlur={() => setConfirmPswDirty(true)}
          error={!!pswConfirmDirty && !isConfirmPswValid}
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
        {
          (password !== null && confirmPsw !== null)
            ? (password !== confirmPsw) || (!isPswValid && !isConfirmPswValid)
              ? (<Box>The password confirmation does not match</Box>)
              : ''
            : ''
        }
      </FormControl>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          margin: '20px 0',
        }}
        onClick={signUp}
        disabled={!(isLoginValid && isPswValid && isConfirmPswValid)}
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
