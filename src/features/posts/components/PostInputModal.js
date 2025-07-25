import { Modal, Button, ButtonGroup, TextField, Paper, Switch, FormControlLabel} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  modalSx,
  paperSx,
  titleSx,
  labelSx,
  labelContentSx,
  textFieldSx,
  textAreaSx,
  switchWrapSx,
  saveBtnSx,
  cancelBtnSx,
  btnRowSx,
  switchSx
} from '../styles/PostInputModalStyles';

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
  const [tempPost, setTempPost] = useState({ 
      title   : post.title   || '', 
      content : post.content || '' 
    });
  const [autoSave, setAutoSave] = useState(false);

  const handleClose = () => toggleOption("inputModal");

  const handleChange = useCallback((field) => (e) => { setTempPost((prev) => ({ ...prev, [field]: e.target.value })); }, []);

  const handleToggleAutoSave = useCallback((e) => { setAutoSave(e.target.checked); }, []);

  // 저장 버튼 클릭 시
  const save = useCallback(() => {
    const updated = { ...post, ...tempPost };
    (autoSave)
      ? savePost(updated) // DB 저장
      : setPost(updated); // 로컬 상태만 변경
    handleClose();
  }, [tempPost, autoSave, savePost, setPost, post]);

  
  useEffect(() => {
    setTempPost({ title: post.title || '', content: post.content || '' });
  }, [post]);


  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      disableEnforceFocus
      sx={modalSx}
    >
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={paperSx}
      >
        <div style={titleSx}>게시물 작성/수정</div>
        <div style={labelSx}>제목</div>
        <TextField
          placeholder="제목을 입력하세요"
          value={tempPost.title}
          onChange={handleChange('title')}
          fullWidth
          variant="outlined"
          sx={textFieldSx}
        />
        <div style={labelContentSx}>내용</div>
        <TextField
          placeholder="내용을 입력하세요"
          value={tempPost.content}
          onChange={handleChange('content')}
          fullWidth
          multiline
          rows={7}
          variant="outlined"
          sx={textAreaSx}
        />
        <div style={switchWrapSx}>
          <FormControlLabel
            control={<Switch checked={autoSave} onChange={handleToggleAutoSave} sx={switchSx} />}
            label={<span style={{ color: '#1976d2', fontWeight: 600, fontSize: 15 }}>내 페이지에 저장</span>}
            sx={{ m: 0 }}
          />
        </div>
        <div style={btnRowSx}>
          <Button
            variant="contained"
            onClick={()=> save()}
            sx={saveBtnSx}
          >
            저장
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={cancelBtnSx}
          >
            취소
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}
