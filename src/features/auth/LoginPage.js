import { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Box, TextField, Button, Typography, Stack, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LoginSchema } from "./hooks/SignSchema";
import { btnBlack, inputStyle } from "../../common/styles/commonStyle";
import { loginAPI } from "./AuthController";
import { useAuth } from "./hooks/AuthContext";
import { mainPath } from "../../common/hooks/urlManager";
import AuthLinks from "./components/AuthLinks";
import { useSnack } from "../../common/components/MultiSnackBar";

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