import React from "react";
import ContentBox from "../components/post/ContentBox";
import HistoryWordBox from "../components/post/HistoryWordBox";
import HistorySenBox from "../components/post/HistorySenBox";
import { Box } from "@mui/material";

function PostPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",  // 세로로 정렬
        height: "100vh",          // 화면 전체 높이 사용
        paddingLeft: "35px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,           // 나머지 공간을 차지하도록 설정
          flexDirection: "row",  // 가로로 정렬
        }}
      >
        {/* 왼쪽: ContentBox */}
        <Box sx={{ boxSizing: "border-box", width: "75vw", height: "70vh", padding: "10px",overflowY: "auto" }}>
          <ContentBox />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column"}}>
          <Box sx={{height: "110px"}}>
            {/* 오른쪽 HistoryWordBox 위 빈 Box */}
          </Box>

          {/* 오른쪽: HistoryWordBox */}
          <Box sx={{boxSizing: "border-box",  width: "25vw", height: "70vh",padding: "10px",overflowY: "auto"}}>
            <HistoryWordBox />
          </Box>
        </Box>
        
      </Box>

      {/* 아래쪽 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",  // 가로로 정렬
        }}
      >
        {/* 아래 왼쪽: HistorySenBox */}
        <Box sx={{ boxSizing: "border-box", width: "70vw", height: "30vh", padding: "10px", borderTop: "1px solid #000000",overflowY: "auto" }}>
          <HistorySenBox />
        </Box>

        {/* 아래 오른쪽: 빈 공간 */}
        <Box sx={{ boxSizing: "border-box", width: "30vw", height: "30vh", padding: "10px"}}>
          {/* 빈 영역 */}
        </Box>
      </Box>
    </Box>
  );
}

export default PostPage;
