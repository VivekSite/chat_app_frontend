import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts';

type PrivateRouteTypes = {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteTypes) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/sign_in" replace />;
  }

  return children;
}

export default PrivateRoute;