import { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Box, TextField, Button, Typography, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LoginSchema } from "../hooks/SignSchema";
import { loginAPI } from "../AuthController";
import { useAuth } from "../hooks/AuthContext";
import { mainPath } from "../../../common/hooks/urlManager";
import AuthLinks from "../components/AuthLinks";
import { useSnack } from "../../../common/components/MultiSnackBar";
import {
    containerSx,
    formBoxSx,
    titleSx,
    subtitleSx,
    stackSx,
    inputRowSx,
    labelSx,
    inputSx,
    loginButtonSx,
    dividerSx
} from '../styles/LoginPageStyles';

/* 
  역할 : 로그인 페이지
  인증 : 모든 사용자 사용가능
  기능 : 로그인 기능
  비고 : 로그인 성공 시 유저 정보 저장
*/
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const showSnack = useSnack();

  // 로그인 API 호출 후 JWT 토큰 저장, 유저정보 저장
  const handleLogin = useCallback(
    async (values, { setSubmitting }) => {
      const result = await loginAPI(values);
      if (result.success) {
        login(result.data);
        navigate(mainPath);
      } else {
        showSnack("error", result.message);
      }
      setSubmitting(false);
    },
    [login]
  );

  return (
    <Box sx={containerSx}>
      <Box sx={formBoxSx}>
        <Typography variant="h3" sx={titleSx}>
          Welcome Back
        </Typography>
        
        <Typography variant="body1" sx={subtitleSx}>
          Sign in to your account to continue
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack sx={stackSx}>

                <Stack sx={inputRowSx}>
                  <Typography variant="body2" sx={labelSx}>
                    Email Address
                  </Typography>

                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    placeholder="Enter your email"
                    sx={inputSx}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
                
                <Stack sx={inputRowSx}>
                  <Typography variant="body2" sx={labelSx}>
                    Password
                  </Typography>

                  <Field
                    name="password"
                    as={TextField}
                    type="password"
                    fullWidth
                    placeholder="Enter your password"
                    sx={inputSx}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Stack>

                <Button 
                  type="submit" 
                  fullWidth 
                  sx={loginButtonSx}
                  variant="contained"
                >
                  LOGIN
                </Button>

              </Stack>
            </Form>
          )}
        </Formik>

        <Divider sx={dividerSx}>
          <Typography variant="body2" sx={{ color: '#718096', px: 2 }}>
            or
          </Typography>
        </Divider>

        {/* 비밀번호 / 아이디 찾기, 회원가입 - 페이지 링크 */}
        <AuthLinks/>

      </Box>
    </Box>
  );
};