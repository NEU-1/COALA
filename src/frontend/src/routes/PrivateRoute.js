import React from 'react';
import { Navigate } from 'react-router';

const PrivateRoute = ({ component: Component }) => {
  const isLogin = localStorage.getItem('login');

  return isLogin ? Component : <Navigate to={'/login'} />;
};

export default PrivateRoute;
