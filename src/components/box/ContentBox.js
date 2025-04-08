import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";

export default function ContentBox({ translation, updateTranslation, post }) {
  // onMouseUp 이벤트 핸들러: 메모이제이션을 위해 useCallback 사용
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
