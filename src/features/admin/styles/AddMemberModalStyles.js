// AddMemberModal 전용 스타일 (MUI sx prop용)

export const modalSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(6px)',
  background: 'rgba(255,255,255,0.7)',
};

export const paperSx = {
  width: { xs: '95%', sm: 420 },
  p: { xs: 3, sm: 4 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 5,
  bgcolor: '#fff',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)',
  border: '1.5px solid #f5f5f5',
  fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
  transition: 'all 0.3s',
};

export const formSx = {
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
};

export const inputBoxSx = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  mb: 1,
  width: '100%',
  justifyContent: 'space-between',
};

export const textFieldSx = {
  bgcolor: '#fafbfc',
  borderRadius: 3,
  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
  input: { fontWeight: 600, fontSize: 16, color: '#222' },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1.5px solid #e3e6ea',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #1976d2',
  },
  width: { xs: '100%', sm: '48%' },
};

export const selectorBoxSx = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  width: '100%',
  justifyContent: 'space-between',
  mb: 2,
};

export const buttonGroupSx = {
  mt: 2,
  width: '100%',
  display: 'flex',
  gap: 2,
  justifyContent: 'center',
};

export const addBtnSx = {
  bgcolor: '#1976d2',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 99,
  px: 4,
  py: 1.5,
  fontSize: 16,
  minWidth: 120,
  boxShadow: '0 2px 8px 0 rgba(25,118,210,0.10)',
  textTransform: 'none',
  transition: 'all 0.18s',
  '&:hover': { bgcolor: '#1251a3', color: '#fff' },
};

export const cancelBtnSx = {
  bgcolor: '#fff',
  color: '#1976d2',
  border: '2px solid #1976d2',
  fontWeight: 700,
  borderRadius: 99,
  px: 4,
  py: 1.5,
  fontSize: 16,
  minWidth: 120,
  boxShadow: '0 2px 8px 0 rgba(25,118,210,0.06)',
  textTransform: 'none',
  transition: 'all 0.18s',
  '&:hover': { bgcolor: '#1976d2', color: '#fff', border: '2px solid #1976d2' },
}; 