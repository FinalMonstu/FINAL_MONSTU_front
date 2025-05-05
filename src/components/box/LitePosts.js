import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPublicPosts } from "../../hooks/controller/PostController";
import { postPath } from "../../hooks/urlManager"; // 클릭 시 경로 생성용

export default function LitePosts() {
  const navigate = useNavigate();

  // 페이징 상태
  const [pageable, setPageable] = useState({
    page: 0,
    size: 6,
    sort: "createdAt,asc",
  });
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // 게시글 조회
  const fetchPosts = useCallback(async () => {
    const result = await getPublicPosts(pageable);
    if (result.success) {
      setTotalPages(result.data.totalPages);
      if (pageable.page === 0) {
        setPosts(result.data.content);
      } else {
        setPosts((prev) => [...prev, ...result.data.content]);
      }
    }
  }, [pageable]);

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
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* 게시글 그리드 */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {posts.map((post) => (
            <Grid item key={post.id} size={4} >
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  border:"none"
                }}
                onClick={() => navigate(postPath.to(post.id))}
              >
                <CardContent sx={{ flexGrow: 1,}}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    noWrap
                  >
                    {post.title}
                  </Typography>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  {/* <Typography variant="caption" color="text.secondary">
                    {post.nickName}
                  </Typography> */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                    noWrap
                  >
                    {post.createdAt.split('T')[0]}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 더보기 버튼 */}
      <Box textAlign="center" py={1}>
        <Button
          variant="contained"
          size="small"
          disabled={pageable.page + 1 >= totalPages}
          onClick={handleMore}
        >
          more
        </Button>
      </Box>
    </Box>
  );
}
