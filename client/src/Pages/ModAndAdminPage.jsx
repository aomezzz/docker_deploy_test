import { Navigate } from "react-router";
import { useAuthContext } from "../context/authcontext";

const ModAndAdminPage = ({children}) => {
    const { user } = useAuthContext();
    
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUser = user || storedUser;
    
    if (!currentUser || !currentUser.accessToken) {
        return <Navigate to="/login" replace />;
    }
    if (currentUser?.authorities?.includes("ROLE_ADMIN") || currentUser?.authorities?.includes("ROLE_MODERATOR")) {
        return children;
    }
    return <Navigate to="/not-allowed" replace />;
};

export default ModAndAdminPage;