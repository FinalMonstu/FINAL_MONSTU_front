import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import {
  rootSx,
  listSx,
  listItemSx,
  deleteBtnSx,
  listItemTextSx
} from '../styles/HistorySentenceBoxStyles';

/* 
  역할 : 게시물 페이지 -> 번역 문장 기록 관리 박스
  인증 : 모든 사용자 사용가능
  기능 : 기록 표시 , 기록 삭제 
*/
export default function HistorySentenceBox({ list, handleDelete, sx }) {
  return (
    <Box sx={{ ...rootSx, ...sx }}>
      <List sx={listSx}>
        {list.map(({ createdAt, originalText, translatedText }) => (
          <ListItem key={createdAt} divider sx={listItemSx}>
            <Button
              onClick={() => handleDelete(createdAt)}
              size="small"
              sx={deleteBtnSx}
            >
              ×
            </Button>
            <ListItemText
              primary={originalText}
              secondary={translatedText}
              sx={listItemTextSx}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 