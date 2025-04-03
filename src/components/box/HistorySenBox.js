import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

function HistorySenBox({list}) {
  return (
    <Box elevation={0} sx={{ padding: 2, margin: "auto" }}>
      <List>
        {list.map((item, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={item.target}
              secondary={item.transed}
              primaryTypographyProps={{ fontWeight: "bold" }}
              secondaryTypographyProps={{ color: "gray" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default HistorySenBox;
