import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy-loaded components
const ChatLayout = lazy(() => import("./features/Chat"));

export const ChatRoutes = () => (
  <Suspense>
    <Routes>
      <Route element={<ChatLayout />} path="/" />
    </Routes>
  </Suspense>
);

export default ChatRoutes;
