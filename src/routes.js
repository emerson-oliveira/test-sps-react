import React from "react";
import { createBrowserRouter, redirect, Outlet } from "react-router-dom";

import Home from "./pages/home";
import UserList from "./pages/user-list";
import UserEdit from "./pages/user-edit";
import SignIn from "./pages/sign-in";
import UserCreate from "./pages/user-create";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

function ProtectedLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    element: <ProtectedLayout />,
    loader: checkAuth,
    children: [
      { path: "/", element: <Home /> },
      { path: "/users", element: <UserList /> },
      { path: "/users/create", element: <UserCreate /> },
      { path: "/users/:userId", element: <UserEdit /> },
    ],
  },
]);

export default router;