import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { trans } from "../../hoooks/controller/AiController";
import { getLangList } from "../../hoooks/controller/PreSetController";

function ContentBox() {
  const [highlightedText, setHighlightedText] = useState("");
  
  

  // onMouseUp 이벤트트 
  const handleHighlightText = () => {
    const selection = window.getSelection().toString();  // 선택된 텍스트 가져오기
    if (selection) {
      setHighlightedText(selection);  // 선택된 텍스트를 상태 변수에 저장
      console.log("highlightedText: "+selection);
    }
  };

  const transText = async () => {
    const result = await trans();
  }

  

  return (
    <Box sx={{padding: "40px"}} onMouseUp={handleHighlightText}>
      <Typography sx={{ whiteSpace: "pre-wrap" }}>
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
        Walking down 29th and ParkI saw you in another's armsOnly a month we've been 
      </Typography>
    </Box>
  );
}

export default ContentBox;
