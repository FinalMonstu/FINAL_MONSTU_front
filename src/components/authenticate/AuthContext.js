import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { meAPI } from '../../hooks/controller/AuthController';

const AuthContext = createContext(null);

//Provider 컴포넌트: 전역에서 인증 상태를 관리할 수 있도록 함.
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = (dto) => {
    setIsAuthenticated(true);
    setUserInfo(dto);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  const refreshMe = useCallback(
    async () => {
      const result = await meAPI();
      if (result.success) {
        login(result.data);
      } else {
        logout();
      }
    }, [login,logout] );

  useEffect(()=>{
    refreshMe();
  },[])

  

  // Provider를 통해 공유할 값: user와 인증 관련 함수를 포함합니다.
  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅: 이 훅을 사용하면 컴포넌트에서 간편하게 컨텍스트 값을 읽을 수 있습니다.
export const useAuth = () => {
  return useContext(AuthContext);
};
