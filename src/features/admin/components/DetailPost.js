import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Modal, Paper, Button, TextField, Typography, Divider } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";

import { useSnack } from "../../../common/components/MultiSnackBar";
import { getDetailPostAPI, updatePostAPI } from "../AdminController";
import { UpdateSchema } from "../../../features/posts/hooks/PostSchema";
import BooleanSelector from "../../preset/components/BooleanSelector";
import {
    modalSx,
    paperSx,
    containerSx,
    titleSx,
    sectionTitleSx,
    inputGridSx,
    publicSettingSx,
    publicLabelSx,
    contentBoxSx,
    buttonContainerSx,
    submitButtonSx,
    cancelButtonSx
} from '../styles/DetailPostStyles';

export default function DetailPost({ postId, setter, refreshList }){
    const showSnack = useSnack();
    const [postInfo,setPostInfo] = useState(null)

    const initialValues = useMemo(() => ({
            postId:      postId,
            title:       postInfo?.title       ?? "",
            content:     postInfo?.content     ?? "",
            createdAt:   postInfo?.createdAt   ?? "",
            modifiedAt:  postInfo?.modifiedAt  ?? "",
            isPublic:    postInfo?.isPublic    ? true : false,
            authorId:    postInfo?.authorId    ?? "",
            nickName:    postInfo?.nickName    ?? "",
            logId:       postInfo?.logId       ?? "",
            viewCount:   postInfo?.viewCount   ?? "",
            lastViewedAt:postInfo?.lastViewedAt?? "",
        }), [postId, postInfo]);


    // 멤버 ID 사용, 멤버 정보 조회 API & postInfo 값 삽입
    const fetch = useCallback(async (id) => {
        const result = await getDetailPostAPI(id);
        if(result.success) setPostInfo(result.data);
    }, []);


    // 수정 API
    const handleSubmit = useCallback(async (dto) => {
        const updatePost = {
            id : dto.postId,
            title : dto.title,
            content : dto.content,
            isPublic : dto.isPublic
        }
        const {success, message} = await updatePostAPI(updatePost);
        if(success){
            showSnack("info", message);
            setter(null);
            refreshList();
        }else{
            alert("수정에 실패했습니다.");
        }
    }, []);


    useEffect(()=>{ if(postId) fetch(postId) },[postId])
    
    return (
        <Modal
            open={postId!=null}
            onClose={() => setter(null)}
            disableEnforceFocus
            sx={modalSx}
        >
            <Paper
                component="div"
                sx={paperSx}
            >
                <Box sx={containerSx}>
                    <Typography variant="h5" component="h2" sx={titleSx}>
                        게시글 정보 수정
                    </Typography>
                    
                    <Divider sx={{ mb: 3 }} />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={UpdateSchema} 
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={sectionTitleSx}>
                                    기본 정보
                                </Typography>
                                <Box sx={inputGridSx}>
                                    <TextField
                                        name="postId"
                                        label="게시글 ID"
                                        required
                                        value={values.postId}
                                        slotProps={{ input: { readOnly: true } }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="authorId"
                                        label="작성자 ID"
                                        value={values.authorId}
                                        slotProps={{ input: { readOnly: true } }}
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={sectionTitleSx}>
                                    생성/수정 정보
                                </Typography>
                                <Box sx={inputGridSx}>
                                    <TextField
                                        name="createdAt"
                                        label="생성일시"
                                        required
                                        value={values.createdAt}
                                        slotProps={{ input: { readOnly: true } }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="modifiedAt"
                                        label="수정일시"
                                        value={values.modifiedAt}
                                        slotProps={{ input: { readOnly: true } }}
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={publicSettingSx}>
                                    <Typography variant="body1" sx={publicLabelSx}>
                                        공개 여부:
                                    </Typography>
                                    <BooleanSelector 
                                        value={values.isPublic}
                                        onChange={newValue => setFieldValue("isPublic", newValue)}
                                        allowNone={false}
                                        label={""}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={sectionTitleSx}>
                                    조회 정보
                                </Typography>
                                <Box sx={inputGridSx}>
                                    <TextField
                                        name="viewCount"
                                        label="조회수"
                                        value={values.viewCount}
                                        slotProps={{ input: { readOnly: true } }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="lastViewedAt"
                                        label="마지막 조회일시"
                                        value={values.lastViewedAt}
                                        slotProps={{ input: { readOnly: true } }}
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={sectionTitleSx}>
                                    게시글 내용
                                </Typography>
                                <Box sx={contentBoxSx}>
                                    <TextField
                                        name="title"
                                        label="제목"
                                        required
                                        value={values.title}
                                        onChange={e => setFieldValue("title", e.target.value)}
                                        error={touched.title && Boolean(errors.title)}
                                        helperText={<ErrorMessage name="title" />}
                                        fullWidth
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        label="내용"
                                        value={values.content}
                                        onChange={e => setFieldValue("content", e.target.value)}
                                        fullWidth
                                        multiline
                                        rows={8}
                                        error={touched.content && Boolean(errors.content)}
                                        helperText={<ErrorMessage name="content" />}
                                    />
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={buttonContainerSx}>
                                <Button
                                    type="submit"
                                    sx={submitButtonSx}
                                    variant="contained"
                                >
                                    수정 완료
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setter(null)}
                                    sx={cancelButtonSx}
                                    variant="outlined"
                                >
                                    취소
                                </Button>
                            </Box>
                        </Form>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Modal>
    );
}