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
import PriceList from "../page/PriceList";
import { ChatApp } from "../page/Chat/ChatAppdemo";
import SavedPost from "../page/SavedPost";
import VnPayReturnPage from "../components/Pay/VnPayReturnPage";
import { AccountManager } from "../page/Dash/User/Acc/AccountManager";
import { PersonalInfo } from "../page/Dash/User/Acc/PersonalInfo";
import { ChangePhone } from "../page/Dash/User/Acc/ChangePhone";
import { ChangePassword } from "../page/Dash/User/Acc/ChangePassword";
import WalletManager from "../page/Dash/User/Wallet/WalletManager";
import TopUpCon from "../page/Dash/User/Wallet/TopUpCon";
import { HistoryTopUp } from "../page/Dash/User/Wallet/HistoryTopUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home typeId={1} />,
      },
      {
        path: "phong-tro",
        // index: true,
        element: <Home typeId={1} />,
      },
      {
        path: "nha-nguyen-can",
        element: <Home typeId={2} />,
      },
      {
        path: "can-ho-chung-cu",
        element: <Home typeId={3} />,
      },
      {
        path: "can-ho-mini",
        element: <Home typeId={4} />,
      },
      {
        path: "can-ho-dich-vu",
        element: <Home typeId={5} />,
      },
      {
        path: "o-ghep",
        element: <Home typeId={6} />,
      },
      {
        path: "mat-bang",
        element: <Home typeId={7} />,
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
      {
        path: "/tin-luu",
        element: <SavedPost />,
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

      {
        path: "tai-khoan",
        element: <AccountManager />,
        children: [
          {
            index: true,
            // path: "thong-tin",
            element: <PersonalInfo />,
          },
          {
            path: "doi-dien-thoai",
            element: <ChangePhone />,
          },
          {
            path: "doi-mat-khau",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "giao-dich",
        element: <WalletManager />,
        children: [
          {
            index: true,
            element: <TopUpCon />,
          },
          {
            path: "lich-su-nap-tien",
            element: <HistoryTopUp />,
          },
          // {
          //   path: "lich-su-thanh-toan",
          //   element: <ChangePassword />,
          // },
        ],
      },
    ],
  },
  {
    path: "/chat-app",
    element: <ChatApp />,
  },
  {
    path: "/vnpay-return",
    element: <VnPayReturnPage />,
  },
]);
