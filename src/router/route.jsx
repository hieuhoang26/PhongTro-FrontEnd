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
import CreatePost from "../page/Dash/CreatePost";
import { PostListUser } from "../page/Dash/User/PostListUser";
import { PostModal } from "../components/Admin/Modal/PostModal";
import PendingPost from "../page/Dash/Admin/PendingPost";
import { PostListAdmin } from "../page/Dash/Admin/PostListAdmin";
import { ChatApp } from "../page/Chat/ChatApp";
import PriceList from "../page/PriceList";

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
      {
        path: "/bang-gia",
        element: <PriceList />,
      },
      // {
      //   path: "/chat",
      //   element: <WebSocketChatTest />,
      // },
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
      {
        path: "bai-dang-user",
        element: <PostListUser />,
      },
      // admin
      {
        path: "bai-dang-admin",
        element: <PostListAdmin />,
      },
      {
        path: "duyet-tin-dang",
        element: <PendingPost />,
      },
    ],
  },
  {
    path: "/chat-app",
    element: <ChatApp />,
  },
]);
