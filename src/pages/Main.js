import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { authPath, postPath } from "../hooks/urlManager";
import Footer from '../components/Footer';
import LitePosts from '../components/box/LitePosts';
import Hero from '../components/box/Hero';



function Main() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // height: "100vh", // 전체 화면을 차지하도록 설정
        overflow: "hidden", // 불필요한 스크롤 제거
      }}
    >
      <Button onClick={()=>navigate(authPath.login)}>login</Button>
      <Button onClick={()=>navigate(authPath.signup)}>signup</Button>
      <Button onClick={()=>navigate(authPath.signout)}>signout</Button>
      <Button onClick={()=>navigate(authPath.find)}>find</Button>
      <Button onClick={()=>navigate(authPath.resetPw)}>ResetPw</Button>
      <Button onClick={()=>navigate(authPath.foundEmail)}>Email Found</Button>

      <Button onClick={()=>navigate(postPath.post)}>post</Button>

      <Hero/>
      
      <LitePosts/>

      {/* <Footer/> */}
    </Box>
  );
}

export default Main;
