import { createBrowserRouter, redirect, useNavigate } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import UserChatRoom from "./pages/UserChatRoom";
import App from "./pages/App";
// layout
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import GlobalLayout from "./layouts/GlobalLayout";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        element: <PrivateLayout />,
        loader: () => {
          if (!localStorage.token) {
            return redirect("/register");
          }
          return null;
        },
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/chatRoom/:id",
            element: <ChatRoom />,
          },
          {
            path: "/userChatRoom/:id",
            element: <UserChatRoom />,
          },
          {
            path: "/tetris",
            element: <App />,
          },
        ],
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
