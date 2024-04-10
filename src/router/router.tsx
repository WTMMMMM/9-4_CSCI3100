import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../components/account/admin";
import PostAProduct from "../components/account/postAProduct";
import DeleteUser from "../components/account/deleteUser";
import React from "react";
import Analytics from "../components/analytics/analytics";
import LoginPage from "../components/login/login";
import SignUpPage from "../components/signup/signup";
import MainPage from "../components/products/main";

const router = createBrowserRouter([
   {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/analytics",
        element: <Analytics />,
    },
    {
        path: "/profile",
        element: <AdminPage />
    }, 
    {
        path: "/PostAProduct",
        element: <PostAProduct />
    },

 

    {
        path: "/DeleteUser",
        element: <DeleteUser />
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