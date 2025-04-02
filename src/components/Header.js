import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


function Header() {

    
    return (
        <Box sx={{ flexGrow: 1, marginLeft: "15px", marginRight: "15px",marginTop: "8px"}}>
            <AppBar position="static" sx={{backgroundColor:"white",boxShadow:"none"}}>
            <Toolbar>
                {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black",fontWeight: "bold"}}>
                MonStu
                </Typography>
                <Button variant="overline" sx={{ textTransform: "none", fontSize: "15px",backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#2E2E2E" } }}>Login</Button>
            </Toolbar>
            </AppBar>
        </Box>
    );
  }
  
  export default Header;