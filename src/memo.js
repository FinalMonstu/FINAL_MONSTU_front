import React, { useState } from "react";
import { Box, Typography, TextField, Button, Divider, Paper, Stack, Autocomplete } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CountrySelect from "../components/selecter/CountrySelect";

const SignUpPage = () => {

    const [signup,setSignup] = useState({
        "email" : "",
        "password" : "",
        "nickName" : "",
        "phoneNumber" : "",
        "country" : "",
    })

    const updateSignup = (field, value) => setSignup(prev => ({ ...prev, [field]: value }));

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Box elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600, }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                    Sign Up
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Divider sx={{ mb: 5, width: "100%", borderColor:"#C0C0C0" }} />
                </Box>

                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* ID(email) Text */}
                    <Typography variant="h6" sx={{ mb: -2 }}>
                        ID <Typography component="span" variant="body2" color="text.secondary">(email)</Typography>
                    </Typography>
                    {/* ID(email) Input Box & Check Button */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                        gap: 0.8,
                    }}>
                        <TextField 
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                        height: "35px", // 입력창 높이
                                    },
                                },
                            }}
                            placeholder="email@domain.net"
                            type="email"
                            fullWidth
                            required
                            variant="outlined"
                        />
                        <Button sx={{
                            backgroundColor:"black",
                            color:"white",
                            minWidth:"80px",
                            textTransform: "none"
                        }}>
                            Check
                        </Button>
                    </Box>

                    {/* ID(email) Text */}
                    <Typography variant="h6" sx={{ mb: -2 }}> Email Authentication Code </Typography>
                    {/* Email Authentication Code */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                    }}>
                        <TextField 
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                        height: "35px", // 입력창 높이
                                    },
                                },
                            }}
                            fullWidth
                            required
                            variant="outlined"
                        />
                        <Button sx={{
                            backgroundColor:"black",
                            color:"white",
                            minWidth:"60px",
                            textTransform: "none",
                            marginLeft: 1
                        }}>
                            Send
                        </Button>
                        <Button sx={{
                            backgroundColor:"black",
                            color:"white",
                            minWidth:"70px",
                            textTransform: "none",
                            marginLeft: 0.15
                        }}>
                            Check
                        </Button>
                    </Box>

                    {/* Password Text */}
                    <Typography variant="h6" sx={{ mb: -2 }}> Password </Typography>
                    {/* Password Input */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                    }}>
                        <TextField 
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                        height: "35px", // 입력창 높이
                                    },
                                },
                            }}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Box>

                    {/* Password Text */}
                    <Typography variant="h6" sx={{ mb: -2 }}> Confirm Password </Typography>
                    {/* Password Input */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                        gap: 0.8,
                    }}>
                        <TextField 
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                        height: "35px", // 입력창 높이
                                    },
                                },
                            }}
                            fullWidth
                            required
                            variant="outlined"
                        />
                        <CheckIcon/>
                    </Box>

                    {/* NickName Text */}
                    <Typography variant="h6" sx={{ mb: -2 }}> NickName </Typography>
                    {/* NickName Input */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                    }}>
                        <TextField 
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                        height: "35px",
                                    },
                                },
                            }}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Box>

                    {/* Phone Number Text */}
                    <Typography variant="h6" sx={{ mb: -2 }}> Phone Number </Typography>
                    {/* Phone Number Input */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                    }}>
                        <TextField 
                            slotProps={{
                                input: {
                                    style: {
                                        fontSize: "16px",
                                        height: "35px",
                                    },
                                },
                            }}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Box>

                    {/* Country Select Box */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "35px",
                        gap: 1,
                        mt:1
                    }}>
                        <Typography variant="h6" sx={{paddingRight:1}}> Country </Typography>
                        {/* Country Select Componet */}
                        <CountrySelect dto={signup} setter={updateSignup}/>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ backgroundColor: "black",marginLeft:14, height:33, width:300 }}
                            type="submit"
                        >
                            signup
                        </Button>
                    </Box>

                    
                </Box>
            </Box>
        </Box>
    );
};

export default SignUpPage;
