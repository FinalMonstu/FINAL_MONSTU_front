import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography, TextField, Button, Divider, Stack} from "@mui/material";
import { Formik, Form, Field, ErrorMessage} from "formik";
import CountrySelector from "../../components/selecter/CountrySelector";
import { SignSchema } from "../../hooks/schema/SignSchema";
import { LabelWithInput } from "../../components/input/LabelWithInput";
import { emailAvail, sendEmailCode, signupAPI, verifyEmailCode } from "../../hooks/controller/AuthController";
import { btnBlack, inputStyle } from "../../styles/commonStyle";
import { useNavigate } from "react-router-dom";
import { authPath } from "../../hooks/urlManager";
import { useSnack } from "../../components/popup/MultiSnackBar";

/* 
  역할 : 회원 가입 페이지
  인증 : 모든 사용자 사용가능
*/
export default function SignUpPage () {
  const navigate = useNavigate();
  const showSnack = useSnack();

  const initialValues = useMemo(() => ({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    phoneNumber: "",
    country: "",
  }), []);

  const [verifiCode, setVerifiCode] = useState({ id: null, email: "",code: "" });
  const [checks, setChecks] = useState({ emailCheck: false, codeCheck: false });


  // 이메일 중복 확인
  const emailCheck = useCallback( async (email) => {
    const {success, message} = await emailAvail(email);
    showSnack( (success) ? "info" : "error", message);
    if (success) {
      setChecks(prev => ({ ...prev, emailCheck: true }));
      setVerifiCode(prev => ({ ...prev, email: email.trim() }));
    }
  }, [setChecks,setVerifiCode] );


  // 이메일 인증 코드 전송
  const sendCode = useCallback(async () => {
    if(!checks.emailCheck){
      showSnack("error", "이메일 중복을 확인하세요");
      return;
    };
    const {success, message, data} = await sendEmailCode(verifiCode);
    showSnack( (success) ? "info" : "error", message);
    if (success)  setVerifiCode({ id: data.id, email: data.email, code: '' });
  }, [verifiCode, checks.emailCheck]);


  // 인증 코드 검증
  const verifyCode = useCallback(async () => {
    if(!checks.emailCheck){
      showSnack("error", "이메일 중복을 확인하세요");
      return;
    };
    const {success, message} = await verifyEmailCode(verifiCode);
    showSnack( (success) ? "info" : "error", message);
    if (success) setChecks(prev => ({ ...prev, codeCheck: true }));
  }, [verifiCode, checks.emailCheck]);


  // 회원가입
  const handleSignupAPI = useCallback(async (values) => {
    const {success, message} = await signupAPI(values);
    alert(message);
    if(success) navigate(authPath.login);
  }, []);


  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    if (!checks.codeCheck) {
      showSnack('error', '이메일 인증을 완료해주세요');
      setSubmitting(false);
      return;
    }
    const { success, message } = await signupAPI(values);
    showSnack(success ? 'info' : 'error', message);
    if (success)  navigate(authPath.login, { replace: true });
    setSubmitting(false);
  }, [checks.codeCheck]);



  // Log
  useEffect(()=>{
    // console.log("verifiCode Object:", JSON.stringify(verifiCode, null, 2));
    console.log("checks Object:", JSON.stringify(checks, null, 2));
    // console.log("initialValues Object:", JSON.stringify(initialValues, null, 2));
  },[verifiCode, checks, initialValues])


  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ p: 4, width: '100%', maxWidth: 600 }}>

        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Sign Up
        </Typography>

        <Divider sx={{ mb: 5, borderColor: '#C0C0C0' }} />

        <Formik initialValues={initialValues} validationSchema={SignSchema} onSubmit={handleSubmit}>
          {({ values, touched, errors, setFieldValue, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                
                <LabelWithInput label="ID" sub="(email)">
                  <Stack direction="row" spacing={1}>
                    <Field
                      name="email"
                      as={TextField}
                      placeholder="email@domain.net"
                      fullWidth
                      disabled={checks.emailCheck}
                      sx={{ input: inputStyle }}
                      error={touched.email && Boolean(errors.email)}
                      helperText={<ErrorMessage name="email" />}
                    />
                    <Button sx={btnBlack} disabled={checks.emailCheck} onClick={() => emailCheck(values.email)}>
                      중복확인
                    </Button>
                  </Stack>
                </LabelWithInput>

                <LabelWithInput label="Email Authentication Code">
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      placeholder="인증 코드 입력"
                      disabled={checks.codeCheck}
                      value={verifiCode.code}
                      onChange={e => setVerifiCode(prev => ({ ...prev, code: e.target.value }))}
                      sx={{ input: inputStyle }}
                    />
                    <Button sx={btnBlack} disabled={checks.codeCheck} onClick={sendCode}>
                      인증코드 전송
                    </Button>
                    <Button sx={btnBlack} disabled={checks.codeCheck} onClick={verifyCode}>
                      인증코드 확인
                    </Button>
                  </Stack>
                </LabelWithInput>

                <LabelWithInput label="Password" sub="!@#$%*? 중 하나를 포함해야 합니다">
                  <Field
                    name="password"
                    as={TextField}
                    type="password"
                    fullWidth
                    sx={{ input: inputStyle }}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                  />
                </LabelWithInput>

                <LabelWithInput label="Confirm Password">
                  <Field
                    name="confirmPassword"
                    as={TextField}
                    type="password"
                    fullWidth
                    sx={{ input: inputStyle }}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={<ErrorMessage name="confirmPassword" />}
                  />
                </LabelWithInput>

                <LabelWithInput label="NickName">
                  <Field
                    name="nickName"
                    as={TextField}
                    fullWidth
                    sx={{ input: inputStyle }}
                    error={touched.nickName && Boolean(errors.nickName)}
                    helperText={<ErrorMessage name="nickName" />}
                  />
                </LabelWithInput>

                <LabelWithInput label="Phone Number">
                  <Field
                    name="phoneNumber"
                    as={TextField}
                    placeholder="010-1234-5678"
                    fullWidth
                    sx={{ input: inputStyle }}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={<ErrorMessage name="phoneNumber" />}
                  />
                </LabelWithInput>

                <CountrySelector
                  value={values.country}
                  onChange={newValue => setFieldValue('country', newValue)}
                  allowNone={false}
                />

                <Button type="submit" fullWidth disabled={isSubmitting} sx={{ ...btnBlack, fontSize: 20, height: 45, mt: 2 }}>
                  SIGN UP
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};