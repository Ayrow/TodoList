import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser === null) {
    return <Outlet />;
  } else {
    return <Navigate to='/todolist' />;
  }
};

export default PrivateRoute;
