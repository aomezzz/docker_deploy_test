import { Navigate } from "react-router";
import { useAuthContext } from "../context/authcontext";

const AdminPage = ({children}) => {
    const { user } = useAuthContext();
    if (!user ) {
        return <Navigate to="/login" replace />;
    }
    if (user?.authorities?.includes("ROLE_ADMIN")) {
        return children;
    }
    return <Navigate to="/not-allowed" replace />;
};

export default AdminPage;