// PostPage 전용 스타일 (MUI sx prop용)

export const rootSx = {
  minHeight: '100vh',
  bgcolor: '#f7f8fa',
  display: 'flex',
  flexDirection: 'column',
};

export const headerSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 4, py: 2,
  bgcolor: '#fff',
  boxShadow: 1,
  borderRadius: 2,
  mb: 2,
};

export const headerTitleSx = {
  fontWeight: 'bold',
};

export const headerRightSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const contentWrapSx = {
  display: 'flex',
  flex: 1,
  gap: 2,
  px: 4,
  pb: 4,
};

export const contentSx = {
  flex: 3,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 1,
  p: 3,
  minHeight: 400,
  overflowY: 'auto',
};

export const historyWrapSx = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minHeight: 400,
};

export const historyBoxSx = {
  flex: 1,
  display: 'flex',
}; 