import { Box, Modal, Button, ButtonGroup, IconButton  } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

/* 
  역할 : 게시물 페이지 -> 게시물에 페이지에 번역기록(단어,문장) 표시 여부 결정
  인증 : 모든 이용자 사용가능
  기능 : 
    단어&문장 번역기록 보이기 / 안보이기 설정
*/
export default function PostOption({isOpen, toggleModal, toggleOption}) {

    const handleClose = () => toggleModal('optionsModal');

    return(
        <Modal
            open={isOpen}
            onClose={handleClose}
            disableEnforceFocus
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Box sx={{
                position: "relative",
                bgcolor: "white",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                width: { xs: "80%", sm: "400px" },
                animation: "fadeIn 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 2            
            }} >

                <IconButton
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button onClick={() => toggleOption("viewWord")}> WORD </Button>
                    <Button onClick={() => toggleOption("viewSentence")}> SENTENCE </Button>
                </ButtonGroup>
            </Box>
        </Modal>
    );
}