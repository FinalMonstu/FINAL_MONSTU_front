import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { authPath } from "../../hooks/urlManager";

export default function AdminRoute({children}){
    const { isAuthenticated, userInfo  } = useAuth();
    console.log(`AdminRoute -> isAuthenticated: ${isAuthenticated} \n
        userInfo : ${userInfo}`)
    if (isAuthenticated && userInfo.role==="ADMIN") {return children};
    return <Navigate to={authPath.login} replace />;
}