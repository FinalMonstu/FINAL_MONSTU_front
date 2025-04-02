import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  const [publicRoutes, setPublicRoutes] = useState([
    { path: "/", element: <Main /> }, /* 메인 페이지 */
    // { path: "/login", element: <LoginPage /> },/* 로그인 페이지 */
    // { path: "/login/signup", element: <SignUpPage /> }, /* 회원가입 페이지 */

    // { path: "/*", element: <div>존재하지 않는 페이지</div> },/* 존재하지 않는 페이지 */
  ]);

  const [privateRoutes, setPrivateRoutes] = useState([
    // { path: "/logout", element: <LogoutPage /> },
  ]);

  return (
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={ route.element } />
          ))}

          {/* {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={ <PrivateRoute> {route.element} </PrivateRoute> } />
          ))} */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
