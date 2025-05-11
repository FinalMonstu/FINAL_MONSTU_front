import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPublicPosts } from "../../hooks/controller/PostController";
import { postPath } from "../../hooks/urlManager";

/* 
  역할 : 메인 페이지 -> 간단 게시물 정보 목록 표시 박스
  인증 : 모든 사용자자 사용가능
  기능 : 
    게시물 정보 표시 (제목, 생성일),
    클릭 시 게시물 페이지로 이동동
*/
export default function LitePosts() {
  const navigate = useNavigate();

  // 페이징 상태
  const [pageable, setPageable] = useState({
    page: 0,
    size: 3,
    sort: "createdAt,asc",
  });

  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // 게시글 조회
  const fetchPosts = useCallback(async () => {
    const {success,data} = await getPublicPosts(pageable);
    if (!success) return; 
    setTotalPages(data.totalPages);
    setPosts(prev => ( pageable.page === 0 
      ? data.content 
      : [...prev, ...data.content]));
  }, [pageable, setTotalPages, setPosts]);


  // 초기 및 페이지 변경 시 호출
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  // more 버튼 클릭
  const handleMore = () => {
    if (pageable.page + 1 < totalPages) {
      setPageable((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      <Box sx={{ overflowY: 'auto', mb: 2 }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
          rowSpacing={3}
          justifyContent="center"
          alignItems="flex-start"
        >
          {posts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                variant="outlined"
                sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer', border: 'none' }}
                onClick={() => navigate(postPath.to(post.id))}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap gutterBottom>
                    {post.title}
                  </Typography>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {post.createdAt.split('T')[0]}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box textAlign="center" py={1}>
        <Button
          variant="contained"
          size="small"
          disabled={pageable.page + 1 >= totalPages}
          onClick={handleMore}
        >
          More
        </Button>
      </Box>
    </Box>
  );
}
