import { useCallback, useMemo } from "react";
import { Box,Modal,Paper,Button,ButtonGroup,TextField } from "@mui/material";
import { Formik, Form } from "formik";

import MemberRoleSelector from "../../preset/components/MemberRoleSelector";
import MemberStatusSelector from "../../preset/components/MemberStatusSelector";
import CountrySelect from "../../preset/components/CountrySelector";
import { SignSchema } from "../../auth/hooks/SignSchema";
import { createMemberAPI } from "../AdminController";
import {
  modalSx,
  paperSx,
  formSx,
  inputBoxSx,
  textFieldSx,
  selectorBoxSx,
  buttonGroupSx,
  addBtnSx,
  cancelBtnSx
} from '../styles/AddMemberModalStyles';

/* 
  역할 : 멤버 추가
  인증 : ADMIN만 사용가능
  기능 : 유저 정보 입력/저장
  비고 : 회원가입 기능과의 차이점 -> Role, Status 속성을 프론트에서 바로 추가 가능
*/
export default function AddMemberModal({ modalOpen, toggleModal, onSuccess}) {
  const initialValues = useMemo(() => ({
      email: "",
      password: "",
      confirmPassword: "",  // 비밀번호 재확인 입력값값
      nickName: "",
      phoneNumber: "",
      role: "",
      status: "",
      country: "",
  }), []);


  // 회원가입 API
  const handleSubmit = useCallback(async (dto) => {
    const {success,message} = await createMemberAPI(dto);
    alert(message);

    if (success) { 
      onSuccess();
      toggleModal("add"); 
    }
  }, []);

  return (
    <Modal
      open={modalOpen}
      onClose={() => toggleModal("add")}
      disableEnforceFocus
      sx={modalSx}
    >
      <Paper
        component="div"
        sx={paperSx}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={SignSchema} 
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, submitForm}) => (
            <Form style={formSx}>
              <Box sx={inputBoxSx}>
                <TextField
                  name="email"
                  label="Email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={textFieldSx}
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
                  sx={textFieldSx}
                />
              </Box>
              <Box sx={inputBoxSx}>
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
                  sx={textFieldSx}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={textFieldSx}
                />
              </Box>
              <Box sx={inputBoxSx}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={textFieldSx}
                />
              </Box>
              <Box sx={selectorBoxSx}>
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
              <Box sx={buttonGroupSx}>
                <Button
                  type="button"
                  sx={addBtnSx}
                  variant="contained"
                  onClick={ submitForm }
                >
                  Add
                </Button>
                <Button
                  type="button"
                  onClick={() => toggleModal("add")}
                  sx={cancelBtnSx}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
}
