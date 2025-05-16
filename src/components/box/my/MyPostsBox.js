import { useSnack } from "../../popup/MultiSnackBar";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import { deletePost, myPosts } from "../../../hooks/controller/PostController";
import LitePosts from "../../table/LitePosts";
import DateOptionSelector from "../../selecter/DateOptionSelector";
import PageMoreButton from "../../button/PageMoreButton";

export default function MyPostsBox() {
  const showSnack = useSnack();

  const [pageable, setPageable] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        page: 0,
        size: 6,
        sortValue: "createdAt",
        sortOrder: "desc",
  });

  const handleRemovePost = (deletedId) => {
    setPageable((prev) => ({
      ...prev,
      content: prev.content.filter((p) => p.id !== deletedId),
      totalElements: prev.totalElements - 1
    }));
  };

  const fetchPosts = useCallback(async () => {
    const { page, size, sortValue, sortOrder } = pageable;

    const { success, message, data } = await myPosts({ page, size, sortValue, sortOrder });
    if (!success){ showSnack('error', message); return; }
    const newContent = page === 0 ? data.content : [...pageable.content, ...data.content];
    setPageable({
      ...pageable,
      content: newContent,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    });
  }, [pageable.page, pageable.size, pageable.sortValue, pageable.sortOrder]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleSortValueChange = (e) => {
    setPageable((prev) => ({
      ...prev,
      sortValue: e.target.value,
      page: 0,
      content: [],
    }));
  };

  const handleSortToggle = () => {
    setPageable((prev) => ({
      ...prev,
      sortOrder: (prev.sortOrder === "desc") ? "asc" : "desc",
      page: 0,
      content: [],
    }));
  };

  return (
    <Box>
      {/* ── 헤더 (정렬) */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} gap={1}>
        <Button variant="outlined" size="small" onClick={handleSortToggle}>
          {pageable.sortOrder === "asc" ? "오래된 순" : "최신 순"}
        </Button>

        {/* 정렬 값 선택 */}
        <DateOptionSelector 
          value={pageable.sortValue} 
          onChange={handleSortValueChange}
          values={['createdAt','modifiedAt']}
          allowNone={false}
        />
      </Box>

      {/* 게시물 리스트 */}
      <LitePosts posts={pageable.content} onDelete={handleRemovePost}/>
      <PageMoreButton pageable={pageable} setPageable={setPageable}/>
    </Box>
  );
}
