import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { myPath, postPath } from "../../hooks/urlManager";

function MyPage() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // 전체 화면을 차지하도록 설정
        overflow: "hidden", // 불필요한 스크롤 제거
      }}
    >
      <Button onClick={()=>navigate(myPath.posts)}>My Posts</Button>
    </Box>
  );
}

export default MyPage;
