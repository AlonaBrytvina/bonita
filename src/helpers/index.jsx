import React from 'react';

export const saveState = state => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (error) {
    console.error('Can\'t save state to localStorage!');
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
