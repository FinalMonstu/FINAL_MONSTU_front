import React, { useCallback, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import { emailAuthSchema } from "../../hooks/schema/SignSchema";
import { sendEmailCode, signOutAPI, verifyEmailCode } from "../../hooks/controller/AuthController";
import { useNavigate } from "react-router-dom";
import { btnBlack } from "../../styles/commonStyle";
import MultiSnackBar from "../../components/popup/MultiSnackBar";
import { useAuth } from "../../components/authenticate/AuthContext";

function SignOutPage() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [verifiCode, setVerifiCode] = useState({
    id: null,
    email: "",
    code: "",
  });
  const [codeCheck, setCodeCheck] = useState(false);
  const [snackBar, setSnackBar] = useState({ msg: "", option: "error" });

  const updateSnackBar = useCallback(
    (field, value) => setSnackBar((prev) => ({ ...prev, [field]: value })),
    []
  );
  const updateVerifiCode = useCallback(
    (field, value) => setVerifiCode((prev) => ({ ...prev, [field]: value })),
    []
  );

  // 이메일 인증 코드 전송
  const sendEmailCodeAPI = useCallback(async () => {
    const result = await sendEmailCode({ ...verifiCode, email: userInfo.email });
    if (result?.success) {
      updateVerifiCode("id", result.data.id);
      updateVerifiCode("email", result.data.email);
    }
    updateSnackBar("option", result?.success ? "info" : "error");
    updateSnackBar("msg", result?.message);
  }, [verifiCode, userInfo.email, updateVerifiCode, updateSnackBar]);

  // 인증 코드 검증
  const verifyCodeAPI = useCallback(
    async (code) => {
      const result = await verifyEmailCode({
        ...verifiCode,
        email: userInfo.email,
        code,
      });
      if (result?.success) {
        setCodeCheck(true);
      }
      updateSnackBar("option", result?.success ? "info" : "error");
      updateSnackBar("msg", result?.message);
    },
    [verifiCode, userInfo.email, updateSnackBar]
  );

  // 회원 탈퇴 API 호출
  const signOut = useCallback(
    async() => {
        const result = await signOutAPI();
        alert(result?.message);
        if(result?.success) {navigate("/");}
    }
  )


  // 최종 폼 제출 (인증 완료 후 탈퇴 로직)
  const onSubmitForm = useCallback(
    async (_, { setSubmitting }) => {
      setSubmitting(true);
      if (codeCheck) {
        signOut();
      } else {
        alert("인증 코드를 먼저 확인해주세요.");
      }
      setSubmitting(false);
    },
    [codeCheck, verifiCode.id, userInfo.email, navigate]
  );

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: 400 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Sign Out
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={{ authCode: "" }}
          validationSchema={emailAuthSchema.pick(["authCode"])}
          onSubmit={onSubmitForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <Stack spacing={2}>
                {/* 이메일 (읽기전용) + 코드 전송 */}
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <TextField
                    value={userInfo.email}
                    disabled
                    fullWidth
                    size="small"
                  />
                  <Button
                    variant="contained"
                    sx={{ ...btnBlack, minWidth: 100 }}
                    onClick={sendEmailCodeAPI}
                  >
                    코드 전송
                  </Button>
                </Stack>

                {/* 인증 코드 입력 및 검증 */}
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <TextField
                    name="authCode"
                    placeholder="인증 코드 입력"
                    value={values.authCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(touched.authCode && errors.authCode)}
                    helperText={touched.authCode && errors.authCode}
                    disabled={codeCheck}
                    fullWidth
                    size="small"
                  />
                  <Button
                    sx={{ ...btnBlack }}
                    variant="contained"
                    disabled={codeCheck}
                    onClick={() => verifyCodeAPI(values.authCode)}
                  >
                    인증
                  </Button>
                </Stack>

                {/* 최종 탈퇴 버튼 */}
                <Button
                  sx={{ ...btnBlack }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  계정 탈퇴
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>

      <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar} />
    </Box>
  );
}

export default SignOutPage;
