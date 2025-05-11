import { Box, Typography } from "@mui/material";

// 커스텀 입력 컴포넌트 스타일
// 라벨 + 입력 필드 래퍼
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