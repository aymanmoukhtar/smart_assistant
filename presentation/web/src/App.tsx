import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ChatRoutes = lazy(() => import("./domain/chat/ChatRoutes"));

function App() {
  return (
    <Routes>
      <Route element={<ChatRoutes />} path="/" />
    </Routes>
  );
}

export default App;
