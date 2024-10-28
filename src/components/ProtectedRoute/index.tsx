import { useAuthStore } from '@/stores/auth';
import { Outlet, Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  allowedRoles: string[],
  redirectPath: string,
  children?: React.ReactNode
}

export function ProtectedRoute({
  redirectPath,
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const {token} = useAuthStore();
  const userRole = useAuthStore.getState().profile?.role || 'admin';

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ?? <Outlet />;
}
