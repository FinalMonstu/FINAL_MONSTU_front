import { Box, Modal, Typography,Button, ButtonGroup  } from "@mui/material";
import React from "react";
import { btnSmallBlack } from "../../styles/commonStyle";
import CloseIcon from '@mui/icons-material/Close';

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
                <Button 
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        minWidth: "auto",
                        padding: "4px 8px",
                        color: "black"
                    }}
                    onClick={()=> setOption(prev => ({...prev, isModalOpen : false}))}
                ><CloseIcon/></Button>
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