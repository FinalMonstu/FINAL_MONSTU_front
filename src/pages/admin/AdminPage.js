import React, { useState } from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../../components/sidebar/AdminSideBar";
import MembersBox from "../../components/box/admin/MembersBox";

/* 
  역할 : 어드민 페이지
  인증 : 어드민 사용가능
  기능 : 
*/
export default function AdminPage(){
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [child,setChild] = useState("MembersBox");

    return (
        <Box display="flex" height="100vh">
            <AdminSidebar 
                open={sidebarOpen} 
                onToggle={() => setSidebarOpen((o) => !o)} 
                setChild = {setChild}
            />
    
            <Box flexGrow={1} p={2}>
                {child === "MembersBox" && <MembersBox />}
                {/* {child === "PostsBox"    && <PostsBox />}
                {child === "NounceBox"   && <NoticeBox />} */}
            </Box>
        </Box>
    );
}