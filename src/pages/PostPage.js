import React, { useEffect, useState } from "react";
import ContentBox from "../components/post/ContentBox";
import HistoryWordBox from "../components/post/HistoryWordBox";
import HistorySenBox from "../components/post/HistorySenBox";
import { Box, Button, Typography } from "@mui/material";
import CountrySelect from "../components/preset/LanguageSelect";
import LanguageSelect from "../components/preset/LanguageSelect";

function PostPage() {
  const [translation, setTranslation] = useState({
    target: "",    // 번역할 단어 또는 문장
    transed: "", // 번역된 단어 또는 문장
    oriLang: "",      // 원본 언어
    transLang: "",    // 번역된 언어
    type: ""        // "word" 또는 "sentence"
  }); 

  const updateTranslation = (field, value) => {
    setTranslation((prev) => ({
      ...prev,   
      [field]: value,  
    }));
  };

  useEffect(()=>{
    console.log("Translation Object:", JSON.stringify(translation, null, 2));
  },[translation])

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Title_Section & Menu_Option_Bar */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
      }}>
          <Typography variant="h3" sx={{
            background:"green",
            boxSizing: "border-box",
            width: "75vw",
            height: "5vh",
            paddingLeft: "40px",
            overflowY: "auto",
            fontWeight: "bold"
          }}>
          Ed Sheeran - Happier
          </Typography>
          <Box sx={{
            background:"red",
            boxSizing: "border-box",
            width: "25vw",
            height: "5vh",
            display: "flex",
            flexDirection: "row",
          }}>
            <LanguageSelect translation={translation} updateTranslation={updateTranslation} type="ori"/>
            to
            <LanguageSelect translation={translation} updateTranslation={updateTranslation} type="trans"/>
          </Box>
      </Box>

      {/* Content_Section & History_Words */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
      }}>
        <Box sx={{
          background:"red",
          boxSizing: "border-box",
          width: "75vw",
          height: "60vh",
          overflowY: "auto"
        }}>
          <ContentBox/>
        </Box>
        <Box sx={{
          background:"green",
          boxSizing: "border-box",
          width: "25vw",
          height: "60vh",
          overflowY: "auto"
        }}>
          <HistoryWordBox/>
        </Box>
      </Box>

      {/* Upload,GoNext_Button & empty_Box*/}
        <Box sx={{
          display: "flex",
          flexDirection: "row",
        }}>
          <Box sx={{
            background:"green",
            boxSizing: "border-box",
            width: "75vw",
            height: "3.5vh",
            overflowY: "auto"
          }}>
            <Button variant="contained">+</Button> 
            <Button variant="contained">_</Button>
          </Box>
          <Box sx={{
            background:"red",
            boxSizing: "border-box",
            width: "25vw",
            height: "3.5vh",
            overflowY: "auto"
          }}>
            {/* Empty Box */}
          </Box>
        </Box>

        {/* History_Sentences_Section & empty_Box */}
        <Box sx={{
          display: "flex",
          flexDirection: "row",
        }}>
          <Box sx={{
            background:"red",
            boxSizing: "border-box",
            width: "75vw",
            height: "25vh",
            overflowY: "auto"
          }}>
            <HistorySenBox/>
          </Box>
          <Box sx={{
            background:"green",
            boxSizing: "border-box",
            width: "25vw",
            height: "25vh",
            overflowY: "auto"
          }}>
            {/* Empty_Box */}
          </Box>
        </Box>
    </Box>
  );
}

export default PostPage;
