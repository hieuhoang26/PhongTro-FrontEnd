import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const posts = [
  {
    id: 1,
    title: "Full nội thất cao cấp, Ban công thoáng mát. Nhà có thang máy",
    price: "3.8 triệu/tháng",
    area: "22 m²",
    location: "Hà Đông, Hà Nội",
    img: "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/04/19/1000005834_1745034103.jpg",
    link: "/full-noi-that-cao-cap-ban-cong-thoang-mat-nha-thang-may-khong-chung-chu-gio-giac-tu-do-ib-de-co-th-pr679766.html",
    imagesCount: 6,
  },
  {
    id: 2,
    title: "CHO THUÊ PHÒNG ĐẦY ĐỦ TIỆN NGHI – GIÁ RẺ",
    price: "3.2 triệu/tháng",
    area: "27 m²",
    location: "Hà Đông, Hà Nội",
    img: "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/04/19/z6472969710266-66191bca0e43c57d3bccc8af2fe2cd52_1745032923.jpg",
    link: "/cho-thue-phong-day-du-tien-nghi-gia-re-pr679761.html",
    imagesCount: 7,
  },
  // Thêm các post khác nếu cần
];

export default function RelatedPost() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % posts.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + posts.length) % posts.length);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center bg-white shadow-sm px-4 py-3 rounded-t-lg">
        <h2 className="text-lg font-medium text-gray-800">
          Tin đăng cùng khu vực
        </h2>
        <div className="flex space-x-2">
          <button
            className="bg-white rounded shadow w-8 h-8 flex items-center justify-center"
            onClick={prev}
          >
            <FaChevronLeft className="text-red-600 w-5 h-5" />
          </button>
          <button
            className="bg-white rounded shadow w-8 h-8 flex items-center justify-center"
            onClick={next}
          >
            <FaChevronRight className="text-red-600 w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-sm p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {posts.map((post, idx) => (
            <a
              href={post.link}
              key={post.id}
              className={`block p-2 border rounded hover:shadow ${
                idx === current ? "block" : "hidden md:block"
              }`}
            >
              <div className="relative aspect-video rounded overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded flex items-center">
                  {/* <Camera className="w-3 h-3 mr-1" /> */}
                  {post.imagesCount}
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-sm font-medium line-clamp-2 text-blue-700">
                  {post.title}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-red-500">
                    {post.price}
                  </span>
                  <span className="mx-1">•</span>
                  <span>{post.area}</span>
                </div>
                <div className="text-xs text-gray-500 line-clamp-1">
                  {post.location}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
