import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { meAPI } from '../../hooks/controller/AuthController';

/* 역할 : 인증 상태 관리 */
const AuthContext = createContext({
  isAuthenticated: false,
  userInfo: null,
  login: () => {},
  logout: () => {},
});


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  // 검증 상태 Boolean 형태로 저장
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 로그인 상태인 유저 정보 저장
  const [userInfo, setUserInfo] = useState(null);


  const login = useCallback((dto) => {
    setIsAuthenticated(true);
    setUserInfo(dto);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserInfo(null);
  }, []);


  // API 이용, 로그인 한 클라이언트의 정보 저장 
  useEffect(() => {
    let isMounted = true;

    (async () => {
      const result = await meAPI();
      if (!isMounted) return;
      result.success ? login(result.data) : logout();
    })();

    return () =>  isMounted = false;
  }, []);


  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


