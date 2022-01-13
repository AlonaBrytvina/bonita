import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({component: Component, ...rest}) => {
  const authToken = useSelector(state => state.auth.authToken) ?? null;
  const isAuthenticated = authToken !== null;

  return (
    <Route
      {...rest}
      render={props => isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to="/login"/>
      )}
    />
  );
};
