import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { Box, TextField, Button, Typography, Paper, Stack, Divider } from "@mui/material";
import { LoginSchema } from "../../hooks/schema/SignSchema";
import { LabelWithInput } from "../../components/input/LabelWithInput";
import { btnBlack, inputStyle } from "../../styles/commonStyle";
import { loginAPI } from "../../hooks/controller/AuthController";
import MultiSnackBar from "../../components/popup/MultiSnackBar";
import { useAuth } from "../../components/authenticate/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const initialLogin = useMemo(() => ({ email: "", password: "" }), []);
  const [snackBar, setSnackBar] = useState({ msg: "", option: "error" });

  const updateSnackBar = useCallback((field, value) => { setSnackBar((prev) => ({ ...prev, [field]: value })); }, []);

  // 로그인 API 호출 후 JWT 토큰 저장
  const handleLoginAPI = useCallback(
    async (values) => {
      const result = await loginAPI(values);
      if (result.success) {
        console.log("MemberInfo : ", JSON.stringify(result.data, null, 2));
        login(result.data);
        navigate("/");
      } else {
        updateSnackBar("option", "error");
        updateSnackBar("msg", result.message);
      }
    },
    [login, updateSnackBar, navigate]
  );

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ padding: 4, width: 400,}}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Login
        </Typography>
        <Divider sx={{ mb: 5, borderColor: "#C0C0C0" }} />

        <Formik initialValues={initialLogin} validationSchema={LoginSchema} onSubmit={handleLoginAPI}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Stack spacing={2}>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h5" sx={{  whiteSpace: "nowrap" }}>
                    ID (email)
                  </Typography>
                  <TextField
                    name="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ input: inputStyle }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5" sx={{  whiteSpace: "nowrap" }}>
                      Password
                    </Typography>
                    <TextField
                      name="password"
                      type="password"
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{ input: inputStyle }}
                    />
                </Stack>

                <Button sx={btnBlack} type="submit" variant="contained" color="primary" fullWidth>
                  LOGIN
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar} />
    </Box>
  );
};

export default LoginForm;
