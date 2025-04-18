import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Layout from "./Layout";
import Register from "../page/Register";
import Login from "../page/Login";
import ForgotPass from "../page/ForgotPass";

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
]);
