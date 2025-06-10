import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { postApi } from "../api/post";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export const RelatedPost = ({ post }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await postApi.getNearbyDistrict(
          post.type,
          post.districtId,
          post.id
        );
        setPosts(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch nearby posts:", error);
      }
    };

    fetchData();
  }, [post]);

  if (posts.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-2">Tin đăng cùng khu vực</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {posts.map((item) => (
          <SwiperSlide key={item.id}>
            <a
              href={`/detail/${item.id}`}
              className="block border border-gray-200 rounded p-2 shadow hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden rounded">
                <img
                  src={item.images?.[1]}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {item.images?.length || 0}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium text-blue-700 line-clamp-2">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="text-red-500 font-semibold">
                    {item.price?.toLocaleString("vi-VN")} đ
                  </span>{" "}
                  • <span>{item.area} m²</span>
                </div>
                <div className="text-xs text-gray-500 line-clamp-1">
                  {item.address}
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
