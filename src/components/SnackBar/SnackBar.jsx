import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actionResetSnackBar } from '../../store/types/snackBarTypes';

export const SnackBar = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state?.snackBar);
  const {message, isOpen} = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(actionResetSnackBar());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    >
      <Alert
        severity="success"
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
