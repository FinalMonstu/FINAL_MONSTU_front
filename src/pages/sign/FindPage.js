import { useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Divider, Tab, Tabs, Typography } from '@mui/material';
import { useSnack } from '../../components/popup/MultiSnackBar';
import { findIdAPI, sendEmailCode, verifyEmailCode } from '../../hooks/controller/AuthController';
import ResetPwBox from '../../components/box/ResetPwBox';
import FindIdBox from '../../components/box/FindIdBox';
import { emailAuthSchema, findEmailSchema } from '../../hooks/schema/SignSchema';
import { useNavigate } from 'react-router-dom';
import { authPath } from '../../hooks/urlManager';

/* 
  역할 : 비밀번호/아이디(이메일) 찾기 페이지
  인증 : 모든 사용자 사용가능
  기능 : Tab 패턴, 비밀번호 찾기 또는 아이디(이메일) 찾기 컴포넌트로 이동
*/
export default function FindPage() {
  const navigate = useNavigate();
  const showSnack = useSnack();

  // 탭 상태: 0 => 비밀번호 찾기, 1 => ID(이메일) 찾기
  const [tabValue, setTabValue] = useState(0);

  // 인증 코드
  const [verifiCode, setVerifiCode] = useState({ id: null, email: "",code: "" });

  // 코드 인증 상태
  const [codeCheck, setCodeCheck] = useState(false);


  const handleTabChange = (e, newValue) => { setTabValue(newValue); };


  // 이메일 인증 코드 전송 - API
  const sendCode = useCallback( async (email) => {
    const { success, message, data } = await sendEmailCode({ ...verifiCode, email });
    showSnack( (success) ? "info" : "error", message);
    // 인증 코드 정보 삽입
    if (success)  setVerifiCode({ id: data.id, email: data.email });
  },[verifiCode, setVerifiCode]);


  // ID 찾기 -> 전화번호, 닉네임을 사용해서 ID찾기
  const findId = useCallback( async (phoneNumber,nickName) => {
      const { success, message, data } = await findIdAPI({ phoneNumber, nickName });
      (success) 
        ? navigate(authPath.foundEmail, { state: { email: data } })
        : showSnack("error", message);
  },[] );


  // 인증 코드 검증 로직
  const verifyCode = useCallback( async (email, code) => {
      const { success, message } = await verifyEmailCode({ ...verifiCode, email, code });
      showSnack( success ? "info" : "error", message);
      setCodeCheck(success);
  } ,[verifiCode] );

  const initialValues = tabValue === 0 ? { email: "", authCode: "" } : { phoneNumber: "", nickName: "" };
  const validationSchema = (tabValue === 0) ? emailAuthSchema : findEmailSchema


  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      if (tabValue === 0) {
        // Reset Password 처리 로직
        (codeCheck) 
          ? navigate(authPath.resetPw, { state: { email: verifiCode.email } })
          : showSnack("error", "입력이 올바르지 않습니다");
      } else {
        // Find ID 처리 로직
        await findId(values.phoneNumber, values.nickName);
      }
      setSubmitting(false);
    },
    [tabValue,codeCheck,verifiCode.email,findId]
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#fff',
      }}
    >
      <Box sx={{ width: 400, p: 4, border: '1px solid #ccc', borderRadius: 2, textAlign: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered textColor="inherit" sx={{ mb: 2 }}>
          {['Reset password', 'Find ID(email)'].map(label => (
            <Tab
              key={label}
              label={
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                  {label}
                </Typography>
              }
            />
          ))}
        </Tabs>

        <Divider sx={{ mb: 4 }} />

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
          {formik => (
            <Form>
              {tabValue === 0 ? (
                <ResetPwBox formik={formik} sendCode={sendCode} verifyCode={verifyCode} />
              ) : (
                <FindIdBox formik={formik} />
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' }, mt: 2 }}
                fullWidth
              >
                {tabValue === 0 ? 'Reset my Password' : 'Find my ID'}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}