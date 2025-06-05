import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import PostPage from './pages/PostPage';
import SignUpPage from './pages/sign/SignUpPage';
import LoginPage from './pages/sign/LoginPage';
import { Box } from '@mui/material';
import PrivateRoute from './components/authenticate/PrivateRoute';
import {AuthProvider} from './components/authenticate/AuthContext'
import FindPage from './pages/sign/FindPage';
import ResetPwPage from './pages/sign/ResetPwPage';
import FindIdPage from './pages/sign/FindIdPage';
import SignOutPage from './pages/sign/SignOutPage';
import MyPage from './pages/myPage/MyPage';
import { adminPath, authPath, mainPath, myPath, postPath, } from './hooks/urlManager';
import AdminPage from './pages/admin/AdminPage';
import AdminRoute from './components/authenticate/AdminRoute';
import Header from './components/Header';
import AuthPassPage from './pages/AuthPassPage';

function App() {

  const publicRoutes = [
    { path: mainPath, element: <Main /> }, /* 메인 페이지 */

    { path: authPath.login, element: <LoginPage /> },/* 로그인 페이지 */
    { path: authPath.signup, element: <SignUpPage /> }, /* 회원가입 페이지 */
    { path: authPath.find, element: <FindPage /> }, /* ID,Password 찾기 페이지 */
    { path: authPath.resetPw, element: <ResetPwPage /> }, /* Password 재설정 페이지 */
    { path: authPath.foundEmail, element: <FindIdPage /> }, /* 찾은 ID 확인 페이지 */

    { path: postPath.post, element: <PostPage /> }, /* 번역 페이지 */

    { path: "/*", element: <div>존재하지 않는 페이지</div> },/* 존재하지 않는 페이지 */
  ];

  const privateRoutes = [
    { path: authPath.signout, element: <SignOutPage /> }, /* 회원 탈퇴 페이지 */

    { path: myPath.my, element: <MyPage /> }, /* 마이 페이지 페이지 */
  ];

  const adminRoutes = [
    { path: adminPath.admin, element: <AdminPage /> }, /* 어드민 페이지 */
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
