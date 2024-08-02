import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import RegistrationPage from "../page/RegistrationPage";
import ProfilePage from "../page/ProfilePage";

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
    },
    {
        path: "profile",
        element: <ProfilePage/>,
    },
];

export default pageRouteMapping;
