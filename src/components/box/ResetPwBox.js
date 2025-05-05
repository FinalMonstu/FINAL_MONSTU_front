import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

const ResetPwBox = ({ formik, sendEmailCodeAPI, verifyCodeAPI }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  return (
    <Box>
      <Stack spacing={2}>
        {/* 이메일 및 인증 코드 전송 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            name="email"
            placeholder="email@domain.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
              minWidth : 125,
            }}
            type="button"
            onClick={() => sendEmailCodeAPI(values.email)}
          >
            인증 코드 전송
          </Button>
        </Stack>

        {/* 인증 코드 검증 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            name="authCode"
            placeholder="Enter auth code"
            value={values.authCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.authCode && Boolean(errors.authCode)}
            helperText={touched.authCode && errors.authCode}
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
            type="button"
            onClick={() => verifyCodeAPI(values.email, values.authCode)}
          >
            인증
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ResetPwBox;
