import React, { useCallback, useEffect, useState } from "react";
import { Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deletePostById, getUserPosts } from "../../hooks/controller/PostController";
import { useNavigate } from "react-router-dom";
import { postPath } from "../../hooks/urlManager";

export default function MyPosts() {
    const navigate = useNavigate(); 
    const [pageable, setPageable] = useState({
        page: 0,
        size: 6,
        sort: "createdAt,asc",
    });
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // API 호출 함수
    const fetchPostsAPI = useCallback(async () => {
        const result = await getUserPosts(pageable);
        if (result.success) {
        setTotalPages(result.data.totalPages);
        if (pageable.page === 0) { setPosts(result.data.content); } 
        else { setPosts(prev => [...prev, ...result.data.content]); }
        }
    }, [pageable]);

    // 정렬 변경 핸들러
    const handleSortChange = (e) => {
        setPageable((prev) => ({
        ...prev,
        sort: e.target.value,
        page: 0,           // 정렬 변경 시 1페이지로 리셋
        }));
    };

    // 공개/비공개 변경 (TODO: 실제 API 연동)
    //   const handleVisibilityChange = (id) => (e) => {
    //     console.log("change visibility for", id, "->", e.target.value);
    //   };

    // 삭제 (TODO: 실제 API 연동)
    const handleDelete = useCallback(async (id) => {
        const result = await deletePostById(id);
        if (result.success) { setPosts(prev => prev.filter(post => post.id !== id)); }
    }, []);

    // more 버튼: 다음 페이지로 증가시키고 다시 페치
    const handleMoreBtn = () => {
        if (pageable.page + 1 < totalPages) {
                setPageable((prev) => ({
                ...prev,
                page: prev.page + 1,
            }));
        }
    };

    // 초기, 그리고 pageable이 바뀔 때마다 호출
    useEffect(() => {
        fetchPostsAPI();
    }, [fetchPostsAPI])

    useEffect(() => {
        console.log("pageable Object:", JSON.stringify(pageable, null, 2));
        console.log("totalPages Object:", JSON.stringify(totalPages, null, 2));
    }, [pageable,totalPages]);

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* 상단 정렬 드롭다운 */}
            <Box display="flex" justifyContent="flex-end" mb={1}>
                <FormControl size="small">
                <Select value={pageable.sort} onChange={handleSortChange}>
                    <MenuItem value="createdAt,asc">작성일 ↑</MenuItem>
                    <MenuItem value="createdAt,desc">작성일 ↓</MenuItem>
                </Select>
                </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                {posts.map((post) => (
                <Box
                    key={post.id}
                    display="flex"
                    alignItems="center"
                    bgcolor="#f5f5f5"
                    borderRadius={1}
                    p={2}
                    mb={1}
                    onClick={() => navigate(`${postPath.post}/${post.id}`)}
                >
                    {/* 삭제 버튼 */}
                    <IconButton size="small" onClick={() => handleDelete(post.id)}>
                    <CloseIcon fontSize="small" />
                    </IconButton>

                    {/* 제목 + 날짜 */}
                    <Box flexGrow={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            작성일 {new Date(post.createdAt).toLocaleDateString()}　
                            수정일 {new Date(post.modifiedAt).toLocaleDateString()}
                        </Typography>
                    </Box>

                    {/* 공개/비공개 선택 */}
                    {/* <FormControl size="small" sx={{ ml: 1, minWidth: 100 }}>
                    <Select
                        value={post.isPublic ? "public" : "private"}
                        onChange={handleVisibilityChange(post.id)}
                    >
                        <MenuItem value="private">private</MenuItem>
                        <MenuItem value="public">public</MenuItem>
                    </Select>
                    </FormControl> */}
                </Box>
                ))}
            </Box>

            {/* more 버튼 */}
            <Box textAlign="center" py={1}>
                <Button
                variant="contained"
                size="small"
                disabled={pageable.page + 1 >= totalPages}
                onClick={handleMoreBtn}
                >
                more
                </Button>
            </Box>
        </Box>
    );
}
