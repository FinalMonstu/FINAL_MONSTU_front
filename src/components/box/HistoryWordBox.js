import React, { memo } from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";

function HistoryWordBox({ list, handleDelete }) {
  return (
    <Box sx={{ p: 2, maxWidth: 400, margin: "auto" }}>
      <List>
        {list.map((item) => (
          <ListItem key={item.target} divider>
            <Button onClick={() => handleDelete(item.target)}>x</Button>
            <ListItemText
              primary={item.target}
              secondary={item.transed}
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

export default memo(HistoryWordBox);
