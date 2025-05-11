import { useContext, useEffect, useState } from "react";
import { BsClockHistory, BsWindowPlus } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaRegFolder } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoFolderOpenOutline, IoPricetagOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { AuthContext } from "../../context/AuthContext";
import { userApi } from "../../api/user";

export const SidebarUser = () => {
  const { userId } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          setLoading(true); // Set loading to true when starting to fetch
          const res = await userApi.getById(userId);
          setUserInfo(res.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Set loading to false when done (whether success or error)
        }
      } else {
        setLoading(false); // No userId, no need to load
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="sidebar-admin-loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <aside className="hidden xl:block fixed top-[45px] left-0 w-[16.6667%] bg-white text-gray-800 shadow-sm h-full overflow-auto pb-[45px]">
      <div className="flex flex-col h-full">
        <div className="flex p-4 pb-3 px-3 w-full">
          <img
            className="w-12 h-12 rounded-full"
            src="https://phongtro123.com/images/default-user.svg"
            alt="User avatar"
          />
          <div className="ml-2 pl-1 flex-grow">
            <span className="font-medium block truncate">{userInfo?.name}</span>
            <span className="text-sm block">{userInfo?.phone}</span>
            <span className="text-xs block mt-1">
              Mã tài khoản: {userInfo?.id}
            </span>
          </div>
        </div>

        <div className="px-3 pt-0 w-full">
          <div className="flex justify-between bg-yellow-100 text-gray-800 p-2 text-sm rounded border border-yellow-200">
            <div>
              <p className="m-0 text-sm">Số dư tài khoản</p>
              <p className="m-0 text-base font-bold">
                {userInfo?.balance || 0}
              </p>
            </div>
            <a
              href="/admin"
              className="btn btn-warning text-black px-2 py-1 rounded-full text-sm flex items-center gap-1
              bg-yellow-300 text-gray-800 p-2 text-sm rounded border border-yellow-200"
            >
              <BsWindowPlus size={15} />
              Nạp tiền
            </a>
          </div>
        </div>

        <ul className="px-2 py-5 flex-grow space-y-1 mt-3">
          <li>
            <a
              href="/admin"
              className="flex items-center gap-2 text-gray-600 px-2 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
            >
              <LiaEdit size={20} />
              <span>Đăng tin mới</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/bai-dang-user"
              className="flex items-center gap-2 text-gray-600 px-2 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
            >
              <IoFolderOpenOutline size={20} />
              <span>Danh sách tin đăng</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/giao-dich"
              className="flex items-center gap-2 text-gray-600 px-2 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
            >
              <BsWindowPlus size={20} />
              <span>Quản lí giao dịch</span>
            </a>
          </li>

          <li>
            <a
              href="/bang-gia"
              className="flex items-center gap-2 text-gray-600 px-2 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
            >
              <IoPricetagOutline size={20} />
              <span>Bảng giá dịch vụ</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/tai-khoan"
              className="flex items-center gap-2 text-gray-600 px-2 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
            >
              <CiUser size={20} />
              <span>Quản lý tài khoản</span>
            </a>
          </li>
          <li>
            <a
              href="/thoat"
              className="flex items-center gap-2 text-gray-600 px-2 py-2 rounded hover:bg-gray-100 hover:text-gray-800"
            >
              <IoIosLogOut size={20} />
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>

        <div className="border-t p-3">
          <a
            href="https://zalo.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start text-gray-800 hover:bg-gray-100 rounded p-2"
          >
            {/* <Headphones className="mr-3 mt-1" size={18} /> */}
            <div>
              <p className="text-xs m-0">Nhân viên hỗ trợ riêng của bạn:</p>
              {/* <p className="text-sm font-bold m-0">
                {user.support.name} - {user.support.phone}
              </p> */}
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
};
