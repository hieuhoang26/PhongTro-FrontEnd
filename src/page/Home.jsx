import LocationModal from "../components/Filter/LocationModal";
import { FilterPage } from "../components/Filter/FilterPage";
import { areaRanges, cityHomePage, priceRanges } from "../utils/contant";
import PostItemNav from "../components/Item/PostItemNav";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { PostCardV2 } from "../components/Item/PostCardV2";
import { PostCard } from "../components/Item/PostCard";
import { PostCardV3 } from "../components/Item/PostCardV3";
import { postApi } from "../api/post";
import { Pagination } from "../components/Pagination";
import { useFilter } from "../context/FilterContext";
import Spinner from "../components/Spinner";
import { LuMapPinPlus } from "react-icons/lu";

const tabs = [
  {
    label: "Đề xuất",
    value: "mac-dinh",
    sortBy: "isVip",
    sortDirection: "desc",
  },
  {
    label: "Mới đăng",
    value: "moi-nhat",
    sortBy: "createdAt",
    sortDirection: "desc",
  },
  {
    label: "Giá thấp",
    value: "gia-thap",
    sortBy: "price",
    sortDirection: "asc",
  },
  {
    label: "Giá cao",
    value: "gia-cao",
    sortBy: "price",
    sortDirection: "desc",
  },
  // { label: "Có video", value: "video", hasVideo: true },
];

export default function Home({ typeId }) {
  const [activeTab, setActiveTab] = useState("mac-dinh");
  const titles = {
    1: "Kênh thông tin Phòng Trọ số 1 Việt Nam",
    2: "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất",
    3: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất",
    4: "Cho Thuê Căn Hộ Mini + Chung Cư Mini Giá Rẻ, Mới Nhất",
    5: "Cho Thuê Căn Hộ Dịch Vụ, Giá Rẻ, Mới Nhất",
    6: "Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép, Mới Nhất",
    7: "Cho Thuê Mặt Bằng, Giá Rẻ, Chính Chủ, Mới Nhất",
  };

  const titleText = titles[typeId] || "Kênh thông tin Phòng Trọ số 1 Việt Nam";

  const {
    postsData,
    loading,
    totalPages,
    filterParams,
    setFilterParams,
    fetchPosts,
    area,
    price,
    setArea,
    setPrice,
  } = useFilter();

  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      typeId: typeId || null,
      page: 0,
    }));
    // fetchPosts();
  }, [typeId]);

  const handlePageChange = (newPage) => {
    setFilterParams((prev) => ({
      ...prev,
      page: newPage - 1, // Vì Pagination bên bạn đang truyền newPage (1-based) còn API dùng (0-based)
    }));
    window.scrollTo({
      top: 0,
      behavior: "smooth", // cuộn mượt mà, có thể dùng 'auto' nếu muốn nhanh
    });
  };
  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-screen-xl flex gap-6 px-4">
        {/* main */}
        <div className="w-7/10 ">
          <header className="mt-2 mb-3">
            <h1 className="text-2xl font-medium mb-2 leading-snug">
              {titleText}
            </h1>
            <p className="text-sm m-0">Có 71.657 tin đăng cho thuê</p>
          </header>
          {/* city  */}
          <div className="flex items-center justify-center gap-5 py-5">
            {cityHomePage.map((item, index) => (
              <div
                key={index}
                className="shadow-md text-black-400 cursor-pointer hover:text-orange-600 rounded-bl-md rounded-br-md"
                // onClick={() => {
                //   fetchPosts({
                //     cityId: item.id,
                //   });
                // }}
                onClick={() => {
                  setFilterParams((prev) => ({
                    ...prev,
                    cityId: item.id,
                    page: 0,
                  }));
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
                />
                <div className="font-medium p-2 text-center">{item.label}</div>
              </div>
            ))}
          </div>
          {/* tabs */}
          <div className="mt-4 mb-3 pt-2 flex gap-4 items-center">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  // onClick={() => {
                  //   setActiveTab(tab.value);
                  //   fetchPosts({
                  //     sortBy: tab.sortBy,
                  //     sortDirection: tab.sortDirection,
                  //   });
                  // }}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setFilterParams((prev) => ({
                      ...prev,
                      sortBy: tab.sortBy,
                      sortDirection: tab.sortDirection,
                      page: 0,
                    }));
                  }}
                  className={`text-sm pb-1 ${
                    activeTab === tab.value
                      ? "font-medium border-b border-black text-black"
                      : "font-normal text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Link
              to="/map"
              className="ml-auto flex items-center gap-2 text-sm font-medium text-black  px-4 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              <LuMapPinPlus className="w-5 h-5" />
              Tìm bằng bản đồ
            </Link>
          </div>

          {/* posts */}
          {loading ? (
            <Spinner />
          ) : postsData.length === 0 ? (
            <>
              <div className="p-5 text-center flex flex-col items-center justify-center">
                <img
                  src="https://phongtro123.com/images/file-searching-rafiki-gray.svg"
                  alt="No posts in this area"
                  className="max-w-[200px] max-h-[200px]"
                />
                <p className="mt-2 text-red-600">Hiện tại chưa có tin đăng</p>
              </div>
            </>
          ) : (
            <>
              {postsData.map((item) => {
                if (item.isVip === 5)
                  return <PostCardV3 key={item.id} post={item} />;
                if (item.isVip === 4 || item.isVip === 3)
                  return <PostCardV2 key={item.id} post={item} />;
                return <PostCard key={item.id} post={item} />;
              })}

              {/* pagination */}
              <Pagination
                currentPage={filterParams.page + 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        {/*  sidebar */}
        <div className="w-3/10 ">
          <div className="grid grid-cols-1  gap-2">
            <div className="bg-white border border-gray-300 p-4 rounded-xl shadow">
              <FilterPage
                title="Xem theo khoảng giá"
                items={priceRanges.filter((item) => item.value !== "ALL")}
                selectedValue={price}
                // onSelect={(value) => setPrice(value)}
                onSelect={(value) => {
                  // setPrice(value); // Để giữ highlight
                  const [minPrice, maxPrice] = value.split("-").map(Number);
                  setFilterParams((prev) => ({
                    ...prev,
                    // typeId: typeId,
                    minPrice: isNaN(minPrice) ? null : minPrice,
                    maxPrice: isNaN(maxPrice) ? null : maxPrice,
                    page: 0,
                  }));
                }}
              />
              <FilterPage
                title="Xem theo diện tích"
                items={areaRanges.filter((item) => item.value !== "ALL")}
                selectedValue={area}
                // onSelect={(value) => setArea(value)}
                onSelect={(value) => {
                  // setArea(value); // giữ state để highlight selected
                  const [minArea, maxArea] = value.split("-").map(Number);
                  setFilterParams((prev) => ({
                    ...prev,
                    // typeId: typeId,
                    minArea: isNaN(minArea) ? null : minArea,
                    maxArea: isNaN(maxArea) ? null : maxArea,
                    page: 0,
                  }));
                }}
              />
            </div>
            <div className="bg-white border border-gray-300 p-4 rounded-xl shadow ">
              <div className="text-xl font-semibold mb-3">Tin mới đăng</div>

              <PostItemNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
