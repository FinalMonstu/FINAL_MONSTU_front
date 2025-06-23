import { Box, Typography } from "@mui/material";

export const LabelWithInput = ({ label, sub, children }) => (
    <Box>
      <Typography variant="h6" sx={{ mb: -0.5 }}>
        {label}{" "}
        {sub && (
          <Typography component="span" variant="body2" color="text.secondary">
            {sub}
          </Typography>
        )}
      </Typography>
      {children}
    </Box>
  );