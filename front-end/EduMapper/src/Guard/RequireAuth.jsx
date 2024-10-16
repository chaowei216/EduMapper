import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import GlobalLoading from "../components/global/GlobalLoading";
import LoginPage from "../pages/Authen/LoginPage";

const RequireAuth = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isInitialized) {
        return <GlobalLoading isLoading={!isInitialized} />
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <LoginPage />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
};

export default RequireAuth;