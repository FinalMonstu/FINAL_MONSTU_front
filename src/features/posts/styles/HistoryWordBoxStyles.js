// HistoryWordBox 전용 스타일 (MUI sx prop용)

export const rootSx = {
  flex: 1,
  height: '100%',
  p: 0,
  bgcolor: 'transparent',
  boxShadow: 'none',
};

export const listSx = {
  height: '100%',
  p: 0,
  m: 0,
};

export const listItemSx = {
  borderRadius: 2,
  mb: 1,
  bgcolor: '#f8fbff',
  boxShadow: '0 1px 4px 0 rgba(25, 118, 210, 0.04)',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  py: 1.2,
};

export const deleteBtnSx = {
  minWidth: 28,
  width: 28,
  height: 28,
  bgcolor: '#e3f2fd',
  color: '#1976d2',
  borderRadius: '50%',
  fontWeight: 700,
  fontSize: 16,
  mr: 1.5,
  '&:hover': { bgcolor: '#bbdefb', color: '#0d47a1' },
};

export const listItemTextSx = {
  '& .MuiListItemText-primary': { fontWeight: 700, fontSize: 16, color: '#222' },
  '& .MuiListItemText-secondary': { color: '#1976d2', fontWeight: 500, fontSize: 14, mt: 0.5 },
}; 