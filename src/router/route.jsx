import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Layout from "./Layout";
import Register from "../page/Register";
import Login from "../page/Login";
import ForgotPass from "../page/ForgotPass";
import LocationModal from "../components/Filter/LocationModal";
import FilterModal from "../components/Filter/FilterModal";
import Detail from "../page/Detail";
import LayoutAdmin from "./LayoutAdmin";
import CreatePost from "../page/Admin/CreatePost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/dang-nhap",
        element: <Login />,
      },
      {
        path: "/dang-ky",
        element: <Register />,
      },
      {
        path: "/quen-mat-khau",
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <CreatePost />,
      },
    ],
  },
]);
