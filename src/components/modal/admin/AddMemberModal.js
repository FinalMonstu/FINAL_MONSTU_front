import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Modal,
  Paper,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import MemberRoleSelector from "../../selecter/MemberRoleSelector";
import MemberStatusSelector from "../../selecter/MemberStatusSelector";
import CountrySelect from "../../selecter/CountrySelector";
import { SignSchema } from "../../../hooks/schema/SignSchema";
import { btnBlack } from "../../../styles/commonStyle";
import { signupAPI } from "../../../hooks/controller/AuthController";

export default function AddMemberModal({ modalOpen, setModal }) {
    const initialValues = useMemo(() => ({
        email: "",
        password: "",
        confirmPassword: "",
        nickName: "",
        phoneNumber: "",
        role: "",
        status: "",
        country: "",
    }), []);


    const handleSubmit = useCallback(async (dto) => {
      const result = await signupAPI(dto);
      alert(result?.success ? result?.message : "회원가입에 실패했습니다.");
      if (result?.success) { setModal("add"); }
    }, []);

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModal("add")}
      disableEnforceFocus
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "70vw" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={SignSchema} 
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm}) => (
            <Form style={{ width: "100%", textAlign: "center" }} >
              <Box>
                <TextField
                  name="email"
                  label="Email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="nickName"
                  label="Nick Name"
                  required
                  value={values.nickName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nickName && Boolean(errors.nickName)}
                  helperText={touched.nickName && errors.nickName}
                />
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="010-1234-5678"
                  required
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField
                  name="password"
                  label="password"
                  type="password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  required
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Box>

              <Box>
                <MemberRoleSelector
                  value={values.role}
                  onChange={(v) => setFieldValue("role", v)}
                  allowNone={false}
                />
                <MemberStatusSelector
                  value={values.status}
                  onChange={(v) => setFieldValue("status", v) }
                  allowNone={false}
                />
                <CountrySelect
                  value={values.country}
                  onChange={(v) => setFieldValue("country", v) }
                  allowNone={false}
                />
              </Box>

              <ButtonGroup sx={{ mt: 2 }} fullWidth>
                <Button
                  type="button"
                  sx={{ ...btnBlack, m: 0.5 }}    
                  variant="contained"
                  onClick={ submitForm }
                >
                  Update
                </Button>
                <Button
                  type="button"
                  onClick={() => setModal("add")}
                  sx={{ ...btnBlack, m: 0.5 }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
}
