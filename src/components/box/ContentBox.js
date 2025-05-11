import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";

/* 
  역할 : Post 페이지 -> 게시물 Content 표시시
  인증 : 모든 사용자 이용
  기능 : 
    유저가 하이라이팅한 문자 정보 초기화,
    하이라이팅된 화면 위치 정보 초기화
*/
export default function ContentBox({ translation, updateTranslation, post }) {
  
  const handleHighlightText = useCallback(() => {
    const selectionObj = window.getSelection();
    const selection = selectionObj ? selectionObj.toString().trim() : "";
    if (selection && translation.target !== selection) {
      updateTranslation("target", selection);
    }
  }, [translation.target, updateTranslation]);

  return (
    <Box sx={{ padding: "40px" }} onMouseUp={handleHighlightText}>
      <Typography sx={{ whiteSpace: "pre-wrap" }}>{post.content}</Typography>
    </Box>
  );
}
