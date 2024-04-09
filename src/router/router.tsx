import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../components/account/admin";
import PostAProduct from "../components/account/postAProduct";
import NormalPage from "../components/account/normal";
import DeleteUser from "../components/account/deleteUser";
import React from "react";
import Analytics from "../components/analytics/analytics";
import LoginPage from "../components/login/login";
import SignUpPage from "../components/signup/signup";
import MainPage from "../components/products/main";

const router = createBrowserRouter([
    {
        path: "/AdminPage",
        element: <AdminPage />
    },  {
        path: "/",
        element: <MainPage />
    },

    {
        path: "/PostAProduct",
        element: <PostAProduct />
    },

    {
        path: "/NormalPage",
        element: <NormalPage />
    },

    {
        path: "/DeleteUser",
        element: <DeleteUser />
    },

   
    {
        path: "/analytics",
        element: <Analytics />,
    },
    {
        path: "/login",
        element: <LoginPage />, // Add this line to define the route for LoginPage
    },
    {
        path: "/signup", // Define the route for the SignUpPage
        element: <SignUpPage />,
    },

])

export default router