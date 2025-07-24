import { Box } from "@mui/material";
import { useState } from "react";
import MemberSideBar from "../../features/profile/components/MemberSideBar";
import MyInfoTable from "../../features/profile/components/MyInfoTable";
import MyPostsBox from "../../features/profile/components/MyPostsBox";

export default function MyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [child,setChild] = useState("MyInfoBox");

  return (
      <Box display="flex" height="100vh">
          <MemberSideBar 
              open={sidebarOpen} 
              onToggle={() => setSidebarOpen((o) => !o)} 
              setChild = {setChild}
          />
  
          <Box flexGrow={1} p={2}>
              {child === "MyInfoBox" && <MyInfoTable/>}
              {child === "MyPosts"    && <MyPostsBox/>}
          </Box>
      </Box>
  );
}