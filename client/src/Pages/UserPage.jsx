import { Navigate } from "react-router";
import { useAuthContext } from "../context/authcontext";

const UserPage = ({children}) => {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default UserPage;