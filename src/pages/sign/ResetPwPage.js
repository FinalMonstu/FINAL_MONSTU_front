import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Stack
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { confirmPwSchema } from "../../hooks/schema/SignSchema";
import { resetPwAPI } from "../../hooks/controller/AuthController";
import MultiSnackBar from "../../components/popup/MultiSnackBar";

function ResetPwPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [snackBar, setSnackBar] = useState({ msg: "", option: "error" });
    const emailFromState = location.state?.email || "";

    const initialValues = {
        email: emailFromState,
        password: "",
        confirmPassword: ""
    };

    const updateSnackBar = useCallback((field, value) => { setSnackBar((prev) => ({ ...prev, [field]: value })); }, []);


    const resetPw = useCallback(async (dto) => {
        const result = await resetPwAPI(dto);
        const message = result.message;
        if(result.success){
            alert(message); 
            navigate("/login");
        }else{
            updateSnackBar("option", "error");
            updateSnackBar("msg", message);
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
            height: "100vh",
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <Box
            sx={{
            width: 500,
            p: 4,
            }}
        >
            <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                MonStu
            </Typography>
            <Divider sx={{ mb: 3 }} />
            </Box>

            <Formik
            initialValues={initialValues}
            validationSchema={confirmPwSchema}
            onSubmit={onSubmit}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
            }) => (
                <Form>
                <Stack spacing={2}>
                    {/* Email (disabled) */}
                    <Typography variant="body1" fontWeight="bold">
                    Email
                    </Typography>
                    <TextField
                    name="email"
                    value={values.email}
                    disabled
                    size="small"
                    />

                    {/* New Password */}
                    <Typography variant="body1" fontWeight="bold">
                    New Password
                    </Typography>
                    <TextField
                    name="password"
                    placeholder="Enter new password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    size="small"
                    fullWidth
                    />

                    {/* Confirm Password with conditional check icon */}
                    <Typography variant="body1" fontWeight="bold">
                    Confirm Password
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        size="small"
                        fullWidth
                    />
                    {values.password &&
                        values.confirmPassword &&
                        values.password === values.confirmPassword && (
                        <CheckIcon color="success" />
                        )}
                    </Stack>

                    {/* Change my Password 버튼 */}
                    <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                    fullWidth
                    >
                    Change my Password
                    </Button>
                </Stack>
                </Form>
            )}
            </Formik>
        </Box>
        <MultiSnackBar snackBar={snackBar} setSnackBar={updateSnackBar} />
        </Box>
    );
}

export default ResetPwPage;
