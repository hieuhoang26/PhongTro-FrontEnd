import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AccountManagerNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    // Cập nhật trạng thái active khi path thay đổi
    const current = location.pathname.split("/").pop();
    setActivePath(current || "/"); // Mặc định là thong-tin
  }, [location]);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(`/admin/tai-khoan/${path}`);
  };

  const navItems = [
    { path: "", label: "Thông tin cá nhân" },
    { path: "doi-dien-thoai", label: "Đổi số điện thoại" },
    { path: "doi-mat-khau", label: "Đổi mật khẩu" },
  ];

  return (
    <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
      <div className="flex">
        <h1 className="text-2xl font-semibold whitespace-nowrap mb-1">
          Quản lý tài khoản
        </h1>
      </div>
      <nav className="nav">
        <ul className="flex space-x-4 text-sm font-medium mb-0 whitespace-nowrap pb-2 mt-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={`/admin/tai-khoan/${item.path}`}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`nav-link p-2 pb-3 px-0 border-b-2 transition-colors ${
                  activePath === item.path
                    ? "border-blue-500 text-blue-600"
                    : "border-white hover:border-blue-500"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
