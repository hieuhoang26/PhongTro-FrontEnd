import React from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import Testimonials from "../components/Review/Testimonials";
import SupportSection from "../components/Footer/SupportSection";
import Footer from "../components/Footer/Footer";

const PriceList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Bảng giá tin đăng
        </h1>
        <p className="text-lg text-gray-500 mt-2">Áp dụng từ 31/05/2024</p>
      </header>

      <div className="overflow-x-auto  ">
        <table className="min-w-full border border-gray-300 text-base text-center bg-white">
          <thead>
            <tr className="text-white text-sm md:text-base font-semibold">
              <th className="bg-gray-100 text-gray-700 p-4 w-40"></th>
              <th className="bg-red-500 p-4">
                Tin VIP Nổi Bật
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                  ))}
                </div>
              </th>
              <th className="bg-pink-500 p-4">
                Tin VIP 1
                <div className="flex justify-center mt-1">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                  ))}
                </div>
              </th>
              <th className="bg-orange-500 p-4">
                Tin VIP 2
                <div className="flex justify-center mt-1">
                  {[...Array(3)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                  ))}
                </div>
              </th>
              <th className="bg-blue-500 p-4">
                Tin VIP 3
                <div className="flex justify-center mt-1">
                  {[...Array(2)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                  ))}
                </div>
              </th>
              <th className="bg-blue-700 p-4">Tin thường</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-base">
            {/* Giá theo ngày / tuần / tháng / đẩy tin */}
            {[
              {
                label: "Giá ngày",
                values: ["50.000₫", "30.000₫", "20.000₫", "10.000₫", "2.000₫"],
                minDays: [3, 3, 3, 3, 5],
              },
              {
                label: "Giá tuần",
                values: [
                  "315.000₫",
                  "190.000₫",
                  "133.000₫",
                  "63.000₫",
                  "12.000₫",
                ],
                note: "(7 ngày)",
              },
              {
                label: "Giá tháng",
                values: [
                  {
                    original: "1.500.000₫",
                    discount: "20%",
                    final: "1.200.000₫",
                  },
                  { original: "900.000₫", discount: "11%", final: "800.000₫" },
                  { original: "600.000₫", discount: "10%", final: "540.000₫" },
                  { original: "300.000₫", discount: "20%", final: "240.000₫" },
                  { original: "60.000₫", discount: "20%", final: "48.000₫" },
                ],
                note: "(30 ngày)",
              },
              {
                label: "Giá đẩy tin",
                values: ["5.000₫", "3.000₫", "2.000₫", "2.000₫", "2.000₫"],
              },
            ].map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-200">
                <td className="bg-gray-100 text-left p-3 font-medium text-gray-700">
                  {row.label}
                  {row.note && (
                    <div className="text-xs text-gray-500">{row.note}</div>
                  )}
                </td>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {typeof value === "string" ? (
                      <>
                        <div className="font-medium text-gray-800">{value}</div>
                        {row.minDays && (
                          <div className="text-xs text-gray-500">
                            (Tối thiểu {row.minDays[colIndex]} ngày)
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-400 line-through">
                          {value.original}
                        </div>
                        <div className="text-xs text-green-600">
                          Giảm {value.discount}
                        </div>
                        <div className="text-base font-medium text-gray-800">
                          {value.final}
                        </div>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Màu sắc tiêu đề */}
            <tr className="border-t border-gray-200">
              <td className="bg-gray-100 text-left p-3 font-medium text-gray-700">
                Màu sắc tiêu đề
              </td>
              {[
                { color: "var(--color-vipnoibat)", text: "MÀU ĐỎ, IN HOA" },
                { color: "var(--color-vip1)", text: "MÀU HỒNG, IN HOA" },
                { color: "var(--color-vip2)", text: "MÀU CAM, IN HOA" },
                { color: "var(--color-vip3)", text: "MÀU XANH, IN HOA" },
                {
                  color: "var(--color-tinthuong)",
                  text: "Màu mặc định, viết thường",
                  weight: "500",
                },
              ].map((item, index) => (
                <td key={index} className="p-3">
                  <span
                    className="uppercase"
                    style={{
                      color: item.color,
                      fontWeight: item.weight || "bold",
                    }}
                  >
                    {item.text}
                  </span>
                </td>
              ))}
            </tr>

            {/* Kích thước tin */}
            <tr className="border-t border-gray-200">
              <td className="bg-gray-100 text-left p-3 font-medium text-gray-700">
                Kích thước tin
              </td>
              {["Rất lớn", "Lớn", "Trung bình", "Trung bình", "Nhỏ"].map(
                (size, index) => (
                  <td key={index} className="p-3 text-gray-700">
                    {size}
                  </td>
                )
              )}
            </tr>

            {/* Tự động duyệt */}
            <tr className="border-t border-gray-200">
              <td className="bg-gray-100 text-left p-3 font-medium text-gray-700">
                Tự động duyệt (*)
              </td>
              {[true, true, true, true, false].map((approved, index) => (
                <td key={index} className="p-3 text-center">
                  <FaCheckCircle
                    className={
                      approved
                        ? "text-green-500 text-xl mx-auto"
                        : "text-gray-300 text-xl mx-auto"
                    }
                  />
                </td>
              ))}
            </tr>

            {/* Nút gọi điện */}
            <tr className="border-t border-gray-200">
              <td className="bg-gray-100 text-left p-3 font-medium text-gray-700">
                Hiển thị nút gọi điện
              </td>
              {[true, true, false, false, false].map((showButton, index) => (
                <td key={index} className="p-3 text-center">
                  <FaCheckCircle
                    className={
                      showButton
                        ? "text-green-500 text-xl mx-auto"
                        : "text-gray-300 text-xl mx-auto"
                    }
                  />
                </td>
              ))}
            </tr>

            {/* Nút demo */}
            <tr className="border-t border-gray-300">
              <td className="bg-gray-100 p-3"></td>
              {[
                "demo-vip-noibat",
                "demo-vip-1",
                "demo-vip-2",
                "demo-vip-3",
                "demo-tinthuong",
              ].map((demoId, index) => (
                <td key={index} className="p-3">
                  <button
                    className="w-100px text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md shadow transition-all"
                    onClick={() =>
                      document
                        .getElementById(demoId)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Xem demo
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-600">
          (*) Các tin VIP sẽ được hiển thị ngay sau khi khách hàng đăng tin mà
          không cần chờ kiểm duyệt. Tin đăng sẽ được kiểm duyệt nội dung sau.
        </p>
      </div>

      <div class="flex justify-center pt-5 mt-3">
        <div class="w-full lg:w-4/5">
          <h2 class="text-4xl mb-6">Minh họa tin đăng</h2>

          {/* VIP Nổi Bật */}
          <div className="pb-4 mb-4" id="demo-vip-noibat">
            <div>
              <div className="flex mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-medium">Tin VIP Nổi Bật</span>
                  <div className="flex ml-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg font-light mb-4">
                <span className="text-red-600 font-bold uppercase">
                  TIÊU ĐỀ IN HOA MÀU ĐỎ
                </span>
                , gắn biểu tượng 5 ngôi sao màu vàng và hiển thị to và nhiều
                hình hơn các tin khác. Nằm trên tất cả các tin khác, được hưởng
                nhiều ưu tiên và hiệu quả giao dịch cao nhất.
              </p>
              <p class="text-lg font-light">
                Đồng thời xuất hiện đầu tiên ở mục tin nổi bật xuyên suốt khu
                vực chuyên mục đó
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mt-6">
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vipnoibat.jpg"
                  alt="Demo VIP Nổi Bật"
                  class="w-full"
                />
              </div>
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vipnoibat-mobile.jpg"
                  alt="Demo VIP Nổi Bật Mobile"
                  class="w-full"
                />
              </div>
            </div>
          </div>

          {/* VIP 1 */}
          <div className="pb-4 mb-4" id="demo-vip-1">
            <div>
              <div className="flex mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-medium">Tin VIP 1</span>
                  <div className="flex ml-3">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg font-light mb-4">
                <span className="text-pink-500 font-bold uppercase">
                  TIÊU ĐỀ IN HOA MÀU HỒNG
                </span>
                , gắn biểu tượng 4 ngôi sao màu vàng ở tiêu đề tin đăng. Hiển
                thị sau tin VIP Nổi Bật và trên các tin khác.
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mt-6">
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vip1.jpg"
                  alt="Demo VIP Nổi Bật"
                  class="w-full"
                />
              </div>
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vip1-mobile.jpg"
                  alt="Demo VIP Nổi Bật Mobile"
                  class="w-full"
                />
              </div>
            </div>
          </div>

          {/* VIP 2 */}
          <div className="pb-4 mb-4" id="demo-vip-2">
            <div>
              <div className="flex mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-medium">Tin VIP 2</span>
                  <div className="flex ml-3">
                    {[...Array(3)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg font-light mb-4">
                <span className="text-pink-500 font-bold uppercase">
                  TIÊU ĐỀ IN HOA MÀU CAM
                </span>
                , gắn biểu tượng 3 ngôi sao màu vàng ở tiêu đề tin đăng. Hiển
                thị sau tin VIP Nổi Bật, Tin VIP 1 và trên các tin khác.
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mt-6">
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vip2.jpg"
                  alt="Demo VIP Nổi Bật"
                  class="w-full"
                />
              </div>
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vip2-mobile.jpg"
                  alt="Demo VIP Nổi Bật Mobile"
                  class="w-full"
                />
              </div>
            </div>
          </div>
          {/* VIP 3 */}
          <div className="pb-4 mb-4" id="demo-vip-3">
            <div>
              <div className="flex mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-medium">Tin VIP 3</span>
                  <div className="flex ml-3">
                    {[...Array(2)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg font-light mb-4">
                <span className="text-blue-500 font-bold uppercase">
                  TIÊU ĐỀ IN HOA MÀU XANH
                </span>
                , gắn biểu tượng 2 ngôi sao màu vàng ở tiêu đề tin đăng. Hiển
                thị sau tin VIP Nổi Bật, Tin VIP 1, Tin VIP 2 và trên các tin
                khác.
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mt-6">
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vip1.jpg"
                  alt="Demo VIP Nổi Bật"
                  class="w-full"
                />
              </div>
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-vip1-mobile.jpg"
                  alt="Demo VIP Nổi Bật Mobile"
                  class="w-full"
                />
              </div>
            </div>
          </div>

          {/* Tin Thường  */}
          <div className="pb-4 mb-4" id="demo-tinthuong">
            <div>
              <div className="flex mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-medium">Tin Thường</span>
                </div>
              </div>
              <p className="text-base mb-4">
                <span className="text-blue-500 ">
                  Tiêu đề màu mặc định, viết thường.
                </span>
                Hiển thị sau các tin VIP.
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mt-6">
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-tinthuong.jpg"
                  alt="Demo VIP Nổi Bật"
                  class="w-full"
                />
              </div>
              <div class="bg-white p-6 mb-6 rounded-lg">
                <img
                  src="https://phongtro123.com/images/demo-tinthuong-mobile.jpg"
                  alt="Demo VIP Nổi Bật Mobile"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <SupportSection />
    </div>
  );
};

export default PriceList;
