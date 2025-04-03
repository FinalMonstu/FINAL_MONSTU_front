import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

function HistorySenBox({list}) {
  return (
    <Box elevation={0} sx={{ padding: 2, margin: "auto" }}>
      <List>
        {list.length > 0 ? (
            list.map(({ target, transed }, index) => (
              <ListItem key={index} divider>
                <ListItemText sx={{ 
                    "& .MuiListItemText-primary": { fontWeight: "bold" }, 
                    "& .MuiListItemText-secondary": { color: "gray" } 
                  }}
                  primary={target}
                  secondary={transed}
                />
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: 100,
              "& .MuiListItemText-primary": { fontWeight: "bold" }, 
            }}>
              <ListItemText primary="No history available" />
            </ListItem>
          )}
      </List>
    </Box>
  );
}

export default HistorySenBox;
