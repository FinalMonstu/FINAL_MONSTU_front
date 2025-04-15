import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from './authenticate/AuthContext';
import { btnBlack } from "../styles/commonStyle";
import { useNavigate } from 'react-router-dom';

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = React.useCallback(() => {
        navigate('/login');
    }, [navigate]);
    
    const handleLogout = React.useCallback(() => {
        logout();
        navigate('/');
    }, [logout, navigate]);

    const handleHome = React.useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <Box sx={{ flexGrow: 1, marginLeft: "15px", marginRight: "15px",marginTop: "8px"}}>
            <AppBar position="static" sx={{backgroundColor:"white",boxShadow:"none"}}>
            <Toolbar>
                <Typography variant="h6" component="div" 
                    sx={{ flexGrow: 1, color: "black",fontWeight: "bold"}}
                    onClick={handleHome}    
                >
                MonStu
                </Typography>

                {!isAuthenticated?
                    <Button variant="overline" sx={btnBlack} onClick={handleLogin}>Log in</Button>
                    : <Button variant="overline" sx={btnBlack} onClick={handleLogout}>Log out</Button>
                }
            </Toolbar>
            </AppBar>
        </Box>
    );
  }
  
  export default Header;