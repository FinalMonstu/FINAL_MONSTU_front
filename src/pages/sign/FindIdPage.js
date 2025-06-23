import { Box, Typography, Divider, Button, Stack } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { authPath } from '../../hooks/urlManager';

/* 
  역할 : 아이디(이메일) 찾기 페이지 -> 유저가 찾은 이메일 표시 페이지
  인증 : 모든 사용자 사용가능
  기능 : 
    유저가 찾은 이메일 표시,
    로그인 페이지로 이동
*/
const FindIdPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email ?? '';

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fff',
        p: 2,
      }}
    >
        <Box sx={{ width: 500, textAlign: 'center', p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                MonStu
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h5" gutterBottom>
                Your ID (email) is
            </Typography>

            <Stack
                direction="row"
                spacing={1.5}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4 }}
            >
                <CheckBoxIcon color="success" />

                <Typography variant="h5" fontWeight="bold">
                    {email}
                </Typography>
            </Stack>

            <Button
                variant="contained"
                fullWidth
                sx={{
                backgroundColor: 'black',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
                }}
                onClick={() => navigate(authPath.login)}
            >
                Login
            </Button>
        </Box>
    </Box>
  );
};

export default FindIdPage;
