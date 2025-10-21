// PostPage 전용 스타일 (MUI sx prop용)

// Header fixed height (px) - adjust if you change header padding/font sizes
const HEADER_HEIGHT = 72;

export const rootSx = {
  minHeight: '100vh',
  bgcolor: '#f7f8fa',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: `${HEADER_HEIGHT}px`, // leave space for fixed header
};

export const headerSx = {
  position: 'fixed',
  top: '64px', // place below common AppBar (approx 64px)
  left: 0,
  right: 0,
  height: `${HEADER_HEIGHT}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 4, py: 2,
  bgcolor: '#fff',
  boxShadow: 1,
  borderRadius: 0,
  zIndex: 1000,
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
  gap: 2,
  px: 4,
  pb: 4,
  minHeight: 0,
  // fill remaining viewport below the fixed header
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'auto',
  marginTop: '64px', // push content below common AppBar / spacing for fixed headers
};

export const contentSx = {
  flex: 3,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 1,
  p: 3,
  minHeight: 0, // allow flex child to shrink
  height: '100%',
  overflowY: 'auto',
};

export const historyWrapSx = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minHeight: 0,
  height: '100%',
};

export const historyBoxSx = {
  flex: 1,
  display: 'flex',
}; 