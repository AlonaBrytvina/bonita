export const saveState = state => {
  if (!localStorage.getItem('authToken')) {
    localStorage.removeItem('state');
  } else {
    localStorage.setItem('state', JSON.stringify(state));
  }
};

export const stateToStorageSelector = state => ({
  auth: state.auth,
});

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return {};
    }

    const state = JSON.parse(serializedState);
    saveState(state);

    return state;
  } catch (error) {
    return {};
  }
};
