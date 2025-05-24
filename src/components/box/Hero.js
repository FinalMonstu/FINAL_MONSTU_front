// Hero.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import heroImage from '../../assets/wallpapers.jpg';
import { useNavigate } from "react-router-dom";
import { postPath } from "../../hooks/urlManager";

/* 
  역할 : 메인 페이지 -> Hero 박스
  기능 : 왼쪽 텍스트, 오른쪽 유튜브 쇼츠 배치
*/

const HeroSection = {
  position: 'relative',
  height: '70vh',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 4,                      // 좌우 여백
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  }
};

export default function Hero(){
  const navigate = useNavigate();
  const getStartBtn = () => navigate(postPath.to(-1));

  return (
    <Box
      sx={{
        ...HeroSection,
        backgroundImage: `url(${heroImage})`
      }}
    >
      {/* 왼쪽 텍스트 영역 */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        ml:  20,
        maxWidth: '40%',      // 텍스트 박스 최대 너비
      }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Try it free!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Learn with the text of your choice.
        </Typography>
        
        <Button
          variant="contained"
          sx={{ mt: 2, px: 4, py: 1.5 }}
          onClick={getStartBtn}
        >
          Get Start
        </Button>
      </Box>

      {/* 오른쪽 쇼츠 영상 영역 */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        width: '35%',         // 컨테이너 너비
        maxWidth: '400px',   // 최대 너비
        maxHeight: '600px',  // 최대 높이
        aspectRatio: '9/16',  // 세로형 비율 고정
        overflow: 'hidden',
        borderRadius: 2,      // 모서리 둥글게
      }}>
        <Box
          component="iframe"
          src="https://www.youtube.com/embed/I1TQL03Qr94?playsinline=1"
          sx={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
}
