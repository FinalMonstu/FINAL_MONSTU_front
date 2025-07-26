// Footer 전용 스타일 (MUI sx prop용)

export const footerSx = {
  py: 4,
  textAlign: 'center',
  bgcolor: '#f8f9fa',
  color: '#333',
  borderTop: '1px solid #e0e0e0',
  boxShadow: '0 -2px 16px rgba(98,71,170,0.04)',
  mt: 8
};

export const titleSx = {
  fontWeight: 700,
  color: '#6247AA',
  letterSpacing: 2
};

export const captionSx = {
  color: '#666',
  mb: 0.5
};

export const captionEmailSx = {
  color: '#666',
  mb: 1
};

export const linkStackSx = {
  mt: 2
};

export const linkSx = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 600,
  borderRadius: 2,
  px: 2.5,
  py: 1,
  background: 'linear-gradient(90deg, #6247AA 0%, #A594F9 100%)',
  boxShadow: '0 2px 8px rgba(98,71,170,0.10)',
  transition: 'all 0.2s',
  margin: 8,
  display: 'inline-block',
  fontSize: '0.95rem',
  '&:hover': {
    background: 'linear-gradient(90deg, #A594F9 0%, #6247AA 100%)',
    color: '#fff',
    textDecoration: 'underline',
    boxShadow: '0 4px 16px rgba(98,71,170,0.18)'
  }
}; 