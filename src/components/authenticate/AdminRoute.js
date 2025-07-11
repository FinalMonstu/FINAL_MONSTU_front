import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { authPath } from "../../hooks/urlManager";
import { memberRole } from "../../static/member";

/* 어드민 검증 컴포넌트 */
export default function AdminRoute({children}){
    const { isAuthenticated, userInfo  } = useAuth();
    
    if (isAuthenticated && userInfo.role===memberRole.ADMIN) {return children};
    return <Navigate to={authPath.login} replace />;
}