// PostInputModal 전용 스타일 (MUI sx prop용)

export const modalSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.7)',
  zIndex: 1400,
};

export const paperSx = {
  width: { xs: '95%', sm: 400 },
  p: { xs: 3, sm: 4 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 2.5,
  borderRadius: 5,
  bgcolor: '#fff',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)',
  border: '1.5px solid #f5f5f5',
  fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
  transition: 'all 0.3s',
};

export const titleSx = {
  fontWeight: 800,
  fontSize: 22,
  color: '#222',
  marginBottom: 8,
  letterSpacing: -1,
  textAlign: 'center',
};

export const labelSx = {
  fontWeight: 700,
  fontSize: 15,
  color: '#1976d2',
  marginBottom: 4,
  marginLeft: 2,
};

export const labelContentSx = {
  fontWeight: 700,
  fontSize: 15,
  color: '#1976d2',
  marginBottom: 4,
  marginLeft: 2,
  marginTop: 8,
};

export const textFieldSx = {
  bgcolor: '#fafbfc',
  borderRadius: 3,
  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
  input: { fontWeight: 600, fontSize: 17, color: '#222' },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1.5px solid #e3e6ea',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #1976d2',
  },
};

export const textAreaSx = {
  bgcolor: '#fafbfc',
  borderRadius: 3,
  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
  textarea: { fontWeight: 500, fontSize: 15, color: '#222' },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1.5px solid #e3e6ea',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #1976d2',
  },
};

export const switchWrapSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: 8,
  marginBottom: 4,
};

export const saveBtnSx = {
  bgcolor: '#1976d2',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 99,
  px: 4,
  py: 1.5,
  fontSize: 17,
  minWidth: 110,
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
  fontSize: 17,
  minWidth: 110,
  boxShadow: '0 2px 8px 0 rgba(25,118,210,0.06)',
  textTransform: 'none',
  transition: 'all 0.18s',
  '&:hover': { bgcolor: '#1976d2', color: '#fff', border: '2px solid #1976d2' },
};

export const btnRowSx = {
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  marginTop: 8,
  justifyContent: 'flex-end',
}; 

export const switchSx = {
  '& .MuiSwitch-thumb': { bgcolor: '#fff' }, 
  '& .MuiSwitch-track': { bgcolor: '#e3e6ea' }
}; 