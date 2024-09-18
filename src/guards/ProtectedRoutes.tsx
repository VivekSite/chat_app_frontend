import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts";

const ProtectedRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/sign_in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
