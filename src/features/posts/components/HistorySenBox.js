import { Box, Button, List, ListItem, ListItemText } from "@mui/material";

/* 
  역할 : 게시물 페이지 -> 번역 문장 기록 관리 박스
  인증 : 모든 사용자 사용가능
  기능 : 기록 표시 , 기록 삭제 
*/
export default function HistorySenBox({ list, handleDelete }) {
  return (
    <Box sx={{ p: 3, maxHeight: 180, overflowY: 'auto','&::-webkit-scrollbar':{display: 'none'}, }}>
      <List>
          {list.map(({ createdAt, originalText, translatedText }) => (
            <ListItem key={createdAt} divider>
              <Button onClick={() => handleDelete(createdAt)}>x</Button>
              <ListItemText
                primary={originalText}
                secondary={translatedText}
                sx={{
                  "& .MuiListItemText-primary": { fontWeight: "bold" },
                  "& .MuiListItemText-secondary": { color: "gray" },
                }}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
}