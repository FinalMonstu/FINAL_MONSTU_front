import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from './authenticate/AuthContext';
import { btnBlack } from "../styles/commonStyle";
import { useNavigate } from 'react-router-dom';
import { adminPath, authPath, mainPath, myPath } from '../hooks/urlManager';

function Header() {
    const { isAuthenticated, userInfo, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = React.useCallback(() => { navigate(authPath.login); }, [navigate]);
    
    const handleLogout = React.useCallback(() => {
        logout();
        navigate(mainPath);
    }, [logout, navigate]);

    const handleHome = React.useCallback(() => { navigate(mainPath); }, [navigate]);

    const handleMyPage = React.useCallback(() => { navigate(myPath.my); }, [navigate]);

    const handleAdminPage = React.useCallback(() => { navigate(adminPath.admin); }, [navigate]);


    const Authenticated = () => (
        <Box>
            { userInfo?.role === "ADMIN" ?
            <Button variant="overline" sx={btnBlack} onClick={handleAdminPage}>ADMIN</Button>
            : <Button variant="overline" sx={btnBlack} onClick={handleMyPage}>my page</Button>
            }
            <Button variant="overline" sx={{...btnBlack, ml:0.5}} onClick={handleLogout}>Log out</Button>
        </Box>
    );

    const UnAuthenticated = () => (
        <Box>
            <Button variant="overline" sx={btnBlack} onClick={handleLogin}>Log in</Button>
        </Box>
    );

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

                {isAuthenticated? <Authenticated/> : <UnAuthenticated/> }
            </Toolbar>
            </AppBar>
        </Box>
    );
  }
  
  export default Header;