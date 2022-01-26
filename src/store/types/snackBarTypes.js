const types = {
  SET_SNACK_BAR: 'SET_SNACK_BAR',
  RESET_SNACK_BAR: 'RESET_SNACK_BAR',
};

export const actionSetSnackBar = (payload) => ({type: types.SET_SNACK_BAR, payload});
export const actionResetSnackBar = (payload) => ({type: types.RESET_SNACK_BAR, payload});

export default types;
