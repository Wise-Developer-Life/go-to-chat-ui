import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import RegistrationPage from "../page/RegistrationPage";

const pageRouteMapping =  [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "login",
        element: <LoginPage/>,
    },
    {
        path: "register",
        element: <RegistrationPage/>,
    }
];

export default pageRouteMapping;
