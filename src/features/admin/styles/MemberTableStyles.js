// MemberTable 전용 스타일 (MUI sx prop용)

export const tableContainerSx = {
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '& .MuiTable-root': {
        borderCollapse: 'separate',
        borderSpacing: 0,
    },
    '& .MuiTableHead-root .MuiTableRow-root': {
        backgroundColor: '#f8f9fa',
        '& .MuiTableCell-root': {
            borderBottom: '2px solid #e0e0e0',
            fontWeight: 600,
            color: '#333',
            fontSize: '0.875rem',
            padding: '12px 16px',
        }
    },
    '& .MuiTableBody-root .MuiTableRow-root': {
        '&:hover': {
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
        },
        '& .MuiTableCell-root': {
            borderBottom: '1px solid #f0f0f0',
            padding: '12px 16px',
            fontSize: '0.875rem',
            color: '#555',
        }
    },
    '& .MuiCheckbox-root': {
        color: '#1976d2',
        '&.Mui-checked': {
            color: '#1976d2',
        },
        '&.MuiCheckbox-indeterminate': {
            color: '#1976d2',
        }
    }
};

export const checkboxCellSx = {
    width: '50px'
};

export const tableRowSx = {
    '&:last-child .MuiTableCell-root': {
        borderBottom: 0,
    }
};

export const basicCellSx = {
    fontWeight: 500
};

export const roleCellSx = (role) => ({
    color: role === 'ADMIN' ? '#d32f2f' : '#1976d2',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase'
});

export const statusCellSx = (status) => ({
    color: status === 'ACTIVE' ? '#2e7d32' : '#d32f2f',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase'
});

export const dateCellSx = {
    color: '#666',
    fontSize: '0.75rem'
}; 