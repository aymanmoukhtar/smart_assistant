import { useShallowAppStore } from '@/domain/app.store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const [isUserLoggedIn, user] = useShallowAppStore((state) => [
    state.isUserLoggedIn,
    state.user,
  ]);
  const location = useLocation();

  if (!isUserLoggedIn || !user) {
    return (
      <Navigate to="/user/login" state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};

export { RequireAuth };

