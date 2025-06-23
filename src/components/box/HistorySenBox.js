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
        {list.length > 0 ? (
          list.map(({ target, transed }) => (
            <ListItem key={target} divider>
              <Button onClick={() => handleDelete(target)}>x</Button>
              <ListItemText
                primary={target}
                secondary={transed}
                sx={{
                  "& .MuiListItemText-primary": { fontWeight: "bold" },
                  "& .MuiListItemText-secondary": { color: "gray" },
                }}
              />
            </ListItem>
          ))
        ) : (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: 100,
              "& .MuiListItemText-primary": { fontWeight: "bold" },
            }}
          >
            <ListItemText primary="No history available" />
          </ListItem>
        )}
      </List>
    </Box>
  );
}