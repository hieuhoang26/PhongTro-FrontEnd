import { useState } from "react";

const navItems = [
  { id: "PHONG_TRO", label: "Phòng trọ", href: "/" },
  { id: "NHA_NGUYEN_CAN", label: "Nhà nguyên căn", href: "/" },
  { id: "CAN_HO_CHUNG_CU", label: "Căn hộ chung cư", href: "/cho-thue-can-ho" },
  { id: "CAN_HO_MINI", label: "Căn hộ mini", href: "/cho-thue-can-ho-mini" },
  {
    id: "CAN_HO_DICH_VU",
    label: "Căn hộ dịch vụ",
    href: "/cho-thue-can-ho-dich-vu",
  },
  { id: "O_GHEP", label: "Ở ghép", href: "/tim-nguoi-o-ghep" },
  { id: "MAT_BANG", label: "Mặt bằng", href: "/cho-thue-mat-bang" },
  { id: "BLOG", label: "Blog", href: "/blog.html" },
  { id: "BANG_GIA", label: "Bảng giá dịch vụ", href: "/bang-gia-dich-vu" },
];

export default function NavBar() {
  const [activeId, setActiveId] = useState();

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
        </ul>
      </nav>
    </div>
  );
}
