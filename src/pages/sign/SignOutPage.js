import React, { useCallback, useState } from 'react';
import { Box, Stack, Button, TextField, Typography, Divider } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/authenticate/AuthContext';
import { useSnack } from '../../components/popup/MultiSnackBar';
import { emailAuthSchema } from '../../hooks/schema/SignSchema';
import { sendEmailCode, verifyEmailCode, signOutAPI } from '../../hooks/controller/AuthController';
import { btnBlack } from '../../styles/commonStyle';
import { mainPath } from '../../hooks/urlManager';

/* 
  역할 : 회원 탈퇴 페이지
  인증 : 인증된 사용자 사용가능
  기능 :
    이메일 인증 코드 전송 기능, 
    이메일 인증 코드 확인 기능,
  비고 : 이메일 인증 후 회원 탈퇴
*/
export default function SignOutPage() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const showSnack = useSnack();

  // 인증 코드
  const [verifiCode, setVerifiCode] = useState({ id: null, email: userInfo.email, code: "" });
  
  // 코드 인증 상태
  const [codeCheck, setCodeCheck] = useState(false);


  // 이메일 인증 코드 전송 - API
  const sendCode = useCallback(async () => {
    const { success, message, data } = await sendEmailCode({ ...verifiCode, email: userInfo.email });
    showSnack(success ? "info" : "error", message);
    // 인증 코드 정보 삽입
    if (success) setVerifiCode({ id: data.id, email: data.email });
  }, [verifiCode]);


  // 인증 코드 검증
  const verifyCode = useCallback(async (code) => {
    const { success, message } = await verifyEmailCode({ ...verifiCode, code });
    showSnack(success ? "info" : "error", message);
    setCodeCheck(success);
  }, [verifiCode] );


  // 회원 탈퇴 API 호출
  const handleSignOut = useCallback( async() => {
    const { success, message } = await signOutAPI();
    if(success) {
      alert(message);
      navigate(mainPath);
    }else{
      showSnack('error', message);
    }
  },[] )


  // 최종 폼 제출 (인증 완료 후 탈퇴 로직)
  const onSubmitForm = useCallback(
    async (values, { setSubmitting }) => {
      if (codeCheck) await handleSignOut();
      else showSnack('error', '인증 코드를 먼저 확인해주세요.');
      setSubmitting(false);
  }, [codeCheck] );


  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
      <Box sx={{ width: 400, p: 4 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Sign Out
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={{ authCode: '' }}
          validationSchema={emailAuthSchema.pick(['authCode'])}
          onSubmit={onSubmitForm}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                {/* 이메일 표시 및 코드 전송 */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    sx={{'& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',}}}
                    value={userInfo.email}
                    disabled
                    fullWidth
                    size="small"
                  />
                  <Button sx={btnBlack} variant="contained" onClick={sendCode}>
                    코드 전송
                  </Button>
                </Stack>

                {/* 인증 코드 입력 및 검증 */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Field
                    name="authCode"
                    as={TextField}
                    placeholder="인증 코드 입력"
                    fullWidth
                    size="small"
                    disabled={codeCheck}
                    error={touched.authCode && Boolean(errors.authCode)}
                    helperText={<ErrorMessage name="authCode" />}
                  />
                  <Button
                    sx={btnBlack}
                    variant="contained"
                    disabled={codeCheck}
                    onClick={() => verifyCode(values.authCode)}
                  >
                    인증
                  </Button>
                </Stack>

                {/* 탈퇴 버튼 */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={btnBlack}
                >
                  계정 탈퇴
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}