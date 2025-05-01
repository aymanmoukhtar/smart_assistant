import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy-loaded components
const Login = lazy(() => import("./features/Login"));
const Signup = lazy(() => import("./features/Signup"));

export const UserRoutes = () => (
  <Suspense>
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
    </Routes>
  </Suspense>
);

export default UserRoutes;
