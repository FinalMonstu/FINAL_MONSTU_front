// AuthLinks 전용 스타일 (MUI sx prop용)

export const buttonStyle = {
    textTransform: 'none',
    fontWeight: 'bold',
    color: 'text.secondary',
    '&:hover': {
        color: 'text.primary',
        backgroundColor: 'transparent',
    },
};

export const boxStyle = {
    mt: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}; 