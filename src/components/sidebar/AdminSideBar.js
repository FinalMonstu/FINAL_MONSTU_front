import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import CampaignIcon from '@mui/icons-material/Campaign';
import { adminPath } from "../../hooks/urlManager";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "게시물 관리", icon: <ChromeReaderModeIcon />, child: "MembersBox" },
  { label: "회원 관리", icon: <ManageAccountsIcon />, child: "MembersBox"  },
  { label: "공지사항 관리", icon: <CampaignIcon />, child: "MembersBox"  },
];

export default function AdminSidebar({ open, onToggle, setChild }) {
    return (
        <Box
        bgcolor="grey.100"
        width={open ? 240 : 60}
        sx={{
            transition: "width 0.3s",
            overflowX: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}
        >
        {/* 축소/확장 토글 버튼 */}
        <Box textAlign="right" p={1}>
            <IconButton size="small" onClick={onToggle}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
        </Box>

        {/* 메뉴 리스트 */}
        <List sx={{ flexGrow: 1 }}>
            {menuItems.map(({ label, icon, child }) => (
            <ListItem
                key={label}
                disablePadding
                sx={{ justifyContent: open ? "initial" : "center" }}
                onClick={()=>setChild(child)}
            >
                <ListItemButton sx={{ px: 2 }}>
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: open ? 2 : 0,
                    justifyContent: "center",
                    }}
                >
                    {icon}
                </ListItemIcon>
                {open && <ListItemText primary={label} />}
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    );
}
