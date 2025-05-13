import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function MyPostsTable({ posts, onRowClick }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>생성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow
                key={post.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onRowClick(post)}
              >
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  {dayjs(post.createdAt).format("YY.MM.DD")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} align="center">
                아직 등록된 게시물이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    
  );
}