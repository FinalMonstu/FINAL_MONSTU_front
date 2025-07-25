// LitePost 전용 스타일 (MUI sx prop용)

export const rootSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  p: { xs: 1, sm: 2 },
  bgcolor: 'transparent',
  minHeight: 120,
};

export const scrollContainer = {
  flex: 1,
  overflowY: 'auto',
  minHeight: 0,
  px: { xs: 0, sm: 1 },
};

export const gridProps = {
  container: true,
  spacing: { xs: 2, sm: 3 },
  sx: { width: '100%', m: 0 },
  justifyContent: 'center',
  alignItems: 'center',
};

export const cardStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.10)',
  bgcolor: '#fff',
  minHeight: 140,
  p: 2.5,
  mb: 2,
  transition: 'transform 0.18s, box-shadow 0.18s',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    transform: 'translateY(-2px) scale(1.025)',
    boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.18)',
    border: '1.5px solid #1976d2',
  },
};

export const iconButtonStyles = {
  position: 'absolute',
  top: 14,
  right: 14,
  backgroundColor: 'rgba(255,255,255,0.95)',
  color: '#1976d2',
  boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)',
  border: '1.5px solid #e3f2fd',
  '&:hover': { backgroundColor: '#e3f2fd', color: '#0d47a1' },
  zIndex: 2,
  transition: 'all 0.15s',
};

export const titleSx = {
  fontWeight: 800,
  fontSize: 19,
  color: '#222',
  mb: 1,
  letterSpacing: -0.5,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const contentSx = {
  fontWeight: 400,
  fontSize: 15,
  color: '#666',
  mb: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

export const infoRowSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  fontSize: 13,
  color: '#1976d2',
  mt: 0.5,
  mb: 0.5,
  fontWeight: 500,
};

export const actionRowSx = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 1.5,
  mt: 1,
};