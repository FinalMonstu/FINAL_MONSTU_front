import React from "react";
import Header from "../components/Header";
import PostPage from "./PostPage";
import { Box } from "@mui/material";
import SignUpPage from "./SignUpPage";

function Main() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // 전체 화면을 차지하도록 설정
        overflow: "hidden", // 불필요한 스크롤 제거
      }}
    >
      {/* Header (고정 높이) */}
      <Box sx={{ height: "60px", flexShrink: 0 }}>
        <Header />
      </Box>

      {/* PostPage (Header 높이를 뺀 나머지 영역) */}
      {/* <Box sx={{ flexGrow: 1, overflow: "hidden",paddingTop:"30px" }}>
        <PostPage />
      </Box> */}

{/* flexGrow: 1, overflow: "hidden",paddingTop:"60px" */}
      <Box sx={{  }}>
        <SignUpPage/>
      </Box>

    </Box>
  );
}

export default Main;
