import React from "react";
import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

function HistoryWordBox({list,handleDelete}) {
  return (
    <Box elevation={0} sx={{ padding: 2, maxWidth: 400, margin: "auto" }}>
      <List>
        {list.map((item, index) => (
          <ListItem key={index} divider>
            <Button onClick={() => handleDelete(item.target)}>x</Button>
            <ListItemText sx={{ 
                "& .MuiListItemText-primary": { fontWeight: "bold" }, 
                "& .MuiListItemText-secondary": { color: "gray" } 
              }}
              primary={item.target}
              secondary={item.transed}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default HistoryWordBox;
