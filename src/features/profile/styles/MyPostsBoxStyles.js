// MyPostsBox 전용 스타일 (MUI sx prop용)

export const paperSx = {
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(60,60,60,0.10)',
    bgcolor: '#fff',
    border: '1px solid #e0e0e0',
    maxWidth: 700,
    mx: 'auto',
    my: 3
};

export const sortButtonSx = {
    borderRadius: 2,
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#495057',
    borderColor: '#bdbdbd',
    px: 2,
    py: 0.5,
    background: '#f8f9fa',
    transition: 'all 0.2s',
    '&:hover': {
        background: '#e9ecef',
        borderColor: '#495057',
        color: '#212529',
        boxShadow: '0 2px 8px rgba(60,60,60,0.10)'
    }
};

export const selectorBoxSx = {
    minWidth: 140,
    borderRadius: 2,
    px: 1,
    py: 0.5
}; 