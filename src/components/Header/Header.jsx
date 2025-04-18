import { useState } from "react";
import logo from "../../assets/logowithoutbg.png";
import default_user from "../../assets/default_user.svg";
import {
  FiHeart,
  FiFolder,
  FiUser,
  FiPlus,
  FiMapPin,
  FiFilter,
  FiMenu,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { IoIosLogOut } from "react-icons/io";
import { GoPersonAdd } from "react-icons/go";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  return (
    <header className="bg-white text-gray-800 text-sm shadow-sm sticky top-0 z-[1021]">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex justify-between items-center border-b border-gray-100 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"} className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="w-[240px] h-[50px] object-contain"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex ms-4">
              <div className="w-full">
                <div className="flex relative bg-white gap-2">
                  <button
                    className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 rounded-2xl border border-gray-300 min-w-[200px]"
                    onClick={() => console.log("Search by location")}
                  >
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span className="font-normal truncate">
                      Tìm theo khu vực
                    </span>
                  </button>
                  <button
                    className="flex items-center px-3 py-2 text-gray-700 bg-transparent rounded-2xl border border-gray-300"
                    onClick={() => console.log("Open filters")}
                  >
                    <FiFilter className="w-4 h-4 mr-1" />
                    <span>Bộ lọc</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex">
              <a
                href="/"
                className="flex items-center px-3 py-2 text-gray-700 rounded-full hover:bg-gray-100"
              >
                <FiHeart className="w-4 h-4 mr-2" />
                <span>Tin đã lưu</span>
              </a>

              <a
                href="/"
                className="hidden xl:flex items-center px-3 py-2 text-gray-700 rounded-full hover:bg-gray-100 mr-4"
              >
                <FiFolder className="w-4 h-4 mr-2" />
                <span>Quản lý</span>
              </a>

              {/* Account Dropdown */}
              <div className="hidden lg:block relative">
                <button
                  className="flex items-center px-3 py-2 text-gray-700"
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                >
                  <img
                    src={default_user}
                    alt="Ảnh đại diện"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>Tài khoản</span>
                  <FaCaretDown />
                </button>

                {showAccountDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                    <a
                      href="/dang-ky"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-2">
                          <GoPersonAdd className="w-4 h-4" />
                        </span>
                        Tạo tài khoản mới
                      </div>
                    </a>
                    <a
                      href="/dang-nhap"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-2">
                          <IoIosLogOut className="w-4 h-4" />
                        </span>
                        Đăng nhập
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/"
                className="hidden lg:flex items-center justify-center ml-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                <span>Đăng tin</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-center">
        <div className="">
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
