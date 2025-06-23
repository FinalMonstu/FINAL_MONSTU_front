import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Checkbox, Paper} from '@mui/material';
import dayjs from 'dayjs';

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
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={indeterminate}
                checked={allSelected}
                onChange={onSelectAll}
              />
            </TableCell>
            <TableCell>countryCode</TableCell>
            <TableCell>email</TableCell>
            <TableCell>nickname</TableCell>
            <TableCell>role</TableCell>
            <TableCell>status</TableCell>
            <TableCell>created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(row => (
            <TableRow
              key={row.memberId}
              hover
              onClick={() => onRowClick(row.memberId)}
            >
              <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                <Checkbox
                  checked={selected.includes(row.memberId)}
                  onChange={() => onSelectOne(row.memberId)}
                />
              </TableCell>
              <TableCell>{row?.countryCode}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell>{row?.nickName}</TableCell>
              <TableCell>{row?.role}</TableCell>
              <TableCell>{row?.status}</TableCell>
              <TableCell>{row?.createdAt ? dayjs(row.modifiedAt).format('YYYY-MM-DD HH:mm') : '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
