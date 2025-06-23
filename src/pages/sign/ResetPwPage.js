import { useCallback } from "react";
import { Box, Typography, Divider, TextField, Button, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { confirmPwSchema } from "../../hooks/schema/SignSchema";
import { resetPwAPI } from "../../hooks/controller/AuthController";
import { useSnack } from "../../components/popup/MultiSnackBar";
import { authPath } from "../../hooks/urlManager";
import { useAuth } from "../../components/authenticate/AuthContext";

/* 
  역할 : 비밀번호 재설정 페이지
  인증 : 모든 사용자 사용가능
  기능 : 유저 비밀번호 정보 수정
*/
export default function ResetPwPage() {
    const {logout} = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const showSnack = useSnack();

    const email = state?.email ?? '';


    //비밀번호 번경
    const resetPw = useCallback(async (dto) => {
        const result = await resetPwAPI(dto);
        const message = result.message;
        if(result.success){
            logout();
            alert(message); 
            navigate(authPath.login, { replace: true });
        }else{
            showSnack("error", result.message);
        }
    },[])


    const onSubmit = (values, { setSubmitting }) => {
        resetPw({
            "email" : values.email,
            "password" : values.password
        });
        setSubmitting(false);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#fff',
            }}
        >
            <Box sx={{ width: 500, p: 4 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    MonStu
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Formik
                    initialValues={{ email, password: '', confirmPassword: '' }}
                    validationSchema={confirmPwSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, errors, touched, isSubmitting }) => (
                        <Form>
                            <Stack spacing={3}>
                                <Field
                                    name="email"
                                    as={TextField}
                                    label="Email"
                                    value={values.email}
                                    disabled
                                    size="small"
                                    fullWidth
                                />

                                <Field
                                    name="password"
                                    as={TextField}
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    size="small"
                                    fullWidth
                                />

                                <Box>
                                    <Typography variant="body1" fontWeight="bold" mb={1}>
                                        Confirm Password
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Field
                                            name="confirmPassword"
                                            as={TextField}
                                            placeholder="Confirm new password"
                                            type="password"
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            size="small"
                                            fullWidth
                                        />
                                        {values.password &&
                                            values.confirmPassword &&
                                                values.password === values.confirmPassword && (
                                                    <CheckIcon color="success" />
                                            )
                                        }
                                    </Stack>
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
                                    fullWidth
                                >
                                    Change my Password
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}