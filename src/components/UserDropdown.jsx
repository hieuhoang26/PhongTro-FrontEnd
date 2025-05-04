import { useContext, useState } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";
import { BsWindowPlus } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaRegFolder } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";
import { AuthContext } from "../context/AuthContext";

export default function UserDropdown({ user }) {
  const { logout } = useContext(AuthContext);

  return (
    <div className="relative hidden lg:block">
      <div className="absolute right-0  w-[350px] bg-white shadow-2xl p-4 rounded-lg z-50 border border-gray-200 -translate-y-5">
        <a href="/" className="flex text-gray-900 mb-3 no-underline">
          <img
            className="w-[60px] h-[60px] rounded-full"
            src="https://phongtro123.com/images/default-user.svg"
            alt="avatar"
          />
          <div className="ml-3 text-sm">
            <div className="font-semibold text-base">
              {user ? user?.name : "Người dùng"}
            </div>

            <div> {user ? user?.phone : "xxxxxxxxxxx"}</div>
          </div>
        </a>

        <div className="text-xs flex justify-between bg-yellow-100 p-3 mb-3 rounded-lg border border-yellow-200">
          <div>
            <div>Số dư tài khoản</div>
            <div className="text-lg font-bold leading-tight">0</div>
          </div>
          <a
            href="/"
            className="btn btn-warning text-xs flex items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white px-3"
          >
            <span className="text-sm text-black flex items-center gap-1">
              <BsWindowPlus size={15} />
              <span>Nạp tiền</span>
            </span>
          </a>
        </div>

        <div className="mt-4">
          <a
            href="/"
            className="flex justify-between items-center text-xs text-gray-600 uppercase mb-2"
          >
            <span>Quản lý tin đăng</span>
            <span className="text-blue-500 underline text-sm">Xem tất cả</span>
          </a>
          <div className="bg-gray-100 text-center p-3 px-1 mb-3 rounded-lg">
            <ul className="flex justify-around text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-900 flex flex-col items-center"
                >
                  <FaRegFolder className="mb-1" size={20} />
                  <div>Tất cả</div>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-900 flex flex-col items-center"
                >
                  <BiSolidCheckCircle className="mb-1" size={20} />
                  <div>Đang hiển thị</div>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-900 flex flex-col items-center"
                >
                  <TiWarningOutline className="mb-1" size={20} />
                  <div>Hết hạn</div>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-900 flex flex-col items-center"
                >
                  <IoEyeOffOutline className="mb-1" size={20} />
                  <div>Tin ẩn</div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          {/* <li>
            <a
              href="/bang-gia-dich-vu"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="w-[30px] h-[30px] bg-gray-100 flex justify-center items-center rounded-full mr-2">
                <i className="icon tags text-sm" />
              </span>
              Bảng giá dịch vụ
            </a>
          </li> */}
          <li>
            <a
              href="/"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="w-[30px] h-[30px] bg-gray-100 flex justify-center items-center rounded-full mr-2">
                <BsWindowPlus size={20} />
              </span>
              Quản lý giao dịch
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="w-[30px] h-[30px] bg-gray-100 flex justify-center items-center rounded-full mr-2">
                <CiUser size={20} />
              </span>
              Quản lý tài khoản
            </a>
          </li>
          <li>
            <button
              onClick={() => {
                logout();
              }}
              href="/"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="w-[30px] h-[30px] bg-gray-100 flex justify-center items-center rounded-full mr-2">
                <IoIosLogOut />
              </span>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
