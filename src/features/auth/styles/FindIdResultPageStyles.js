// FindIdPage 전용 스타일 (MUI sx prop용)

export const containerSx = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#f5f5f5',
    p: 2,
};

export const paperSx = {
    width: { xs: '95%', sm: 500 },
    textAlign: 'center',
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    bgcolor: '#fff',
    border: '1px solid #e0e0e0',
};

export const titleSx = {
    fontWeight: 700,
    color: '#000',
    mb: 2
};

export const subtitleSx = {
    color: '#333',
    fontWeight: 500,
    mb: 3
};

export const emailStackSx = {
    mb: 4,
    p: 3,
    bgcolor: '#f8f8f8',
    borderRadius: 2,
    border: '1px solid #e0e0e0'
};

export const checkIconSx = {
    color: '#000',
    fontSize: '2rem'
};

export const emailTextSx = {
    fontWeight: 600,
    color: '#000',
    wordBreak: 'break-all'
};

export const loginButtonSx = {
    bgcolor: '#000',
    color: '#fff',
    py: 1.5,
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    '&:hover': { 
        bgcolor: '#333',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
}; 