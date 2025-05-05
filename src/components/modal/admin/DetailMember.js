import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { SignSchema, UpdateSchema } from "../../../hooks/schema/SignSchema";
import { btnBlack } from "../../../styles/commonStyle";
import { signupAPI } from "../../../hooks/controller/AuthController";
import { getMemberAPI } from "../../../hooks/controller/MemberController";

export default function DetailMember({ memberId, setter }){

    const [memberInfo,setMemberInfo] = useState(null)

    const initialValues = useMemo(() => ({
    email:       memberInfo?.email       || "",
    nickName:    memberInfo?.nickName    || "",
    phoneNumber: memberInfo?.phoneNumber || "",
    role:        memberInfo?.role        || "",
    status:      memberInfo?.status      || "",
    country:     memberInfo?.countryCode || "",
    password:        "",
    confirmPassword: ""
  }), [memberInfo]);


    const handleSubmit = useCallback(async (dto) => {
        const result = await signupAPI(dto);
        alert(result?.success ? result?.message : "수정에 실패했습니다.");
    }, []);

    const fetch = useCallback(async (id) => {
        const result = await getMemberAPI(id);
        if(result.success) setMemberInfo(result.data);
    }, []);

    useEffect(()=>{
        console.log("asdasdasd  :  "+memberId)
        if(memberId) fetch(memberId);
    },[memberId])

    useEffect(()=>{
        console.log("memberInfo.data:", JSON.stringify(memberInfo, null, 2));
    },[memberInfo])

    return (
        <Modal
            open={memberId!=null}
            onClose={() => setter(null)}
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
                validationSchema={UpdateSchema} 
                enableReinitialize={true}
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
                    {/* <TextField
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
                    /> */}
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
                        onClick={() => setter(null)}
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