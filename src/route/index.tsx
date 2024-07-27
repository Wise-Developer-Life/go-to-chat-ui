import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import React from "react";
import pageRouteMapping from "./route";

const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: pageRouteMapping,
    },
]);

export default router;
