import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Divider, Stack} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Formik, Form, Field, useFormik } from "formik";
import CountrySelect from "../components/selecter/CountrySelect";
import { SignUpSchema } from "../hooks/schema/SignUpSchema";
import { LabelWithInput } from "../components/input/LabelWithInput";
import MultiSnackBar from "../components/popup/MultiSnackBar";
import { emailAvail, sendEmailCode, signup, verifyEmailCode } from "../hooks/controller/AuthController";

// 공통 스타일
const inputStyle = {
  fontSize: "16px",
  height: "5px"
};

const btnBlack = {
  backgroundColor: "black",
  color: "white",
  minWidth: "70px",
  textTransform: "none",
  height: "38px"
};


const SignUpPage = () => {
  const initialValues = {
      email: "",
      password: "",
      confirmPassword: "",
      nickName: "",
      phoneNumber: "",
      country: "",
  }

  const [verifiCode,setVerifiCode] = useState({
    id : null,
    email : "",
    code : "",
  })

  const [snackBar,setSnackBar] = useState({
      msg : "",
      option : "error",
  })

  const [option,setOption] = useState({
    emailCheck : false,
    codeCheck : false,
  })


  const updateVerifiCode = (field, value) => setVerifiCode(prev => ({ ...prev, [field]: value }));
  const updateSnackBar = (field, value) => setSnackBar(prev => ({ ...prev, [field]: value }));
  const updateOption = (field, value) => setOption(prev => ({ ...prev, [field]: value }));


  // 이메일 중복 확인
  const emailCheckAPI = async (email) => {
    if (!email || !email.trim()) {updateSnackBar("option","error"); updateSnackBar("msg", "이메일을 입력해주세요"); return;}  
    const result = await emailAvail(email);
    updateSnackBar("option", (result?.success) ? "info" : "error" )
    if (result?.success) {  // 중복 없음
        updateOption("emailCheck", true);
        updateVerifiCode("email", email.trim());
    }
    updateSnackBar("msg", result?.message);
  };

  // 이메일 인증 코드 전송
  const sendEmailCodeAPI = async () => {
    if(!verifiCode.email) {updateSnackBar("option","error"); updateSnackBar("msg","이메일 확인해주세요"); return;}
    const result = await sendEmailCode(verifiCode);
    console.log("result Object:", JSON.stringify(result, null, 2));
    updateVerifiCode("id",result.data.id);
    updateVerifiCode("email",result.data.email);
    updateSnackBar("option", (result?.success) ? "info" : "error" )
    updateSnackBar("msg",result?.message);  
  } 

  // 인증 코드 검증
  const verifyCodeAPI = async () => {
    if(!verifiCode.email) {updateSnackBar("option","error"); updateSnackBar("msg","이메일 확인해주세요"); return;}
    const result = await verifyEmailCode(verifiCode);
    updateSnackBar("option", (result?.success) ? "info" : "error" )
    if(result?.success) updateOption("codeCheck",true);
    updateSnackBar("msg",result?.message);  
  } 

  // 회원가입입
  const signupAPI = async (values) => {
    const result = await signup(values);
    alert(result?.success ? result?.message : "회원가입에 실패했습니다.");
  };

  // Log
  useEffect(()=>{
    console.log("verifiCode Object:", JSON.stringify(verifiCode, null, 2));
    // console.log("option Object:", JSON.stringify(option, null, 2));
    console.log("initialValues Object:", JSON.stringify(initialValues, null, 2));
  },[option,initialValues])


  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Sign Up
        </Typography>

        <Divider sx={{ mb: 5, borderColor: "#C0C0C0" }} />

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values) => { signupAPI(values) }}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, validateForm, submitForm}) => (
            <Form>
              <Stack spacing={2}>
                {/* Email */}
                <LabelWithInput label="ID" sub="(email)">
                  <Stack direction="row" spacing={1}>
                    <TextField
                      name="email"
                      placeholder="email@domain.net"
                      fullWidth
                      disabled={option.emailCheck} 
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}    //Input 밑에 작은 메세지지
                      sx={{ input: inputStyle }}
                    />
                    <Button sx={btnBlack} 
                      variant="contained" 
                      disabled={option.emailCheck} 
                      onClick={() => emailCheckAPI(values.email)} > 
                        Check
                    </Button>
                  </Stack>
                </LabelWithInput>

                {/* Email 인증코드 */}
                <LabelWithInput label="Email Authentication Code">
                  <Stack direction="row" spacing={1} >
                    <TextField fullWidth 
                      sx={{ input: inputStyle }}
                      disabled={option.codeCheck} 
                      value={verifiCode.code}
                      onChange={(e) => updateVerifiCode("code", e.target.value)}
                      onBlur={handleBlur}
                    />
                    <Button sx={btnBlack} variant="contained" disabled={option.codeCheck} onClick={()=>sendEmailCodeAPI()}>Send</Button>
                    <Button sx={btnBlack} variant="contained" disabled={option.codeCheck} onClick={()=>verifyCodeAPI()}>Check</Button>
                  </Stack>
                </LabelWithInput>

                {/* Password */}
                <LabelWithInput label="Password" sub="!@#$%*?중 하나를 포함해야 합니다">
                  <TextField
                    name="password"
                    type="password"
                    fullWidth
                    value={values.password}
                    onChange={(handleChange)}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ input: inputStyle }}
                  />
                </LabelWithInput>

                {/* Confirm Password */}
                <LabelWithInput label="Confirm Password">
                  <Stack direction="row" spacing={1}>
                    <TextField
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      sx={{ input: inputStyle }}
                    />
                  </Stack>
                </LabelWithInput>

                {/* NickName */}
                <LabelWithInput label="NickName">
                  <TextField
                    name="nickName"
                    fullWidth
                    value={values.nickName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nickName && Boolean(errors.nickName)}
                    helperText={touched.nickName && errors.nickName}
                    sx={{ input: inputStyle }}
                  />
                </LabelWithInput>

                {/* Phone Number */}
                <LabelWithInput label="Phone Number">
                  <TextField
                    name="phoneNumber"
                    fullWidth
                    placeholder="010-1234-5678"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ input: inputStyle }}
                  />
                </LabelWithInput>

                {/* Country */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6">Country</Typography>
                  <CountrySelect
                    dto={values}
                    setter={(field, val) => setFieldValue("country", val)}
                  />
                </Stack>
                {touched.country && errors.country && (
                  <Typography color="error" fontSize="14px" ml={1}>
                    {errors.country}
                  </Typography>
                )}

                {/* Signup Button */}
                <Button
                  variant="contained"
                  sx={{ ...btnBlack, fontSize: "20px", height: "45px", mt: 2 }}
                  onClick={async (e) => {
                    const formErrors = await validateForm();  // Formik의 validateForm을 호출하여 현재 폼의 에러들을 가져옵니다.
                    if (Object.keys(formErrors).length > 0) {
                      updateSnackBar("option", "error");
                      updateSnackBar("msg", "회원가입 조건을 확인해주세요.");
                      return;
                    }
                    // 에러가 없다면 정상 제출합니다.
                    submitForm();
                  }}
                >
                  SIGN UP
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
        {/* PopupBox */}
        <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar}/>
    </Box>
  );
};

export default SignUpPage;
