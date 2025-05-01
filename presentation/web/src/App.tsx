import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const ChatRoutes = lazy(() => import("./domain/chat/ChatRoutes"));
const UserRoutes = lazy(() => import("./domain/users/UserRoutes"));

function App() {
  return (
    <Routes>
      <Route element={<ChatRoutes />} path="/chat/*" />
      <Route element={<UserRoutes />} path="/user/*" />
      <Route element={<Navigate replace to="/chat" />} path="*" />
    </Routes>
  );
}

export default App;
