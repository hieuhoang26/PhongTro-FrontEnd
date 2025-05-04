import { useState } from "react";
import logo from "../../assets/logowithoutbg.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaEdit } from "react-icons/lia";

export default function HeaderAdmin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 sticky top-0 z-[1021]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo + Nav */}
          <div className="flex items-center">
            <a href="/">
              <img
                className="object-contain w-[160px] h-[45px]"
                src={logo}
                alt="Kênh thông tin cho thuê phòng trọ số 1 Việt Nam"
                title="Phongtro123.com"
              />
            </a>

            {/* Navigation */}
            <nav className="hidden xl:flex ms-4 px-3 rounded text-white h-[45px] items-center">
              <ul className="flex h-full space-x-4">
                <li>
                  <a className="px-2 h-full flex items-center" href="/">
                    Phòng trọ
                  </a>
                </li>
                <li>
                  <a
                    className="px-2 h-full flex items-center"
                    href="/nha-cho-thue"
                  >
                    Nhà nguyên căn
                  </a>
                </li>
                <li className="relative h-full flex items-center">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-2 h-full flex items-center bg-transparent text-white"
                  >
                    Căn hộ
                  </button>
                </li>
                <li>
                  <a
                    className="px-2 h-full flex items-center"
                    href="/tim-nguoi-o-ghep"
                  >
                    Ở ghép
                  </a>
                </li>
                <li>
                  <a
                    className="px-2 h-full flex items-center"
                    href="/cho-thue-mat-bang"
                  >
                    Mặt bằng
                  </a>
                </li>
                <li>
                  <a
                    className="px-2 h-full flex items-center"
                    href="/blog.html"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="px-2 h-full flex items-center"
                    href="/bang-gia-dich-vu"
                  >
                    Bảng giá dịch vụ
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* User Area */}
          <div className="flex items-center">
            <a
              href="/"
              className="hidden 2xl:flex items-center text-white mr-4"
            >
              <IoMdHeartEmpty size={20} className="mr-1" /> Tin đã lưu
            </a>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-white"
              >
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src="https://phongtro123.com/images/default-user.svg"
                  alt="avatar"
                />
                {/* <span className="truncate max-w-[130px]">Hoang Nam Tiến</span> */}
              </button>
            </div>

            <a
              href="/quan-ly/dang-tin-moi.html"
              className="hidden xl:flex items-center bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              <LiaEdit size={20} className="mr-1" /> Đăng tin
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
