import { Stack, Button, TextField } from '@mui/material';
import { Field } from 'formik';

/* 
  역할 : Find 페이지 -> 회원 비밀번호 재설정 박스
  인증 : 모든 이용자 사용가능
  기능 : 입력한 이메일, 인증 코드 정보 초기화 / 버튼을 통한 함수 실행
*/
const ResetPwBox = ({ formik: { touched, errors, values }, sendCode, verifyCode }) => {
  return (
    <Stack spacing={2}>
      {/* 이메일 입력 및 인증 코드 전송 */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Field
          name="email"
          as={TextField}
          placeholder="email@domain.com"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' }, minWidth: 125 }}
          type="button"
          onClick={() => sendCode(values.email)}
        >
          인증 코드 전송
        </Button>
      </Stack>

      {/* 인증 코드 입력 및 검증 */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Field
          name="authCode"
          as={TextField}
          placeholder="Enter auth code"
          error={touched.authCode && Boolean(errors.authCode)}
          helperText={touched.authCode && errors.authCode}
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
          type="button"
          onClick={() => verifyCode(values.email, values.authCode)}
        >
          인증
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResetPwBox;
