import { Box, Modal, Button, ButtonGroup, IconButton  } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {
  modalSx,
  boxSx,
  closeBtnSx,
  titleSx,
  toggleBtnWrapSx,
  toggleBtnSx
} from '../styles/PostOptionStyles';

/* 
  역할 : 게시물 페이지 -> 게시물에 페이지에 번역기록(단어,문장) 표시 여부 결정
  인증 : 모든 이용자 사용가능
  기능 : 단어&문장 번역기록 보이기 / 안보이기 설정
*/
export default function PostOption({isOpen, toggleModal, toggleOption, options}) {
    const handleClose = () => toggleModal('optionsModal');

    return(
        <Modal
            open={isOpen}
            onClose={handleClose}
            disableEnforceFocus
            sx={modalSx}
        >
            <Box sx={boxSx}>
                {/* 플로팅 닫기 버튼 */}
                <IconButton
                    size="large"
                    sx={closeBtnSx}
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>

                {/* 상단 타이틀 */}
                <Box sx={titleSx}>
                    번역 기록 표시 옵션
                </Box>

                {/* 토글 스위치형 버튼 */}
                <Box sx={toggleBtnWrapSx}>
                    <ToggleButton
                        label="단어 기록"
                        onClick={() => toggleOption("viewWord")}
                        active={!!options?.viewWord}
                    />
                    <ToggleButton
                        label="문장 기록"
                        onClick={() => toggleOption("viewSentence")}
                        active={!!options?.viewSentence}
                    />
                </Box>
            </Box>
        </Modal>
    );
}

// 토글 스위치형 버튼 컴포넌트
function ToggleButton({ label, onClick, active }) {
    return (
        <Button
            onClick={onClick}
            sx={toggleBtnSx(active)}
        >
            {label}
        </Button>
    );
}