import React from "react";
import { FaFacebookF, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const PartnerAndInfoSection = () => {
  const partners = [
    {
      name: "bds123.vn",
      url: "https://bds123.vn/",
      logo: "https://phongtro123.com/images/logo-bds123.svg",
      width: 120,
    },
    {
      name: "chothuenha",
      url: "https://chothuenha.me/",
      logo: "https://phongtro123.com/images/logo-chothuenha.svg",
      width: 140,
    },
    {
      name: "thuecanho123",
      url: "https://thuecanho123.com/",
      logo: "https://phongtro123.com/images/logo-thuecanho.svg",
      width: 150,
    },
    {
      name: "chothuephongtro.me",
      url: "https://chothuephongtro.me/",
      logo: "https://phongtro123.com/images/logo-chothuephongtro.svg",
      width: 150,
    },
  ];

  const aboutLinks = [
    "Giới thiệu",
    "Quy chế hoạt động",
    "Quy định sử dụng",
    "Chính sách bảo mật",
    "Liên hệ",
  ];

  const customerLinks = [
    "Câu hỏi thường gặp",
    "Hướng dẫn đăng tin",
    "Bảng giá dịch vụ",
    "Quy định đăng tin",
    "Giải quyết khiếu nại",
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4 text-sm text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Partner logos */}
        <div className="border-y border-gray-300 py-4 text-center mb-6">
          <p className="mb-3">Cùng hệ thống LBKCorp:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-white p-2 rounded shadow-sm w-32 h-12"
              >
                <img
                  loading="lazy"
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  className="object-contain h-[22px]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* dddd */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* About */}
          <div>
            <h3 className="font-semibold uppercase text-base mb-2">
              Về phongtro123.com
            </h3>
            <ul>
              {aboutLinks.map((item) => (
                <li key={item}>
                  <a
                    className="block py-1 text-gray-800 hover:text-blue-600"
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="font-semibold uppercase text-base mb-2">
              Dành cho khách hàng
            </h3>
            <ul>
              {customerLinks.map((item) => (
                <li key={item}>
                  <a
                    className="block py-1 text-gray-800 hover:text-blue-600"
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment methods */}
          <div>
            <h3 className="font-semibold uppercase text-base mb-2">
              Phương thức thanh toán
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  src: "https://phongtro123.com/images/logo-visa.svg",
                  alt: "Visa",
                },
                {
                  src: "https://phongtro123.com/images/logo-mastercard.svg",
                  alt: "Mastercard",
                },
                {
                  src: "https://phongtro123.com/images/logo-jcb.svg",
                  alt: "JCB",
                },
                {
                  src: "https://phongtro123.com/images/momo_square_pinkbg.svg",
                  alt: "MoMo",
                },
                {
                  src: "https://phongtro123.com/images/zalopay-new.png",
                  alt: "Zalopay",
                },
              ].map((item, idx) => (
                <img
                  key={idx}
                  loading="lazy"
                  src={item.src}
                  alt={item.alt}
                  className="object-contain w-[55px] h-[30px] bg-white rounded p-1"
                />
              ))}
            </div>
          </div>

          {/* Social media */}
          <div>
            <h3 className="font-semibold uppercase text-base mb-2">
              Theo dõi Phongtro123.com
            </h3>
            <div className="flex gap-2 mt-2">
              {[
                {
                  icon: <FaFacebookF />,
                },
                {
                  icon: <FaYoutube />,
                },
                {
                  icon: <SiZalo />,
                },
                {
                  icon: <FaTwitter />,
                },
                {
                  icon: <FaTiktok />,
                },
              ].map(({ href, icon }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={`Phongtro123 trên ${icon}`}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* sdddd */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-xs">
          <p className="font-semibold uppercase text-base mb-2">
            Công ty TNHH LBKCORP
          </p>
          <p className="mb-1">
            Số 3 phố Cầu Giấy, P.Láng Thượng, Q.Đống Đa, Hà Nội
          </p>
          <p className="mb-1">
            Tổng đài CSKH:{" "}
            <a className="text-red-500" href="tel:0909316890">
              0909 316 890
            </a>{" "}
            - Email: cskh.phongtro123@gmail.com - GPKD: 0313588502 do Sở KH&ĐT
            TP.HCM cấp 24/12/2015
          </p>
          <div className="flex items-center mt-3 gap-4">
            <a
              target="_blank"
              rel="nofollow noreferrer"
              aria-label="Bộ Công Thương"
            >
              <img
                src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoCCDV.png"
                alt="Bộ Công Thương"
                className="w-24 h-10 object-contain"
              />
            </a>
            <a
              target="_blank"
              rel="nofollow noreferrer"
              title="DMCA.com Protection Status"
            >
              <img
                src="https://phongtro123.com/images/dmca-badge-w250-2x1-04.png"
                alt="DMCA Protection"
                className="w-24 h-10 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerAndInfoSection;
