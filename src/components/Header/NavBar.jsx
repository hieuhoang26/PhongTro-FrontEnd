import { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext";

const navItems = [
  { id: 1, label: "Phòng trọ", href: "/" },
  { id: 2, label: "Nhà nguyên căn", href: "/" },
  { id: 3, label: "Căn hộ chung cư", href: "/" },
  { id: 4, label: "Căn hộ mini", href: "/" },
  {
    id: 5,
    label: "Căn hộ dịch vụ",
    href: "/",
  },
  { id: 6, label: "Ở ghép", href: "/" },
  { id: 7, label: "Mặt bằng", href: "/" },
];

export default function NavBar() {
  const [activeId, setActiveId] = useState(1);

  const {
    postsData,
    loading,
    totalPages,
    filterParams,
    setFilterParams,
    fetchPosts,
  } = useFilter();

  useEffect(() => {
    fetchPosts({
      typeId: activeId,
    });
  }, [activeId]);

  return (
    <div className="container hidden lg:block">
      <nav>
        <ul className="flex justify-center h-10">
          {navItems.map((item) => (
            <li key={item.id} className="h-full me-4">
              <a
                href={item.href}
                title={item.label}
                onClick={() => setActiveId(item.id)}
                className={`text-sm flex items-center h-full border-b-2 transition-colors duration-200 ${
                  activeId === item.id
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-700 hover:text-red-500 hover:border-red-500"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}

          {/* Render Blog item separately */}
          <li className="h-full me-4">
            <a
              href="/blog.html"
              title="Blog"
              onClick={() => setActiveId("BLOG")}
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
              onClick={() => setActiveId("BANG_GIA")}
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
