import React from 'react';
import { Stack, TextField } from '@mui/material';
import { Field } from 'formik';

/* 
  역할 : Find 페이지 -> 회원 아이디(이메일) 찾기 박스
  인증 : 모든 이용자 사용가능
  기능 : 입력한 전화번호 & 닉네임 정보 초기화
*/
export default function FindIdBox({ formik: { touched, errors } }) {
  return (
    <Stack spacing={2}>
      <Field
        name="phoneNumber"
        as={TextField}
        placeholder="000-0000-0000"
        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
        helperText={touched.phoneNumber && errors.phoneNumber}
        fullWidth
        size="small"
      />

      <Field
        name="nickName"
        as={TextField}
        placeholder="Enter nickname"
        error={touched.nickName && Boolean(errors.nickName)}
        helperText={touched.nickName && errors.nickName}
        fullWidth
        size="small"
      />
    </Stack>
  );
}
