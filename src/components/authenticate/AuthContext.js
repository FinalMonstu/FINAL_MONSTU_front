import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { myInfo } from '../../hooks/controller/MemberController';

/* 역할 : 인증 상태 관리 */
const AuthContext = createContext({
  isAuthenticated: false,
  userInfo: null,
  pass: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => { return useContext(AuthContext); };

export const AuthProvider = ({ children }) => {
  // 검증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 유저 정보 저장
  const [userInfo, setUserInfo] = useState(null);
  // 접근 코드 검증 상태
  const [pass, setPass] = useState( () => sessionStorage.getItem('authPass') === 'true' );

  const login = useCallback((dto) => {
    setIsAuthenticated(true);
    setUserInfo(dto);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserInfo(null);
  }, []);

  const passin = useCallback(() => {
    setPass(true);
    sessionStorage.setItem('authPass', 'true');
  },[]);


  // API 이용, 로그인 한 클라이언트의 정보 저장 
  useEffect(() => {
    let isMounted = true;

    (async () => {
      const result = await myInfo();
      if (!isMounted) return;
      result.success ? login(result.data) : logout();
    })();

    return () =>  isMounted = false;
  }, []);


  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, pass, login, logout, passin }}>
      {children}
    </AuthContext.Provider>
  );
};


