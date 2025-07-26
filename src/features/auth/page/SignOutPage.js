import { useCallback, useState } from 'react';
import { Box, Stack, Button, TextField, Typography, Divider, Paper } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Warning, Email, Security } from '@mui/icons-material';

import { useAuth } from '../hooks/AuthContext';
import { useSnack } from '../../../common/components/MultiSnackBar';
import { emailAuthSchema } from '../hooks/SignSchema';
import { sendEmailCode, verifyEmailCode, signOutAPI } from '../AuthController';
import { mainPath } from '../../../common/hooks/urlManager';
import {
    containerSx,
    paperSx,
    headerBoxSx,
    warningHeaderSx,
    warningIconSx,
    titleSx,
    subtitleSx,
    warningMessageSx,
    stackSx,
    infoCardSx,
    iconSx,
    infoBoxSx,
    infoLabelSx,
    infoValueSx,
    actionButtonSx,
    verifyButtonSx,
    inputFieldSx,
    deleteButtonSx
} from '../styles/SignOutPageStyles';

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
    <Box sx={containerSx}>
      <Paper sx={paperSx}>
        
        {/* 헤더 섹션 */}
        <Box sx={headerBoxSx}>
          <Box sx={warningHeaderSx}>
            <Warning sx={warningIconSx} />
            <Typography variant="h4" sx={titleSx}>
              회원 탈퇴
            </Typography>
          </Box>
          <Typography variant="body2" sx={subtitleSx}>
            00시 전까지 취소 할 수 있습니다
          </Typography>
          <Typography variant="caption" sx={warningMessageSx}>
            ⚠️ 모든 데이터가 영구적으로 삭제됩니다
          </Typography>
        </Box>

        <Formik
          initialValues={{ authCode: '' }}
          validationSchema={emailAuthSchema.pick(['authCode'])}
          onSubmit={onSubmitForm}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <Stack sx={stackSx}>
                
                {/* 이메일 표시 및 코드 전송 */}
                <Box sx={infoCardSx}>
                  <Email sx={iconSx} />
                  <Box sx={infoBoxSx}>
                    <Typography variant="caption" sx={infoLabelSx}>
                      이메일 주소
                    </Typography>
                    <Typography variant="body1" sx={infoValueSx}>
                      {userInfo.email}
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={sendCode}
                    sx={actionButtonSx}
                  >
                    코드 전송
                  </Button>
                </Box>

                {/* 인증 코드 입력 및 검증 */}
                <Box sx={infoCardSx}>
                  <Security sx={iconSx} />
                  <Box sx={infoBoxSx}>
                    <Typography variant="caption" sx={infoLabelSx}>
                      인증 코드
                    </Typography>
                    <Field
                      name="authCode"
                      as={TextField}
                      placeholder="인증 코드를 입력하세요"
                      fullWidth
                      size="small"
                      disabled={codeCheck}
                      error={touched.authCode && Boolean(errors.authCode)}
                      helperText={<ErrorMessage name="authCode" />}
                      sx={inputFieldSx}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    disabled={codeCheck}
                    onClick={() => verifyCode(values.authCode)}
                    sx={verifyButtonSx}
                  >
                    인증
                  </Button>
                </Box>

                {/* 탈퇴 버튼 */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={deleteButtonSx}
                >
                  계정 탈퇴
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}