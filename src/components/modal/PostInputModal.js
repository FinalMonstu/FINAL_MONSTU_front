import { Box, Modal, Typography, Button, ButtonGroup, TextField, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";

export default function PostInputModal({ option, setOption, setPost }) {
  const [tempPost, setTempPost] = useState({ title: "", content: "" });

  // 입력값 업데이트
  const handleChange = useCallback((field, value) => {
    setTempPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // 저장 버튼 클릭 시, 부모의 post 업데이트 및 모달 닫기
  const handleSave = useCallback(() => {
    setPost((prev) => ({
      ...prev,
      title: tempPost.title,
      content: tempPost.content,
    }));
    setOption((prev) => ({ ...prev, isModalOpen: false }));
  }, [tempPost]);

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
