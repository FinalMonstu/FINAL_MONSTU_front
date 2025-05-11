import React from "react";
import { Popover, Typography } from "@mui/material";

/* 
  역할 : 게시물 페이지 -> 번역된 단어 화면에 표시
  인증 : 모든 이용자 사용가능
  기능 : 번역된 단어 화면에 표시
*/
export default function TransPopover({ anchorEl, setAnchorEl, translation }) {
  // Popover 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorReference="anchorPosition" // 위치를 직접 지정
      anchorPosition={
        anchorEl
          ? { top: anchorEl.getBoundingClientRect().top + window.scrollY - 37, left: anchorEl.getBoundingClientRect().left + window.scrollX }
          : { top: 0, left: 0 }
      }
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 0.5, border: "1px solid black" }}>{translation.transed}</Typography>
    </Popover>
  );
}
