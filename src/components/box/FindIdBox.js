import React from "react";
import { Box, Stack, TextField } from "@mui/material";

const FindIdBox = ({ formik }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  return (
    <Box>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            name="phoneNumber"
            placeholder="000-0000-0000"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            fullWidth
            size="small"
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            name="nickName"
            placeholder="Enter nickname"
            value={values.nickName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nickName && Boolean(errors.nickName)}
            helperText={touched.nickName && errors.nickName}
            fullWidth
            size="small"
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default FindIdBox;
