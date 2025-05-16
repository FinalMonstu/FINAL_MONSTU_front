import { Modal, Button, ButtonGroup, TextField, Paper, Switch, FormControlLabel} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

/* 
  역할 : 게시물 페이지 -> 게시물 삽입/저장장
  인증 : 
    게시물 삽입 -> 모든 이용자 사용가능
    게시물 저장 -> 인증 이용자자 사용가능
  기능 : 
    입력한 title, content 정보 게시물에 적용
    입력한 정보 데이터베이스에 저장/수정정
*/
export default function PostInputModal({ isOpen, toggleOption, post, setPost, savePost }) {
  const [tempPost, setTempPost] = useState({ title: post.title || '', content: post.content || '' });
  const [autoSave, setAutoSave] = useState(false);

  const handleClose = () => toggleOption("inputModal");

  // 입력값 업데이트
  const handleChange = useCallback((field) => (e) => { setTempPost((prev) => ({ ...prev, [field]: e.target.value })); }, []);
  const handleToggleAutoSave = useCallback((e) => { setAutoSave(e.target.checked); }, []);

  // 저장 버튼 클릭 시, 부모의 post 업데이트 및 모달 닫기
  const save = useCallback(() => {
    const updated = { ...post, ...tempPost };
    console.log("updated Object:", JSON.stringify(updated, null, 2));
    if (autoSave) savePost(updated);
    setPost(updated)
    handleClose();
  }, [post, setPost, tempPost, autoSave]);


  useEffect(() => {
    setTempPost({ title: post.title || '', content: post.content || '' });
  }, [post]);


  // Log
  useEffect(()=>{
    console.log("autoSave Object:", JSON.stringify(autoSave, null, 2));
  },[autoSave])


  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      disableEnforceFocus
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          width: { xs: '90%', sm: 500 },
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 2,
        }}
      >

        <TextField
          label="Title"
          value={tempPost.title}
          onChange={handleChange('title')}
          fullWidth
        />

        <TextField
          label="Content"
          value={tempPost.content}
          onChange={handleChange('content')}
          fullWidth
          multiline
          rows={8}
        />

        <FormControlLabel
          control={<Switch checked={autoSave} onChange={handleToggleAutoSave} />}
          label="내 페이지에 저장"
        />

        <ButtonGroup sx={{ alignSelf: 'flex-end' }}>
          <Button variant="contained" onClick={save}>
            저장
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </ButtonGroup>
      </Paper>
    </Modal>
  );
}
