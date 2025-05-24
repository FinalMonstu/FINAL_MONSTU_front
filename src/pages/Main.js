import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Hero from '../components/box/Hero';
import Footer from '../components/Footer';
import PublicPostsBox from '../components/box/PublicPostsBox';
import Header from '../components/Header';
import AuthPassPage from './AuthPassPage';

/* 
  역할 : 메인 페이지
  인증 : 모든 사용자 사용가능
  기능 : 
    게시물 작성 페이지 이동,
    공개 게시물 목록 표시
*/
export default function Main() {
  return (
    <AuthPassPage>

      <Box sx={{ height: "60px", flexShrink: 0 }}>
        <Header />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}} >
        {/* <Button onClick={()=>navigate(authPath.login)}>login</Button>
        <Button onClick={()=>navigate(authPath.signup)}>signup</Button>
        <Button onClick={()=>navigate(authPath.signout)}>signout</Button>
        <Button onClick={()=>navigate(authPath.find)}>find</Button>
        <Button onClick={()=>navigate(authPath.resetPw)}>ResetPw</Button>
        <Button onClick={()=>navigate(authPath.foundEmail)}>Email Found</Button>

        <Button onClick={()=>navigate(postPath.post)}>post</Button> */}

        <Hero/>
        
        <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <PublicPostsBox />
        </Box>

        <Footer/>
      </Box>
    </AuthPassPage>
    
  );
}