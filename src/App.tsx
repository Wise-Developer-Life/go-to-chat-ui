import {RouterProvider} from "react-router-dom";
import React from "react";
import router from "./route";
import {UserProvider} from "./context/UserContext";


export default function App() {
    return (
        <UserProvider>
            <RouterProvider router={router}/>
        </UserProvider>
    );
}
