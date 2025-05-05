import { Box, Typography } from "@mui/material";
import styled from "styled-components";

function Footer(){
    return(
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[100],
                textAlign: 'center'
            }}
            >
            <Typography variant="subtitle1" component="div" gutterBottom>
                MonStu
            </Typography>
            <Typography variant="caption" display="block">
                ©2025 MonStu Developed by kimicetea
            </Typography>
            <Typography variant="caption" display="block">
                email: kimicetea777@gmail.com
            </Typography>
        </Box>
    )
}

export default Footer;