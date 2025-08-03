import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Stack, Divider, Avatar } from '@mui/material';
import { Person, Email, Phone, Public, Lock, Warning } from '@mui/icons-material';

import { myInfo, setReactivateAPI } from '../MemberController';
import { useSnack } from '../../../common/components/MultiSnackBar';
import { authPath } from '../../../common/hooks/urlManager';
import {
    containerSx,
    paperSx,
    headerBoxSx,
    avatarSx,
    titleSx,
    subtitleSx,
    stackSx,
    infoCardSx,
    iconSx,
    infoBoxSx,
    infoLabelSx,
    infoValueSx,
    dividerSx,
    actionStackSx,
    changePasswordButtonSx,
    warningBoxSx,
    warningHeaderSx,
    warningIconSx,
    warningTitleSx,
    warningMessageSx,
    reactivateButtonSx,
    deleteButtonSx
} from '../styles/MyInfoTableStyles';

export default function MyInfoTable() {
  const navigate = useNavigate();
  const showSnack = useSnack();
  const [data, setData] = useState({});

  const fetch = useCallback(async () => {
    const { success, message, data } = await myInfo();
    success ? setData(data) : showSnack('error', message);
  }, []);

  const handleReactivate = useCallback(async () => {
    const { success, message } = await setReactivateAPI();
    success ? fetch() : showSnack('error', message);
  }, []);

  useEffect(() => { fetch(); }, []);

  const handleChangePassword = () => { 
    navigate(authPath.resetPw, { state: { email: data.email } });
  };
  const handleSignOut = () => { navigate(authPath.signout)};
  
  return (
    <Box sx={containerSx}>
      <Paper sx={paperSx}>
        
        {/* 헤더 섹션 */}
        <Box sx={headerBoxSx}>

          <Typography variant="h4" sx={titleSx}>
            My Profile
          </Typography>
          <Typography variant="body2" sx={subtitleSx}>
            Your account information
          </Typography>
        </Box>

        {/* 정보 섹션 */}
        <Stack sx={stackSx}>
          
          <Box sx={infoCardSx}>
            <Email sx={iconSx} />
            <Box sx={infoBoxSx}>
              <Typography variant="caption" sx={infoLabelSx}>
                Email Address
              </Typography>
              <Typography variant="body1" sx={infoValueSx}>
                {data.email ?? '-'}
              </Typography>
            </Box>
          </Box>

          <Box sx={infoCardSx}>
            <Person sx={iconSx} />
            <Box sx={infoBoxSx}>
              <Typography variant="caption" sx={infoLabelSx}>
                Nick Name
              </Typography>
              <Typography variant="body1" sx={infoValueSx}>
                {data.nickName ?? '-'}
              </Typography>
            </Box>
          </Box>

          <Box sx={infoCardSx}>
            <Phone sx={iconSx} />
            <Box sx={infoBoxSx}>
              <Typography variant="caption" sx={infoLabelSx}>
                Phone Number
              </Typography>
              <Typography variant="body1" sx={infoValueSx}>
                {data.phoneNumber ?? '-'}
              </Typography>
            </Box>
          </Box>

          <Box sx={infoCardSx}>
            <Public sx={iconSx} />
            <Box sx={infoBoxSx}>
              <Typography variant="caption" sx={infoLabelSx}>
                Country
              </Typography>
              <Typography variant="body1" sx={infoValueSx}>
                {data.countryCode ?? '-'}
              </Typography>
            </Box>
          </Box>

        </Stack>

        <Divider sx={dividerSx} />

        {/* 액션 버튼들 */}
        <Stack sx={actionStackSx}>
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleChangePassword}
            startIcon={<Lock />}
            sx={changePasswordButtonSx}
          >
            Change Password
          </Button>

          { data.status === 'DELETED' ?
            <Box sx={warningBoxSx}>
              <Box sx={warningHeaderSx}>
                <Warning sx={warningIconSx} />
                <Typography variant="body2" sx={warningTitleSx}>
                  Account Deletion Scheduled
                </Typography>
              </Box>
              <Typography variant="caption" sx={warningMessageSx}>
                00시에 회원 정보가 삭제 예정입니다
              </Typography>
              <Button 
                fullWidth
                variant="contained" 
                onClick={handleReactivate}
                sx={reactivateButtonSx}
              > 
                Cancel Deletion
              </Button>
            </Box>
            : 
            <Button 
              fullWidth
              variant="contained" 
              onClick={handleSignOut}
              sx={deleteButtonSx}
            > 
              Delete Account
            </Button>
          }

        </Stack>

      </Paper>
    </Box>
  );
}
