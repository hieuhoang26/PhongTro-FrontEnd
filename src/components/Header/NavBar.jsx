import { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: 1, label: "Phòng trọ", href: "/phong-tro" },
  { id: 2, label: "Nhà nguyên căn", href: "/nha-nguyen-can" },
  { id: 3, label: "Căn hộ chung cư", href: "/can-ho-chung-cu" },
  { id: 4, label: "Căn hộ mini", href: "/can-ho-mini" },
  { id: 5, label: "Căn hộ dịch vụ", href: "/can-ho-dich-vu" },
  { id: 6, label: "Ở ghép", href: "/o-ghep" },
  { id: 7, label: "Mặt bằng", href: "/mat-bang" },
];

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    postsData,
    loading,
    totalPages,
    filterParams,
    setFilterParams,
    fetchPosts,
  } = useFilter();

  // const activeId = navItems.find(
  //   (item) => location.pathname.includes(item.href.replace("/", ""))?.id || 1
  // );
  const activeId =
    navItems.find(
      (item) =>
        location.pathname === item.href || location.pathname === `${item.href}/`
    )?.id || filterParams.typeId;

  // const [activeId, setActiveId] = useState(1);

  // useEffect(() => {
  //   fetchPosts({
  //     typeId: activeId,
  //   });
  // }, [activeId]);

  const handleItemClick = (id, href) => {
    navigate(href);
    setFilterParams((prev) => ({
      ...prev,
      typeId: id,
      page: 0, // Reset to first page when changing type
    }));
  };

  return (
    <div className="container hidden lg:block">
      <nav>
        <ul className="flex justify-center h-10">
          {navItems.map((item) => (
            <li key={item.id} className="h-full me-4">
              <Link
                // href={!isHomePage ? "/" : ""}
                to={item.href}
                title={item.label}
                // onClick={() => setActiveId(item.id)}
                onClick={() => handleItemClick(item.id, item.href)}
                className={`text-sm flex items-center h-full border-b-2 transition-colors duration-200 ${
                  activeId === item.id
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-700 hover:text-red-500 hover:border-red-500"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Render Blog item separately */}
          <li className="h-full me-4">
            <a
              href="/blog"
              title="Blog"
              // onClick={() => setActiveId("BLOG")}
              // onClick={() => handleItemClick(item.id, item.href)}
              className={`text-sm flex items-center h-full border-b-2 transition-colors duration-200 ${
                activeId === "BLOG"
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-700 hover:text-red-500 hover:border-red-500"
              }`}
            >
              Blog
            </a>
          </li>

          {/* Render Bảng giá dịch vụ item separately */}
          <li className="h-full me-4">
            <a
              href="/bang-gia"
              title="Bảng giá dịch vụ"
              // onClick={() => setActiveId("BANG_GIA")}
              // onClick={() => handleItemClick(item.id, item.href)}
              className={`text-sm flex items-center h-full border-b-2 transition-colors duration-200 ${
                activeId === "BANG_GIA"
                  ? "border-red-500 text-red-500"
                  : "border-transparent text-gray-700 hover:text-red-500 hover:border-red-500"
              }`}
            >
              Bảng giá dịch vụ
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
