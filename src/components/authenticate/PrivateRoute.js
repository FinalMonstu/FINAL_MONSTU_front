import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  // useAuth 훅을 통해 Auth Context에 저장된 user 정보를 가져옴
  const { isAuthenticated  } = useAuth();

  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
