import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {
    tableContainerSx,
    checkboxCellSx,
    tableRowSx,
    basicCellSx,
    roleCellSx,
    statusCellSx,
    dateCellSx
} from '../styles/MemberTableStyles';

/* 
  역할 : 어드민 페이지 -> 회원 간단 정보 목록 표시
  인증 : ADMIN만 사용가능
  기능 : 
    회원 간단 정보 정보 표시,
    회원 다중 선택 기능능
*/
export default function MemberTable({
  data, selected,
  onSelectAll, onSelectOne,
  onRowClick,
}) {
  const allSelected = data.length > 0 && selected.length === data.length;
  const indeterminate = selected.length > 0 && selected.length < data.length;

  return (
    <TableContainer 
      component={Paper}
      sx={tableContainerSx}
    >
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" sx={checkboxCellSx}>
              <Checkbox
                indeterminate={indeterminate}
                checked={allSelected}
                onChange={onSelectAll}
              />
            </TableCell>
            <TableCell>국가</TableCell>
            <TableCell>이메일</TableCell>
            <TableCell>닉네임</TableCell>
            <TableCell>역할</TableCell>
            <TableCell>상태</TableCell>
            <TableCell>가입일시</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(row => (
            <TableRow
              key={row.memberId}
              hover
              onClick={() => onRowClick(row.memberId)}
              sx={tableRowSx}
            >
              <TableCell 
                padding="checkbox" 
                onClick={e => e.stopPropagation()}
                sx={checkboxCellSx}
              >
                <Checkbox
                  checked={selected.includes(row.memberId)}
                  onChange={() => onSelectOne(row.memberId)}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={basicCellSx}>
                  {row?.countryCode || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={basicCellSx}>
                  {row?.email || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={basicCellSx}>
                  {row?.nickName || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={roleCellSx(row?.role)}
                >
                  {row?.role || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={statusCellSx(row?.status)}
                >
                  {row?.status || '—'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={dateCellSx}>
                  {row?.createdAt ? dayjs(row.createdAt).format('YYYY-MM-DD HH:mm') : '—'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
