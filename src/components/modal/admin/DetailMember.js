import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Modal, Paper, Button, ButtonGroup, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import MemberRoleSelector from "../../selecter/MemberRoleSelector";
import MemberStatusSelector from "../../selecter/MemberStatusSelector";
import CountrySelect from "../../selecter/CountrySelector";
import { UpdateSchema } from "../../../hooks/schema/SignSchema";
import { btnBlack } from "../../../styles/commonStyle";
import { getMemberAPI, updateMemberAPI } from "../../../hooks/controller/AdminController";
import { useSnack } from "../../popup/MultiSnackBar";

/* 
  역할 : 어드민 페이지 -> 회원 관리 -> 회원 상세 정보
  인증 : 어드민 사용가능
  기능 : 회원 정보 수정정
*/
export default function DetailMember({ memberId, setter, onSuccess }){

    const showSnack = useSnack();
    const [memberInfo,setMemberInfo] = useState(null)

    // Formik 객체 값 초기화
    const initialValues = useMemo(() => ({
        id:          memberId,
        email:       memberInfo?.email       || "",
        nickName:    memberInfo?.nickName    || "",
        phoneNumber: memberInfo?.phoneNumber || "",
        role:        memberInfo?.role        || "",
        status:      memberInfo?.status      || "",
        country:     memberInfo?.countryCode || "",
        password:        "",
        confirmPassword: ""
    }), [memberId, memberInfo]);


    // 수정 API
    const handleSubmit = useCallback(async (dto) => {
        const result = await updateMemberAPI(dto);
        if(result?.success){
            showSnack("info", result.message);
            setter(null);
            onSuccess(); 
        }else{
            alert("수정에 실패했습니다.");
        }
    }, [setter,onSuccess]);

    // 멤버 ID 사용, 멤버 정보 조회 API & memberInfo 값 삽입
    const fetch = useCallback(async (id) => {
        const result = await getMemberAPI(id);
        if(result.success) setMemberInfo(result.data);
    }, [setMemberInfo]);


    useEffect(()=>{
        if(memberId) fetch(memberId);
    },[memberId])

    return (
        <Modal
            open={memberId!=null}
            onClose={() => setter(null)}
            disableEnforceFocus
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Paper
            component="div"
            sx={{
            width: { xs: '90%', sm: 600 },
            p: 3,
            '& .MuiTextField-root': { m: 1, width: 'calc(50% - 16px)' },
            }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={UpdateSchema} 
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
                                type="submit"
                                sx={{ ...btnBlack, mr : 0.3}}    
                                variant="contained"
                            >
                                Update
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setter(null)}
                                sx={{ ...btnBlack}}
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