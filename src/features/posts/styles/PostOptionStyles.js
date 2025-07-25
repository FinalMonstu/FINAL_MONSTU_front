// PostOption 전용 스타일 (MUI sx prop용)

export const modalSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: 'blur(6px)',
  background: 'rgba(30, 30, 30, 0.18)',
  zIndex: 1400,
};

export const boxSx = {
  position: "relative",
  bgcolor: 'rgba(30,30,30,0.92)',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.22)',
  borderRadius: 5,
  width: { xs: "92%", sm: "350px" },
  minHeight: 210,
  px: { xs: 3, sm: 5 },
  py: { xs: 3, sm: 4 },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  border: '1.5px solid rgba(255,255,255,0.10)',
  fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
  backdropFilter: 'blur(12px)',
  transition: 'all 0.3s',
  animation: 'fadeInPop 0.4s cubic-bezier(.4,2,.6,1)',
  '@keyframes fadeInPop': {
    '0%': { opacity: 0, transform: 'scale(0.95)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
};

export const closeBtnSx = {
  position: 'absolute', top: 18, right: 18,
  bgcolor: 'rgba(255,255,255,0.85)',
  color: '#222',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
  border: '1.5px solid #eee',
  '&:hover': { bgcolor: '#fff', color: '#000' },
  zIndex: 2,
  transition: 'all 0.18s',
};

export const titleSx = {
  fontWeight: 800,
  fontSize: 22,
  color: '#fff',
  mb: 1,
  letterSpacing: -1,
  textAlign: 'center',
};

export const toggleBtnWrapSx = {
  display: 'flex',
  gap: 2,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  minHeight: 80,
  mb: 1,
};

export const toggleBtnSx = (active) => ({
  px: 3,
  py: 1.2,
  fontWeight: 700,
  fontSize: 16,
  borderRadius: 99,
  background: active ? '#fff' : '#222',
  color: active ? '#111' : '#fff',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
  textTransform: 'none',
  border: active ? '2px solid #fff' : '1.5px solid #eee',
  transition: 'all 0.18s',
  outline: active ? '2px solid #fff' : 'none',
  outlineOffset: active ? '2px' : '0',
  '&:hover': {
    background: active ? '#f5f5f5' : '#111',
    color: active ? '#111' : '#fff',
    border: '2px solid #fff',
  },
}); 