import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Modal, Paper, Button, TextField, Typography, Divider } from "@mui/material";
import { Formik, Form } from "formik";

import MemberRoleSelector from "../../preset/components/MemberRoleSelector";
import MemberStatusSelector from "../../preset/components/MemberStatusSelector";
import CountrySelect from "../../preset/components/CountrySelector";
import { UpdateSchema } from "../../../features/auth/hooks/SignSchema";
import { getMemberAPI, updateMemberAPI } from "../AdminController";
import { useSnack } from "../../../common/components/MultiSnackBar";
import {
    modalSx,
    paperSx,
    containerSx,
    titleSx,
    sectionTitleSx,
    inputGridSx,
    selectorGridSx,
    buttonContainerSx,
    submitButtonSx,
    cancelButtonSx
} from '../styles/DetailMemberStyles';

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
            sx={modalSx}
        >
            <Paper
                component="div"
                sx={paperSx}
            >
                <Box sx={containerSx}>
                    <Typography variant="h5" component="h2" sx={titleSx}>
                        회원 정보 수정
                    </Typography>
                    
                    <Divider sx={{ mb: 3 }} />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={UpdateSchema} 
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={sectionTitleSx}>
                                    기본 정보
                                </Typography>
                                <Box sx={inputGridSx}>
                                    <TextField
                                        name="email"
                                        label="이메일"
                                        required
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        fullWidth
                                    />
                                    <TextField
                                        name="nickName"
                                        label="닉네임"
                                        required
                                        value={values.nickName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.nickName && Boolean(errors.nickName)}
                                        helperText={touched.nickName && errors.nickName}
                                        fullWidth
                                    />
                                    <TextField
                                        name="phoneNumber"
                                        label="전화번호"
                                        placeholder="010-1234-5678"
                                        required
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={sectionTitleSx}>
                                    권한 및 상태
                                </Typography>
                                <Box sx={selectorGridSx}>
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
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={buttonContainerSx}>
                                <Button
                                    type="submit"
                                    sx={submitButtonSx}
                                    variant="contained"
                                >
                                    수정 완료
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setter(null)}
                                    sx={cancelButtonSx}
                                    variant="outlined"
                                >
                                    취소
                                </Button>
                            </Box>
                        </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Modal>
    );
}