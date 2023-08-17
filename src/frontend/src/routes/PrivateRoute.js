import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const isLogin = useSelector((state) => {
    return state.login.isLogin;
  });

  return isLogin ? Component : <Navigate to={'/login'} />;
};

export default PrivateRoute;
