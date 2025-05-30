import { Box, Button, Typography } from "@mui/material";
import heroImage from '../../assets/wallpapers.jpg';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postPath } from "../../hooks/urlManager";

/* 
  역할 : 메인 페이지 -> Hero 박스
  인증 : 모든 이용자 사용가능
  기능 : 게시물 페이지로로 이동
*/

const HeroSection = styled(Box)({
    position: 'relative',
    height: '70vh',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1
    }
});


export default function Hero(){
    const navigate = useNavigate();
    
    const getStartBtn = ()=>{navigate(postPath.to(-1))} // 새로운 게시물 작성

    return(
        <HeroSection sx={{ backgroundImage: `url(${heroImage})` }}>
            <Box position="relative" zIndex={2} textAlign="center" >

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
        </HeroSection>
    );
}