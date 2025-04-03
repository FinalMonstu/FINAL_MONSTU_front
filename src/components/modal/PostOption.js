import { Box, Modal, Typography,Button, ButtonGroup  } from "@mui/material";
import React from "react";

export default function PostOption({option,setOption}) {
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
            <Box
                sx={{
                bgcolor: "white",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                width: { xs: "80%", sm: "400px" }, // 반응형 크기 설정
                animation: "fadeIn 0.3s ease-in-out", // 애니메이션 효과
                }}
            >
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button onClick={()=> setOption(prev => ({...prev, viewWord : false, viewSentence : false}))}>NONE</Button>
                    <Button onClick={() => setOption(prev => ({ ...prev, viewWord : !prev.viewWord }))}> WORD </Button>
                    <Button onClick={() => setOption(prev => ({ ...prev, viewSentence : !prev.viewSentence }))}> SENTENCE </Button>
                    <Button onClick={()=> setOption(prev => ({...prev, viewWord : true, viewSentence : true}))}>All</Button>
                </ButtonGroup>
            </Box>
        </Modal>
    );
}