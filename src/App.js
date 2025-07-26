import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import { Box } from '@mui/material';

import PostPage from './features/posts/PostPage';
import SignUpPage from './features/auth/page/SignUpPage';
import LoginPage from './features/auth/page/LoginPage';
import FindPage from './features/auth/page/FindPage';
import ResetPwPage from './features/auth/page/ResetPwPage';
import FindIdPage from './features/auth/page/FindIdResultPage';
import SignOutPage from './features/auth/page/SignOutPage';
import MyPage from './features/profile/MyPage';
import AuthPassPage from './features/auth/page/AuthPassPage';
import AdminPage from './features/admin/AdminPage';

import { adminPath, authPath, mainPath, myPath, postPath, } from './common/hooks/urlManager';
import Header from './common/components/Header';
import AdminRoute from './features/auth/components/route/AdminRoute';
import PrivateRoute from './features/auth/components/route/PrivateRoute';
import {AuthProvider} from './features/auth/hooks/AuthContext'

function App() {

  const publicRoutes = [
    { path: mainPath, element: <Main /> },                  /* 메인 페이지 */

    { path: authPath.login,      element: <LoginPage /> },  /* 로그인 페이지 */
    { path: authPath.signup,     element: <SignUpPage /> }, /* 회원가입 페이지 */
    { path: authPath.find,       element: <FindPage /> },   /* ID,Password 찾기 페이지 */
    { path: authPath.resetPw,    element: <ResetPwPage /> },/* Password 재설정 페이지 */
    { path: authPath.foundEmail, element: <FindIdPage /> }, /* 찾은 ID 확인 페이지 */

    { path: postPath.post,       element: <PostPage /> },   /* 번역 페이지 */

    { path: "/*", element: <div>존재하지 않는 페이지</div> },  /* 존재하지 않는 페이지 */
  ];

  const privateRoutes = [
    { path: authPath.signout, element: <SignOutPage /> },   /* 회원 탈퇴 페이지 */

    { path: myPath.my, element: <MyPage /> },               /* 마이 페이지 페이지 */
  ];

  const adminRoutes = [
    { path: adminPath.admin, element: <AdminPage /> },      /* 어드민 페이지 */
  ];

  return (
    <AuthProvider>
      <BrowserRouter>

        <AuthPassPage>

          <Box sx={{ height: "60px", flexShrink: 0 }}>
            <Header />
          </Box>
          
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={ route.element } />
            ))}

            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={ <PrivateRoute> {route.element} </PrivateRoute> } />
            ))}

            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={ <AdminRoute> {route.element} </AdminRoute> } />
            ))}
          </Routes>

        </AuthPassPage>
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
