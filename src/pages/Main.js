import React from "react";
import Header from "../components/Header";
import PostPage from "./PostPage";
import { Box, Button } from "@mui/material";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";

function Main() {

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
      <Button onClick={()=>navigate('/login')}>login</Button>
      <Button onClick={()=>navigate('/signup')}>signup</Button>
      <Button onClick={()=>navigate('/find')}>find</Button>
      <Button onClick={()=>navigate('/pw/reset')}>ResetPw</Button>

      <Button onClick={()=>navigate('/post')}>post</Button>


      
      {/* PostPage (Header 높이를 뺀 나머지 영역) */}
      {/* <Box sx={{ flexGrow: 1, overflow: "hidden",paddingTop:"30px" }}>
        <PostPage />
      </Box> */}

      {/* flexGrow: 1, overflow: "hidden",paddingTop:"60px" */}
      {/* <Box sx={{  }}>
        <SignUpPage/>
      </Box> */}

      {/* <Box sx={{ flexGrow: 1, overflow: "hidden",paddingTop:"30px" }}>
        <LoginPage />
      </Box> */}
    </Box>
  );
}

export default Main;
