import { Box, Button, List, ListItem, ListItemText } from "@mui/material";

/* 
  역할 : 게시물 페이지 -> 번역 단어 기록 관리 박스
  인증 : 모든 사용자 사용가능
  기능 : 단어 표시 ,단어 삭제 
*/
export default function HistoryWordBox({ list, handleDelete }) {
  return (
    <Box sx={{ p: 3, maxHeight: 800, overflowY: 'auto','&::-webkit-scrollbar':{display: 'none'}, }}>
      <List>
        {list.map((item) => (
          <ListItem key={item.target} divider>

            <Button onClick={() => handleDelete(item.target)}>x</Button>

            <ListItemText
              primary={item.target}
              secondary={item.transed}
              sx={{ "& .MuiListItemText-primary": { fontWeight: "bold" }, "& .MuiListItemText-secondary": { color: "gray" } }}
            />
            
          </ListItem>
        ))}
      </List>
    </Box>
  );
}