import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import {
    tableContainerSx,
    checkboxCellSx,
    tableRowSx,
    authorIdCellSx,
    publicStatusCellSx,
    titleCellSx,
    dateCellSx,
    viewCountCellSx
} from '../styles/PostsTableStyles';

export default function PostsTable({
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
                <TableCell>작성자 ID</TableCell>
                <TableCell>공개 여부</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>수정일시</TableCell>
                <TableCell>생성일시</TableCell>
                <TableCell>조회수</TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {data.map(row => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => onRowClick(row.id)}
                  sx={tableRowSx}
                >
                  <TableCell 
                    padding="checkbox" 
                    onClick={e => e.stopPropagation()}
                    sx={checkboxCellSx}
                  >
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onChange={() => onSelectOne(row.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={authorIdCellSx}>
                        {row?.authorId || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                        variant="body2" 
                        sx={publicStatusCellSx(row?.isPublic)}
                    >
                        {row?.isPublic ? '공개' : '비공개'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                        variant="body2" 
                        sx={titleCellSx}
                    >
                        {row?.title || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={dateCellSx}>
                        {row?.modifiedAt ? dayjs(row.modifiedAt).format('YYYY-MM-DD HH:mm') : '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={dateCellSx}>
                        {row?.createdAt ? dayjs(row.createdAt).format('YYYY-MM-DD HH:mm') : '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={viewCountCellSx}>
                        {row?.viewCount ?? '0'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}