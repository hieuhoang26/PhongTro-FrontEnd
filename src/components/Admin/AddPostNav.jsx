import { useEffect, useState } from "react";

export const AddPostNav = () => {
  const [activeSection, setActiveSection] = useState("scrollspy_khuvuc");

  // Xử lý scroll và active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "scrollspy_khuvuc",
        "scrollspy_thongtinmota",
        "scrollspy_hinhanh",
        "scrollspy_video",
        "scrollspy_thongtinlienhe",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm xử lý click để scroll mượt
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Trừ đi chiều cao của header
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
      <div className="flex">
        <h1 className="text-2xl font-semibold whitespace-nowrap mb-1">
          Đăng tin cho thuê
        </h1>
      </div>
      <nav className="nav">
        <ul className="flex space-x-4 text-sm font-medium mb-0 whitespace-nowrap pb-2">
          {[
            { id: "scrollspy_khuvuc", label: "Khu vực" },
            { id: "scrollspy_thongtinmota", label: "Thông tin mô tả" },
            { id: "scrollspy_hinhanh", label: "Hình ảnh" },
            { id: "scrollspy_video", label: "Video" },
            { id: "scrollspy_thongtinlienhe", label: "Thông tin liên hệ" },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link p-2 pb-3 px-0 border-b-2 transition-colors ${
                  activeSection === item.id
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
