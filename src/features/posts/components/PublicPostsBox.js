import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";

import { getPublicPosts } from "../PostController";
import { useSnack } from "../../../common/components/MultiSnackBar";
import PageMoreButton from "../../../common/components/custom-styled/PageMoreButton";
import LitePosts from "./LitePosts";



export default function PublicPostsBox() {
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

    // 게시글 조회
    const fetchPosts = useCallback(async () => {
        const { page, size, sortValue, sortOrder } = pageable;

        const { success, message, data } = await getPublicPosts({ page, size, sortValue, sortOrder });
        if (!success){ showSnack('error', message); return; }

        const newContent = page === 0 ? data.content : [...pageable.content, ...data.content];

        setPageable({
            ...pageable,
            content: newContent,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
        });
        }, [pageable.page, pageable.size, pageable.sortValue, pageable.sortOrder]
    );

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    

    return (
        <Box>
            <LitePosts posts={pageable.content} onDelete={handleRemovePost}/>
            <PageMoreButton pageable={pageable} setPageable={setPageable}/>
        </Box>
    );
} 