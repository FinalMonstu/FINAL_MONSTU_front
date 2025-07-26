// SignOutPage 전용 스타일 (MUI sx prop용)

export const containerSx = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
    p: 3
};

export const paperSx = {
    width: { xs: '95%', sm: 450 },
    p: 4,
    borderRadius: 4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    background: '#fff',
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
        background: 'linear-gradient(90deg, #e53e3e, #c53030)',
    }
};

export const headerBoxSx = {
    textAlign: 'center',
    mb: 4
};

export const warningHeaderSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2
};

export const warningIconSx = {
    color: '#e53e3e',
    fontSize: 40,
    mr: 2
};

export const titleSx = {
    fontWeight: 700,
    color: '#2d3748',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

export const subtitleSx = {
    color: '#718096',
    fontSize: '0.875rem',
    mb: 2
};

export const warningMessageSx = {
    color: '#e53e3e',
    fontSize: '0.75rem',
    fontWeight: 500,
    display: 'block'
};

export const stackSx = {
    spacing: 3
};

export const infoCardSx = {
    display: 'flex',
    alignItems: 'center',
    p: 2,
    borderRadius: 2,
    bgcolor: 'rgba(73, 80, 87, 0.05)',
    border: '1px solid rgba(73, 80, 87, 0.1)'
};

export const iconSx = {
    color: '#495057',
    mr: 2,
    fontSize: 20
};

export const infoBoxSx = {
    flex: 1
};

export const infoLabelSx = {
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: '0.75rem',
    fontWeight: 600
};

export const infoValueSx = {
    color: '#2d3748',
    fontWeight: 500,
    mt: 0.5
};

export const actionButtonSx = {
    background: 'linear-gradient(135deg, #495057 0%, #343a40 100%)',
    color: '#fff',
    py: 1,
    px: 2,
    fontSize: '0.75rem',
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(73, 80, 87, 0.3)',
    border: 'none',
    transition: 'all 0.3s ease',
    minWidth: 100,
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

export const verifyButtonSx = {
    background: 'linear-gradient(135deg, #495057 0%, #343a40 100%)',
    color: '#fff',
    py: 1,
    px: 2,
    fontSize: '0.75rem',
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(73, 80, 87, 0.3)',
    border: 'none',
    transition: 'all 0.3s ease',
    minWidth: 80,
    whiteSpace: 'nowrap',
    ml: 1,
    '&:hover': { 
        background: 'linear-gradient(135deg, #343a40 0%, #212529 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(73, 80, 87, 0.4)',
    },
    '&:active': {
        transform: 'translateY(0)',
    }
};

export const inputFieldSx = {
    mt: 1,
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        bgcolor: '#fff',
        border: '1px solid transparent',
        transition: 'all 0.3s ease',
        '&:hover': {
            borderColor: '#495057',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 15px rgba(73, 80, 87, 0.15)',
        },
        '&.Mui-focused': {
            borderColor: '#495057',
            boxShadow: '0 4px 15px rgba(73, 80, 87, 0.25)',
            transform: 'translateY(-1px)',
        },
    },
    '& .MuiInputBase-input': {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#2d3748',
        padding: '8px 12px',
    },
};

export const deleteButtonSx = {
    background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
    color: '#fff',
    py: 2,
    px: 4,
    fontSize: '1rem',
    fontWeight: 700,
    borderRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(229, 62, 62, 0.3)',
    border: 'none',
    transition: 'all 0.3s ease',
    mt: 2,
    '&:hover': { 
        background: 'linear-gradient(135deg, #c53030 0%, #9b2c2c 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(229, 62, 62, 0.4)',
    },
    '&:active': {
        transform: 'translateY(0)',
    }
}; 