import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authPath } from '../../hooks/urlManager';

const ButtonStyle = {
    textTransform: 'none',
        fontWeight: 'bold',
        color: 'text.secondary',
        '&:hover': {
        color: 'text.primary',
        backgroundColor: 'transparent',
    },
}

export default function AuthLinks() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* 비밀번호 찾기 / 아이디 찾기 */}
      <Button
        variant="text"
        onClick={() => navigate(authPath.find)}
        sx={{ ...ButtonStyle }}
      >
        Reset Password / Find My Id
      </Button>

      {/* 회원가입 */}
      <Button
        variant="text"
        onClick={() => navigate(authPath.signup)}
        sx={{ ...ButtonStyle }}
      >
        Sign Up
      </Button>
    </Box>
);
}
