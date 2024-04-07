import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../components/account/admin";
import PostAProduct from "../components/account/postAProduct";
import NormalPage from "../components/account/normal";
import DeleteUser from "../components/account/deleteUser";
import EditInfo from "../components/account/editInfo";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/AdminPage",
        element: <AdminPage />
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
        path: "/EditInfo",
        element: <EditInfo />
    }
])

export default router