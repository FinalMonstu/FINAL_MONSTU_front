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
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function FindIdPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromState = location.state?.email || "";


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

                    <Typography variant="h5" fontWeight="" gutterBottom>
                        Your ID(email) is
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt:3 }}>
                        <CheckBoxIcon sx={{mr:1.5}}/> 
                        <Typography variant="h5" fontWeight="" gutterBottom>
                            {emailFromState}
                        </Typography>
                    </Box>
                </Box>
                <Button variant="contained"
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                    fullWidth
                    onClick={()=>navigate('/login')}
                    >
                    login
                </Button>
            </Box>
        </Box>
    );
}

export default FindIdPage;
