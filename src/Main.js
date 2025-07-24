import { Box } from '@mui/material';
import Hero from './common/components/Hero';
import Footer from './common/components/Footer';
import PublicPostsBox from './features/posts/components/PublicPostsBox';

/* 
  역할 : 메인 페이지
  인증 : 모든 사용자 사용가능
  기능 : 
    게시물 작성 페이지 이동,
    공개 게시물 목록 표시
*/
export default function Main() {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}} >
        <Hero/>
        
        <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <PublicPostsBox />
        </Box>

        <Footer/>
      </Box>
  );
}