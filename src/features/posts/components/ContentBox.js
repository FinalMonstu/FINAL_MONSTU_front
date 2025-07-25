import { useCallback, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import TransPopover from "../../translate/components/TransPopover";

/*
  Post 페이지 -> 게시물 Content 표시
  하이라이팅한 문자 위치 파악/반환
*/
export default function ContentBox({ translation, updateTranslation, post }) {
  const boxRef = useRef(null);
  const [anchorPosition, setAnchorPosition] = useState(null);

  const handleHighlightText = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setAnchorPosition(null);
      return;
    }

    const text = sel.toString().trim();
    if (text && translation.originalText !== text) {
      updateTranslation("originalText", text);
    }

    const range = sel.getRangeAt(0);
    const rects = Array.from(range.getClientRects());
    if (rects.length > 0) {
      const r = rects[0];
      setAnchorPosition({
        top:  r.top  + window.scrollY,
        left: r.left + window.scrollX,
      });
    }
  }, [translation.originalText, updateTranslation]);

  return (
    <Box
      ref={boxRef}
      sx={{ position: "relative", padding: "40px" }}
      onMouseUp={handleHighlightText}
    >
      <Typography sx={{ whiteSpace: "pre-wrap" }}>
        {post.content}
      </Typography>
      <TransPopover
        anchorPosition={anchorPosition}
        onClose={() => setAnchorPosition(null)}
        translation={translation}
      />
    </Box>
  );
}
