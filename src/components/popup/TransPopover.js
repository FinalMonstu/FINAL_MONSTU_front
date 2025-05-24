import React from "react";
import { Popover, Typography } from "@mui/material";

/* 
  역할 : 게시물 페이지 -> 번역된 단어 화면에 표시
  인증 : 모든 이용자 사용가능
  기능 : 번역된 단어 화면에 표시
*/
export default function TransPopover({ anchorPosition, onClose, translation }) {
  return (
    <Popover
      open={Boolean(anchorPosition)}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        anchorPosition
          ? { top: anchorPosition.top - 37, left: anchorPosition.left }
          : { top: 0, left: 0 }
      }
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ style: { pointerEvents: "auto" } }}
    >
      <Typography sx={{ p: 0.5, border: "1px solid black" }}>
        {translation.transed}
      </Typography>
    </Popover>
  );
}