import { Outlet } from 'react-router-dom';

interface UnauthenticatedRouteProps {
  redirectPath: string,
  children?: React.ReactNode
}

export function UnauthenticatedRoute({
  children
}: UnauthenticatedRouteProps) {

  return children ?? <Outlet />;
}
