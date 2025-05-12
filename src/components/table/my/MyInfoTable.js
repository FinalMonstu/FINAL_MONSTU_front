import React, { useCallback, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from '@mui/material';
import { myInfo } from '../../../hooks/controller/MemberController';
import { useSnack } from '../../popup/MultiSnackBar';
import { useNavigate } from 'react-router-dom';
import { authPath } from '../../../hooks/urlManager';

export default function MyInfoTable() {
  const navigate = useNavigate();
  const showSnack = useSnack();
  const [data, setData] = useState({});

  const fetch = useCallback(async () => {
    const { success, message, data } = await myInfo();
    success ? setData(data) : showSnack('error', message);
  }, [showSnack]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleChangePassword = () => { navigate(authPath.resetPw, { state: { email: data.email } })};
  const handleSignOut = () => { navigate(authPath.signout)};
  
  return (
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
            <TableCell>{data.country ?? '-'}</TableCell>
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
              <Button
                size="small"
                variant="text"
                onClick={handleSignOut}
              >
                회원 탈퇴
              </Button>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
