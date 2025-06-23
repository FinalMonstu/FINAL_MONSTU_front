import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { authPath } from '../../hooks/urlManager';

/* 로그인 상태의 유저 검증  */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated  } = useAuth();

  if (!isAuthenticated ) { return <Navigate to={authPath.login} replace />; }
  return children;
};

export default PrivateRoute;
