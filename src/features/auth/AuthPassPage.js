import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

import { useSnack } from '../../common/components/MultiSnackBar';
import { useAuth } from './hooks/AuthContext';

export default function AuthPassPage({ children }) {
  const {pass, passin} = useAuth();
  const showSnack = useSnack();

  const [inputCode, setInputCode] = useState('');
  const PASS_CODE = '24601';

  const handleSubmit = () => {
    (inputCode === PASS_CODE)
      ? passin()
      : showSnack('error','코드가 일치하지 않습니다')
  };

  // 인증 전 화면
  if (!pass) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          접근 코드를 입력하세요
        </Typography>
        <TextField
          label="Passcode"
          type="password"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          sx={{ mb: 2, width: 240 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          제출
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
}
