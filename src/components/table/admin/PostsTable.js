import React from 'react';
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Checkbox, Paper} from '@mui/material';


export default function PostsTable({
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
                <TableCell>author_id</TableCell>
                <TableCell>is_public</TableCell>
                <TableCell>status</TableCell>
                <TableCell>title</TableCell>
                <TableCell>modified_at</TableCell>
                <TableCell>created_at</TableCell>
                <TableCell>view_count</TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {data.map(row => (
                <TableRow
                  key={row.postId}
                  hover
                  onClick={() => onRowClick(row.postId)}
                >
                  <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.includes(row.postId)}
                      onChange={() => onSelectOne(row.postId)}
                    />
                  </TableCell>
                  <TableCell>{row?.authorId}</TableCell>
                  <TableCell>{row?.isPublic?.toString()}</TableCell>
                  <TableCell>{row?.status}</TableCell>
                  <TableCell>{row?.title}</TableCell>
                  <TableCell>{row?.modifiedAt ?? '—'}</TableCell>
                  <TableCell>{row?.createdAt}</TableCell>
                  <TableCell>{row?.viewCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}