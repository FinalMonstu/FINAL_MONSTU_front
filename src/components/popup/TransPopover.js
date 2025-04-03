import React from "react";
import { Popover, Typography } from "@mui/material";

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
          ? { top: anchorEl.getBoundingClientRect().top + window.scrollY - 35, 
              left: anchorEl.getBoundingClientRect().left + window.scrollX }
          : { top: 0, left: 0 }
      }
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 0.5 }}>{translation.transed}</Typography>
    </Popover>
  );
}
