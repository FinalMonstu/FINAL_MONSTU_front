import { Box } from "@mui/material";
import { useState } from "react";
import MemberSideBar from "../../components/sidebar/MemberSideBar";
import MyInfoTable from "../../components/table/my/MyInfoTable";

function MyPage() {
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
              {child === "MyInfoBox" && <MyInfoTable />}
              {/* {child === "PostsBox"    && <PostsBox />} */}
          </Box>
      </Box>
  );
}

export default MyPage;
