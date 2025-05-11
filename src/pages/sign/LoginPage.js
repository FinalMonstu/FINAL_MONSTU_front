import React, { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Box, TextField, Button, Typography, Stack, Divider } from "@mui/material";
import { LoginSchema } from "../../hooks/schema/SignSchema";
import { btnBlack, inputStyle } from "../../styles/commonStyle";
import { loginAPI } from "../../hooks/controller/AuthController";
import { useSnack } from "../../components/popup/MultiSnackBar";
import { useAuth } from "../../components/authenticate/AuthContext";
import { useNavigate } from "react-router-dom";
import { authPath, mainPath } from "../../hooks/urlManager";
import AuthLinks from "../../components/links/AuthLinks";

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
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: 400, p: 4 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        <Divider sx={{ mb: 4, borderColor: '#C0C0C0' }} />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack spacing={3}>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h5" sx={{  whiteSpace: "nowrap" }}>
                    ID (email)
                  </Typography>

                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    size="small"
                    sx={{ input: inputStyle }}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Stack>
                
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h5" sx={{  whiteSpace: "nowrap" }}>
                    Password
                  </Typography>

                  <Field
                    name="password"
                    as={TextField}
                    type="password"
                    fullWidth
                    size="small"
                    sx={{ input: inputStyle }}
                    error={touched.password && Boolean(errors.password)}
                  />
                </Stack>

                <Button type="submit" fullWidth sx={btnBlack} variant="contained">
                  LOGIN
                </Button>

              </Stack>
            </Form>
          )}
        </Formik>

        {/* 비밀번호 / 아이디 찾기, 회원가입 - 페이지 링크 */}
        <AuthLinks/>

      </Box>
    </Box>
  );
};