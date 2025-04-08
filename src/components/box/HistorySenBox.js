import React, { memo } from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";

function HistorySenBox({ list, handleDelete }) {
  return (
    <Box sx={{ p: 2, m: "auto" }}>
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

export default memo(HistorySenBox);
