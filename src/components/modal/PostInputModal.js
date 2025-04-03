import { Box, Modal, Typography,Button, ButtonGroup, TextField, Paper  } from "@mui/material";
import React, { useState } from "react";

export default function PostInputModal({option,setOption,setPost}) {
    const title = "title"
    const content =  "content"

    const [tempPost, setTempPost] = useState({ title: "", content: "" });

    // tempPost 속성 초기화화
    const handleChange = (field, value) => {
        setTempPost(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // 저장 버튼을 클릭하면 post를 업데이트
    const handleSave = () => {
        setPost(prev => ({
            ...prev,
            title: tempPost.title,
            content: tempPost.content
        }));
        setOption(prev => ({ ...prev, isModalOpen: false }))
    };

    return(
        <Modal
            open={option.isModalOpen}
            onClose={() => setOption(prev => ({ ...prev, isModalOpen: false }))}
            disableEnforceFocus
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                component="form"
                sx={{ 
                    '& .MuiTextField-root': { m: 1, width: '70vw'},
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", 
                    padding:3
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-required"
                    label="Title"
                    value={tempPost.title}
                    onChange={(e) => handleChange(title, e.target.value)}
                />
                <TextField
                    required
                    id="outlined-multiline-static"
                    label="Content"
                    multiline
                    rows={10}
                    value={tempPost.content}
                    onChange={(e) => handleChange(content, e.target.value)}
                />
                <ButtonGroup sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        저장
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => setOption(prev => ({ ...prev, isModalOpen: false }))}>
                        취소
                    </Button>
                </ButtonGroup>
            </Paper>
        </Modal>
    );
}