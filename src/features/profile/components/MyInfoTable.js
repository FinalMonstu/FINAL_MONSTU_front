import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, Button, Box } from '@mui/material';

import { myInfo, setReactivateAPI } from '../MemberController';
import { useSnack } from '../../../common/components/MultiSnackBar';
import { authPath } from '../../../common/hooks/urlManager';

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

  useEffect(() => { fetch(); }, [fetch]);

  const handleChangePassword = () => { 
    navigate(authPath.resetPw, { state: { email: data.email } });
  };
  const handleSignOut = () => { navigate(authPath.signout)};
  
  return (
    <Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ maxWidth: 400, mx: 'auto' }}
      >
        <Table size="small">
          <TableBody>

            <TableRow>
              <TableCell component="th" scope="row">email</TableCell>
              <TableCell>{data.email ?? '-'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th">nick name</TableCell>
              <TableCell>{data.nickName ?? '-'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th">phone number</TableCell>
              <TableCell>{data.phoneNumber ?? '-'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th">country</TableCell>
              <TableCell>{data.countryCode ?? '-'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} align="right">
                <Button
                  size="small"
                  variant="text"
                  onClick={handleChangePassword}
                >
                  비밀번호 변경
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} align="right">
                { data.status === 'DELETED' ?
                  <Box > 
                    00시에 회원 정보가 삭제 예정입니다
                    <Button size="small" variant="text" onClick={handleReactivate} > 회원 탈퇴 취소 </Button>
                  </Box>
                  : <Button size="small" variant="text" onClick={handleSignOut} > 회원 탈퇴 </Button>
                }
                
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

      
    </Box>
  );
}
