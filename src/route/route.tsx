import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import RegistrationPage from "../page/RegistrationPage";
import ChatRoomPage from "../page/ChatRoomPage";

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
        path: "chat",
        element: <ChatRoomPage/>,
    }
];

export default pageRouteMapping;
