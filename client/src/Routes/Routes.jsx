import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddRestaurant from "../Pages/AddRestaurant";
import UpdateRestaurant from "../Pages/UpdateRestaurant";
import LoginRestaurant from "../Pages/LoginRestaurant";
import RegisterRestaurant from "../Pages/RegisterRestaurant";
import ProfilePage from "../Pages/ProfilePage";
import NotAllowed from "../Pages/NotAllowed";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/add-restaurant",
        element: <AddRestaurant />,
    },
    {
        path: "/update-restaurant/:id",
        element: <UpdateRestaurant />,
    },
    {
        path: "/login",
        element: <LoginRestaurant />,
    },
    {
        path: "/register",
        element: <RegisterRestaurant />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "/not-allowed",
        element: <NotAllowed />,
    },
]);

export default router;
