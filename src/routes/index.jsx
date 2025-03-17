import React from "react";
import { createBrowserRouter, redirect, Outlet } from "react-router-dom";
import UserList from "pages/user-list";
import UserEdit from "pages/user-edit";
import SignIn from "pages/sign-in";

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
      { path: "/users", element: <UserList /> },
      { path: "/users/create", element: <UserEdit /> },
      { path: "/users/:userId", element: <UserEdit /> },
    ],
  },
]);

export default router;
