import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Paper, Button, ButtonGroup, TextField, Divider } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { btnBlack } from "../../../styles/commonStyle";
import { useSnack } from "../../popup/MultiSnackBar";
import { getDetailPostAPI, updatePostAPI } from "../../../hooks/controller/PostController";
import { UpdateSchema } from "../../../hooks/schema/PostSchema";
import BooleanSelector from "../../selecter/BooleanSelector";

export default function DetailPost({ postId, setter }){
    const showSnack = useSnack();
    const [postInfo,setPostInfo] = useState(null)

    const initialValues = useMemo(() => ({
            postId:          postId,
            title:       postInfo?.title       ?? "",
            content:     postInfo?.content     ?? "",
            createdAt:   postInfo?.createdAt   ?? "",
            modifiedAt:  postInfo?.modifiedAt  ?? "",
            isPublic:    postInfo?.isPublic ? true : false,
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
        }else{
            alert("수정에 실패했습니다.");
        }
    }, []);


    useEffect(()=>{
        if(postId) fetch(postId);
    },[postId])
    
    // Log
    useEffect(()=>{
        console.log("postInfo.data:", JSON.stringify(postInfo, null, 2));
    },[postInfo])


    return (
            <Modal
                open={postId!=null}
                onClose={() => setter(null)}
                disableEnforceFocus
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Paper
                    component="div"
                    sx={{
                        width: { xs: '90%', sm: 600 },
                        p: 3,
                        '& .MuiTextField-root': { m: 1, width: 'calc(50% - 16px)' },
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={UpdateSchema} 
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                            <TextField
                                name="postId"
                                label="postId"
                                required
                                value={values.postId}
                                slotProps={{ input: { readOnly: true } }}
                            />

                            <Divider sx={{ mb: 4, borderColor: '#C0C0C0' }} />

                            <TextField
                                name="createdAt"
                                label="createdAt"
                                required
                                value={values.createdAt}
                                slotProps={{ input: { readOnly: true } }}
                            />
                            <TextField
                                name="modifiedAt"
                                label="modifiedAt"
                                value={values.modifiedAt}
                                slotProps={{ input: { readOnly: true } }}
                            />

                            <Divider sx={{ mb: 4, borderColor: '#C0C0C0' }} />
    
                            <BooleanSelector 
                                value={values.isPublic}
                                onChange={newValue => setFieldValue("isPublic", newValue)}
                                allowNone={false}
                                label={"isPublic"}
                            />

                            <Divider sx={{ mb: 4, borderColor: '#C0C0C0' }} />

                            <TextField
                                name="viewCount"
                                label="viewCount"
                                value={values.viewCount}
                                slotProps={{ input: { readOnly: true } }}
                            />
                            <TextField
                                name="lastViewedAt"
                                label="lastViewedAt"
                                value={values.lastViewedAt}
                                slotProps={{ input: { readOnly: true } }}
                            />

                            <Divider sx={{ mb: 4, borderColor: '#C0C0C0' }} />

                            <TextField
                                name="title"
                                label="title"
                                required
                                value={values.title}
                                onChange={e => setFieldValue("title", e.target.value)}
                                error={touched.title && Boolean(errors.title)}
                                helperText={<ErrorMessage name="title" />}
                            />
                            <TextField
                                label="content"
                                value={values.content}
                                onChange={e => setFieldValue("content", e.target.value)}
                                fullWidth
                                multiline
                                rows={8}
                                error={touched.content && Boolean(errors.content)}
                                helperText={<ErrorMessage name="content" />}
                            />

                            <ButtonGroup sx={{ mt: 2 }} fullWidth>
                                <Button
                                    type="submit"
                                    sx={{ ...btnBlack, mr : 0.3}}    
                                    variant="contained"
                                >
                                    Update
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setter(null)}
                                    sx={{ ...btnBlack}}
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Form>
                        )}
                    </Formik>
                </Paper>
            </Modal>
        );
}