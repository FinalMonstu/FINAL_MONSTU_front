// SignUpPage 전용 스타일 (MUI sx prop용)

export const containerSx = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
    p: 2
};

export const formBoxSx = {
    width: { xs: '95%', sm: 600 },
    p: { xs: 4, sm: 5 },
    bgcolor: '#fff',
    borderRadius: 4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #6c757d, #495057)',
    }
};

export const titleSx = {
    align: 'center',
    fontWeight: 800,
    color: '#2d3748',
    mb: 3,
    fontSize: { xs: '2rem', sm: '2.5rem' },
    textTransform: 'uppercase',
    letterSpacing: '2px'
};

export const subtitleSx = {
    align: 'center',
    color: '#718096',
    mb: 4,
    fontSize: '1rem',
    fontWeight: 400
};

export const stackSx = {
    spacing: 3
};

export const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        bgcolor: '#f8f9fa',
        border: '2px solid transparent',
        transition: 'all 0.3s ease',
        '&:hover': {
            bgcolor: '#fff',
            borderColor: '#495057',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(73, 80, 87, 0.15)',
        },
        '&.Mui-focused': {
            bgcolor: '#fff',
            borderColor: '#495057',
            boxShadow: '0 8px 25px rgba(73, 80, 87, 0.25)',
            transform: 'translateY(-2px)',
        },
    },
    '& .MuiInputBase-input': {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#2d3748',
        padding: '16px 20px',
    },
    '& .MuiInputLabel-root': {
        color: '#718096',
        fontWeight: 500,
    },
    mb:1
};

export const actionButtonSx = {
    background: 'linear-gradient(135deg, #495057 0%, #343a40 100%)',
    color: '#fff',
    py: 1.5,
    px: 2,
    fontSize: '0.75rem',
    fontWeight: 600,
    borderRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(73, 80, 87, 0.3)',
    border: 'none',
    transition: 'all 0.3s ease',
    minWidth: 80,
    whiteSpace: 'nowrap',
    '&:hover': { 
        background: 'linear-gradient(135deg, #343a40 0%, #212529 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(73, 80, 87, 0.4)',
    },
    '&:active': {
        transform: 'translateY(0)',
    }
};

export const submitButtonSx = {
    background: 'linear-gradient(135deg, #495057 0%, #343a40 100%)',
    color: '#fff',
    py: 2,
    px: 4,
    fontSize: '1rem',
    fontWeight: 700,
    borderRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(73, 80, 87, 0.3)',
    border: 'none',
    transition: 'all 0.3s ease',
    mt: 2,
    height: 50,
    '&:hover': { 
        background: 'linear-gradient(135deg, #343a40 0%, #212529 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(73, 80, 87, 0.4)',
    },
    '&:active': {
        transform: 'translateY(0)',
    }
}; 