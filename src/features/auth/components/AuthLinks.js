import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authPath } from '../../../common/hooks/urlManager';
import { buttonStyle, boxStyle } from '../styles/AuthLinksStyles';

export default function AuthLinks() {
  const navigate = useNavigate();

  return (
    <Box
      sx={boxStyle}
    >
      {/* 비밀번호 찾기 / 아이디 찾기 */}
      <Button
        variant="text"
        onClick={() => navigate(authPath.find)}
        sx={buttonStyle}
      >
        Reset Password / Find My Id
      </Button>

      {/* 회원가입 */}
      <Button
        variant="text"
        onClick={() => navigate(authPath.signup)}
        sx={buttonStyle}
      >
        Sign Up
      </Button>
    </Box>
  );
}
