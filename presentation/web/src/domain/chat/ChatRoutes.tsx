import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { RequireAuth } from "../common/components/RequireAuth";

const Chat = lazy(() => import("./features/Chat"));

export const ChatRoutes = () => (
  <Suspense>
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Chat />} path="/" />
      </Route>
    </Routes>
  </Suspense>
);

export default ChatRoutes;
