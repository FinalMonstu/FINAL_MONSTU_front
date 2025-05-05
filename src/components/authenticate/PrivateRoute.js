import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { authPath } from '../../hooks/urlManager';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated  } = useAuth();

  if (!isAuthenticated ) { return <Navigate to={authPath.login} replace />; }
  return children;
};

export default PrivateRoute;
