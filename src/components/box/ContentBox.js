import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function ContentBox( {translation,updateTranslation,post} ) {

  // onMouseUp 이벤트트
  const handleHighlightText = () => {
    const selection = window.getSelection().toString().trim();  // 선택된 텍스트 가져오기
    if (selection && translation.target !== selection) {
      updateTranslation("target",selection); 
    }
  };

  return (
    <Box sx={{padding: "40px"}} onMouseUp={handleHighlightText}>
      <Typography sx={{ whiteSpace: "pre-wrap" }}>
        {post.content}
      </Typography>
    </Box>
  );
}