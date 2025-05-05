import React from "react";
import { FaHeadset, FaPhoneAlt } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";

const SupportSection = () => {
  return (
    <div className="px-4 mt-8">
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hình ảnh */}
          <div className="md:w-1/2 flex justify-center p-6">
            <img
              loading="lazy"
              className="object-contain max-h-[390px]"
              src="https://phongtro123.com/images/contact-us-pana-orange.svg"
              alt="Hỗ trợ chủ nhà đăng tin"
            />
          </div>

          {/* Nội dung hỗ trợ */}
          <div className="md:w-1/2 text-center p-6 md:p-10">
            {/* Biểu tượng headset */}
            <div className="flex justify-center mb-2 text-4xl text-black-500">
              <FaHeadset />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Hỗ trợ chủ nhà đăng tin
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              Nếu bạn cần hỗ trợ đăng tin, vui lòng liên hệ số điện thoại bên
              dưới:
            </p>

            {/* Hai nút gọi và zalo */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
              <a
                href="tel:0909316890"
                target="_blank"
                rel="nofollow"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <FaPhoneAlt />
                ĐT: 0909316890
              </a>

              <a
                // href="https://zalo.me/0909316890"
                target="_blank"
                rel="nofollow"
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <LuMessageSquareMore />
                Zalo: 0909316890
              </a>
            </div>

            <p className="text-lg text-gray-700 mb-2">Hỗ trợ ngoài giờ</p>

            <a
              // href="https://zalo.me/3147498124795880743"
              target="_blank"
              rel="nofollow"
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-2 rounded-xl inline-flex items-center justify-center gap-2"
            >
              <LuMessageSquareMore />
              Zalo: Phongtro123
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
