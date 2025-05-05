import { Box, Modal, Typography, Button, ButtonGroup, TextField, Paper, Switch, FormControlLabel } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function PostInputModal({ option, setOption, post, setPost, savePost }) {
  const [tempPost, setTempPost] = useState({ title: "", content: "" });
  const [saveBool, setSaveBool] = useState(false);

  // 입력값 업데이트
  const handleChange = useCallback((field, value) => { setTempPost((prev) => ({ ...prev, [field]: value, })); }, []);

  // 저장 버튼 클릭 시, 부모의 post 업데이트 및 모달 닫기
  const handleSave = () => {
    const updatedPost = {
      ...post,
      title: tempPost.title,
      content: tempPost.content
    };
    setPost( updatedPost  );
    setOption((prev) => ({ ...prev, isModalOpen: false }));
    if(saveBool) { savePost(updatedPost ); }
  }

  // Switch change 핸들러
  const handleToggleSave = (event) => {
    setSaveBool(event.target.checked);
  };

  useEffect(()=>{
    console.log("saveBool Object:", JSON.stringify(saveBool, null, 2));
  },[saveBool])

  return (
    <Modal
      open={option.isModalOpen}
      onClose={() => setOption((prev) => ({ ...prev, isModalOpen: false }))}
      disableEnforceFocus
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "70vw" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-required"
          label="Title"
          value={tempPost.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextField
          required
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={10}
          value={tempPost.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />

        {/* 데이터베이스에 저장 옵션 스위치 */}
        <FormControlLabel
          control={
            <Switch
              checked={saveBool}
              onChange={handleToggleSave}
            />
          }
          label="데이터베이스에 저장"
          sx={{ ml: 5 }}
        />

        <ButtonGroup sx={{ display: "flex", gap: 0, mt: 2 }}>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "#333" },
              border:"none",
            }}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Insert
          </Button>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "#333" },
              border:"none",
            }}
            variant="outlined"
            color="secondary"
            onClick={() => setOption((prev) => ({ ...prev, isModalOpen: false }))}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Paper>
    </Modal>
  );
}
