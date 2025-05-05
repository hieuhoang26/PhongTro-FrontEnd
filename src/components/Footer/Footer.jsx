import React from "react";
import PartnerAndInfoSection from "./PartnerAndInfoSection";

const Footer = () => {
  const columns = [
    {
      title: "Phòng trọ, nhà trọ",
      href: "https://phongtro123.com",
      cities: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Bình Dương"],
      urlPrefix: "https://phongtro123.com/tinh-thanh/",
      slugify: (city) => city.toLowerCase().replace(/\s+/g, "-"),
      label: (city) => `Phòng trọ ${city}`,
    },
    {
      title: "Thuê nhà nguyên căn",
      href: "/nha-cho-thue",
      cities: ["Hồ Chí Minh", "Hà Nội", "Bình Dương", "Đà Nẵng"],
      urlPrefix: "https://phongtro123.com/cho-thue-nha-nguyen-can-",
      slugify: (city) => city.toLowerCase().replace(/\s+/g, "-"),
      label: (city) => `Thuê nhà ${city}`,
    },
    {
      title: "Cho thuê căn hộ",
      href: "/cho-thue-can-ho",
      cities: ["Hồ Chí Minh", "Hà Nội", "Bình Dương", "Đà Nẵng"],
      urlPrefix: "https://phongtro123.com/cho-thue-can-ho-chung-cu-",
      slugify: (city) => city.toLowerCase().replace(/\s+/g, "-"),
      label: (city) => `Thuê căn hộ ${city}`,
    },
    {
      title: "Cho thuê mặt bằng",
      href: "/cho-thue-mat-bang",
      cities: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Bình Dương"],
      urlPrefix: "https://phongtro123.com/cho-thue-mat-bang-",
      slugify: (city) => city.toLowerCase().replace(/\s+/g, "-"),
      label: (city) => `Thuê mặt bằng ${city}`,
    },
    {
      title: "Tìm người ở ghép",
      href: "/tim-nguoi-o-ghep",
      cities: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Bình Dương"],
      urlPrefix: "https://phongtro123.com/tim-nguoi-o-ghep-",
      slugify: (city) => city.toLowerCase().replace(/\s+/g, "-"),
      label: (city) => `Ở ghép ${city}`,
    },
  ];

  return (
    <footer className="bg-yellow-200 pt-6 pb-4 mt-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {columns.map((col, index) => (
          <div key={index}>
            <a
              href={col.href}
              title={col.title}
              className="text-base font-semibold text-gray-800 uppercase mb-2 inline-block"
            >
              {col.title}
            </a>
            <ul>
              {col.cities.map((city) => (
                <li key={city}>
                  <a
                    href={`${col.urlPrefix}${col.slugify(city)}`}
                    title={`${col.title} tại ${city}`}
                    className="block py-1 text-gray-800 hover:text-orange-600 transition"
                  >
                    {col.label(city)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <PartnerAndInfoSection />
    </footer>
  );
};

export default Footer;
