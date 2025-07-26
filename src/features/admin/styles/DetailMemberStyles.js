// DetailMember 전용 스타일 (MUI sx prop용)

export const modalSx = {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    p: 2
};

export const paperSx = {
    width: { xs: '95%', sm: 700, md: 800 },
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    '& .MuiTextField-root': { 
        mb: 2,
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
            },
        },
    },
};

export const containerSx = {
    p: 4
};

export const titleSx = {
    mb: 3, 
    fontWeight: 600,
    color: '#1a1a1a',
    textAlign: 'center'
};

export const sectionTitleSx = {
    mb: 2, 
    color: '#333', 
    fontWeight: 500
};

export const inputGridSx = {
    display: 'grid', 
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: 2 
};

export const selectorGridSx = {
    display: 'grid', 
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
    gap: 2 
};

export const buttonContainerSx = {
    display: 'flex',
    gap: 2,
    justifyContent: 'center'
};

export const submitButtonSx = {
    bgcolor: '#1976d2',
    color: '#fff',
    fontWeight: 700,
    borderRadius: 999,
    px: 3,
    py: 1,
    fontSize: 14,
    minWidth: 100,
    boxShadow: '0 2px 8px 0 rgba(25,118,210,0.10)',
    textTransform: 'none',
    transition: 'all 0.18s',
    '&:hover': { bgcolor: '#1251a3', color: '#fff' },
};

export const cancelButtonSx = {
    bgcolor: '#fff',
    color: '#1976d2',
    border: '2px solid #1976d2',
    fontWeight: 700,
    borderRadius: 999,
    px: 3,
    py: 1,
    fontSize: 14,
    minWidth: 100,
    boxShadow: '0 2px 8px 0 rgba(25,118,210,0.06)',
    textTransform: 'none',
    transition: 'all 0.18s',
    '&:hover': { bgcolor: '#1976d2', color: '#fff', border: '2px solid #1976d2' },
}; 