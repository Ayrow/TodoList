import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { currentUser } = useAuthContext();
  if (currentUser === null) {
    return <Outlet />;
  } else {
    return <Navigate to='/todolist' />;
  }
};

export default PrivateRoute;
