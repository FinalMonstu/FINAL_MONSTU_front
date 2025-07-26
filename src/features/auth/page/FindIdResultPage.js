import { Box, Typography, Divider, Button, Stack, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { authPath } from '../../../common/hooks/urlManager';

import {
    containerSx,
    paperSx,
    titleSx,
    subtitleSx,
    emailStackSx,
    checkIconSx,
    emailTextSx,
    loginButtonSx
} from '../styles/FindIdResultPageStyles';

/* 
  역할 : 아이디(이메일) 찾기 페이지 -> 유저가 찾은 이메일 표시 페이지
  인증 : 모든 사용자 사용가능
  기능 : 
    유저가 찾은 이메일 표시,
    로그인 페이지로 이동
*/
const FindIdResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email ?? '';

  return (
    <Box sx={containerSx}>
        <Paper sx={paperSx}>
            <Typography variant="h4" sx={titleSx}>
                MonStu
            </Typography>

            <Divider sx={{ mb: 4, borderColor: '#e0e0e0' }} />

            <Typography variant="h5" sx={subtitleSx}>
                아이디(이메일)를 찾았습니다
            </Typography>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={emailStackSx}
            >
                <CheckBoxIcon sx={checkIconSx} />

                <Typography variant="h6" sx={emailTextSx}>
                    {email}
                </Typography>
            </Stack>

            <Button
                variant="contained"
                fullWidth
                sx={loginButtonSx}
                onClick={() => navigate(authPath.login)}
            >
                로그인 페이지로 이동
            </Button>
        </Paper>
    </Box>
  );
};

export default FindIdResultPage;
