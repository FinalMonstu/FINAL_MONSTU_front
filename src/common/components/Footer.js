import { Box, Typography, Link, Stack } from "@mui/material";
import {
  footerSx,
  titleSx,
  captionSx,
  captionEmailSx,
  linkStackSx,
  linkSx
} from '../styles/FooterStyles';

export default function Footer(){
    return(
        <Box component="footer" sx={footerSx}>
            <Typography variant="subtitle1" component="div" gutterBottom sx={titleSx}>
                MonStu
            </Typography>
            <Typography variant="caption" display="block" sx={captionSx}>
                ©2025 MonStu Developed by kimicetea
            </Typography>
            <Typography variant="caption" display="block" sx={captionEmailSx}>
                email: kimicetea777@gmail.com
            </Typography>
            {/* <Stack direction="row" justifyContent="center" spacing={2} sx={linkStackSx}>
              <Link
                href="https://www.notion.so/PORTFOLIO-19e303eae1f280828d69f4b34a9654a7?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
                sx={linkSx}
              >
                Developer PROFILE
              </Link>
              <Link
                href="https://github.com/orgs/FinalMonstu/repositories"
                target="_blank"
                rel="noopener noreferrer"
                sx={linkSx}
              >
                Project Code
              </Link>
            </Stack> */}
        </Box>
    )
}