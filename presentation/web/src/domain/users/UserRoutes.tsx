import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy-loaded components
const Login = lazy(() => import("./features/Login"));

export const ChatRoutes = () => (
  <Suspense>
    <Routes>
      <Route element={<Login />} path="/login" />
    </Routes>
  </Suspense>
);

export default ChatRoutes;
