import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import PostPage from './pages/PostPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import { Box } from '@mui/material';
import PrivateRoute from './components/authenticate/PrivateRoute';
import {AuthProvider} from './components/authenticate/AuthContext'
import FindPage from './pages/FindPage';
import ResetPwPage from './pages/ResetPwPage';

function App() {
  const publicRoutes = [
    { path: "/", element: <Main /> }, /* 메인 페이지 */
    { path: "/*", element: <div>존재하지 않는 페이지</div> },/* 존재하지 않는 페이지 */

    { path: "/login", element: <LoginPage /> },/* 로그인 페이지 */
    { path: "/signup", element: <SignUpPage /> }, /* 회원가입 페이지 */
    { path: "/find", element: <FindPage /> }, /* ID,Password 찾기 페이지 */
    { path: "/pw/reset", element: <ResetPwPage /> }, /* Password 재설정 페이지 */

    { path: "/post", element: <PostPage /> }, /* 번역 페이지 */

  ];

  const privateRoutes = [
    // { path: "/logout", element: <LogoutPage /> },
  ];

  return (
    <AuthProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
