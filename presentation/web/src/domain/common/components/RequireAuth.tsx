import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useShallowAppStore } from "@/domain/app.store";

const RequireAuth = () => {
  const [isUserLoggedIn, user] = useShallowAppStore((state) => [
    state.isUserLoggedIn,
    state.user,
  ]);
  const location = useLocation();

  if (!isUserLoggedIn || !user) {
    return (
      <Navigate replace state={{ from: location.pathname }} to="/user/login" />
    );
  }

  return <Outlet />;
};

export { RequireAuth };
