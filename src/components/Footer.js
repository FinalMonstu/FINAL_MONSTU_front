import { Box, Typography } from "@mui/material";

const linkStyle = { color: '#6247AA', textDecoration: 'none', fontWeight: 'bold', margin: 10 }

export default function Footer(){
    return(
        <Box
            component="footer"
            sx={{
                py: 4,
                // backgroundColor: theme => theme.palette.grey[200],
                textAlign: 'center',
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
            <a
                href="https://www.notion.so/PORTFOLIO-19e303eae1f280828d69f4b34a9654a7?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
                style={{...linkStyle}}
                >
                Developer PROFILE
            </a>
            <a
                href="https://github.com/orgs/FinalMonstu/repositories"
                target="_blank"
                rel="noopener noreferrer"
                style={{...linkStyle}}
                >
                Project Code
            </a>
        </Box>
    )
}