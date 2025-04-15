import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import MultiSnackBar from "../components/popup/MultiSnackBar";
import { sendEmailCode, verifyEmailCode } from "../hooks/controller/AuthController";
import ResetPwBox from "../components/box/ResetPwBox";
import FindIdBox from "../components/box/FindIdBox";
import { findEmailSchema, resetPwSchema } from "../hooks/schema/SignSchema";
import { useNavigate } from "react-router-dom";

function FindPage() {
  // 탭 상태: 0 => 비밀번호 찾기, 1 => ID(이메일) 찾기
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const [snackBar, setSnackBar] = useState({ msg: "", option: "error" });
  const [verifiCode, setVerifiCode] = useState({
    id: null,
    email: "",
    code: "",
  });
  const [codeCheck, setCodeCheck] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateVerifiCode = useCallback(
    (field, value) => {
      setVerifiCode((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateSnackBar = useCallback(
    (field, value) => setSnackBar((prev) => ({ ...prev, [field]: value })),
    []
  );

  // 이메일 인증 코드 전송 로직 (필요 시 email 값을 인자로 전달)
  const sendEmailCodeAPI = useCallback(
    async (email) => {
      if (!email) {
        updateSnackBar("option", "error");
        updateSnackBar("msg", "이메일을 확인해주세요");
        return;
      }
      const result = await sendEmailCode({ ...verifiCode, email });
      if (result?.success) {
        updateVerifiCode("id", result.data.id);
        updateVerifiCode("email", result.data.email);
      }
      updateSnackBar("option", result?.success ? "info" : "error");
      updateSnackBar("msg", result?.message);
    },
    [verifiCode, updateSnackBar, updateVerifiCode]
  );

  // 인증 코드 검증 로직
  const verifyCodeAPI = useCallback(
    async (email, code) => {
      if (!email) {
        updateSnackBar("option", "error");
        updateSnackBar("msg", "이메일을 확인해주세요");
        return;
      }
      const result = await verifyEmailCode({ ...verifiCode, email, code });
      if(result?.success) setCodeCheck(true);
      updateSnackBar("option", result?.success ? "info" : "error");
      updateSnackBar("msg", result?.message);
    },
    [verifiCode, updateSnackBar]
  );

  const initialValues = tabValue === 0 ? { email: "", authCode: "" } : { phoneNumber: "", nickName: "" };
  const validationSchema = (tabValue === 0) ? resetPwSchema : findEmailSchema

  const onSubmitForm = useCallback(
    (values, { setSubmitting }) => {
      console.log("Form Submit:", values);
      if (tabValue === 0) { // Reset Password 처리 로직
        console.log("codeCheck: "+codeCheck);
        if(codeCheck) {
            navigate("/pw/reset", { state: { email: verifiCode.email } });
        }else{
            updateSnackBar("option", "error");
            updateSnackBar("msg", "인증 코드를 확인해주세요");
        }
      } else {  // Find ID 처리 로직
        
      }
      setSubmitting(false);
    },
    [tabValue]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
      }}
    >
      {/* 전체 컨테이너 */}
      <Box
        sx={{
          width: 400,
          padding: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {/* 탭 영역 */}
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            textColor="inherit"
          >
            <Tab
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  Reset password
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  Find ID(email)
                </Typography>
              }
            />
          </Tabs>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* 폼 전체를 부모에서 관리 */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitForm}
          enableReinitialize
        >
          {(formikProps) => (
            <Form>
              {tabValue === 0 ? (
                <ResetPwBox
                  formik={formikProps}
                  sendEmailCodeAPI={sendEmailCodeAPI}
                  verifyCodeAPI={verifyCodeAPI}
                />
              ) : (
                <FindIdBox formik={formikProps} />
              )}

              {/* 공통 제출 버튼 */}
              <Button
                type="submit"
                variant="contained"
                disabled={formikProps.isSubmitting}
                sx={{
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "#333" },
                  mt: 2,
                }}
                fullWidth
              >
                {tabValue === 0 ? "Reset my Password" : "Find my ID"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      {/* PopupBox */}
      <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar} />
    </Box>
  );
}

export default FindPage;
