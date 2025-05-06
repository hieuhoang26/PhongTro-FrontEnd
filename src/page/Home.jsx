import LocationModal from "../components/Filter/LocationModal";
import { FilterPage } from "../components/Filter/FilterPage";
import { areaRanges, cityHomePage, priceRanges } from "../utils/contant";
import PostItemNav from "../components/Item/PostItemNav";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PostCardV2 } from "../components/Item/PostCardV2";
import { PostCard } from "../components/Item/PostCard";
import { PostCardV3 } from "../components/Item/PostCardV3";
import { postApi } from "../api/post";
import { Pagination } from "../components/Pagination";
import { useFilter } from "../context/FilterContext";
import Spinner from "../components/Spinner";

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
  { label: "Có video", value: "video", hasVideo: true },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("mac-dinh");

  // const [postsData, setPostsData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(0);
  // const [size] = useState(3);
  // const [totalPages, setTotalPages] = useState(0);
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
    fetchPosts();
  }, [filterParams.page]);

  // useEffect(() => {
  //   fetchPosts({
  //     isVip: 1,
  //     sortBy: "createdAt",
  //     sortDirection: "desc",
  //   });
  // }, [filterParams.page]);

  const handlePageChange = (newPage) => {
    setFilterParams((prev) => ({
      ...prev,
      page: newPage - 1, // Vì Pagination bên bạn đang truyền newPage (1-based) còn API dùng (0-based)
    }));
  };
  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-screen-xl flex gap-6 px-4">
        {/* main */}
        <div className="w-7/10 ">
          <header className="mt-2 mb-3">
            <h1 className="text-2xl font-medium mb-2 leading-snug">
              Cho thuê Phòng Trọ - Kênh Phòng Trọ số 1 Việt Nam
            </h1>
            <p className="text-sm m-0">Có 71.657 tin đăng cho thuê</p>
          </header>
          {/* city  */}
          <div className="flex items-center justify-center gap-5 py-5">
            {cityHomePage.map((item, index) => (
              <div
                key={index}
                className="shadow-md text-black-400 cursor-pointer hover:text-orange-600 rounded-bl-md rounded-br-md"
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
          <div className="mt-4 mb-3 pt-2 flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  fetchPosts({
                    sortBy: tab.sortBy,
                    sortDirection: tab.sortDirection,
                    // hasVideo: tab.hasVideo ?? undefined,
                  });
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

          {/* posts */}
          {loading ? (
            <Spinner />
          ) : (
            <>
              {postsData.map((item) => {
                if (item.isVip === 5)
                  return <PostCardV3 key={item.id} post={item} />;
                if (item.isVip === 4 || item.isVip == 3)
                  return <PostCardV2 key={item.id} post={item} />;
                return <PostCard key={item.id} post={item} />;
              })}

              {/* pagination */}

              {/* <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
              <Pagination
                currentPage={filterParams.page + 1}
                totalPages={totalPages}
                // onPageChange={(newPage) => setPage(newPage - 1)}
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
                onSelect={(value) => setPrice(value)}
              />
              <FilterPage
                title="Xem theo diện tích"
                items={areaRanges.filter((item) => item.value !== "ALL")}
                selectedValue={area}
                onSelect={(value) => setArea(value)}
              />
            </div>
            <div className="bg-white border border-gray-300 p-4 rounded-xl shadow ">
              <div className="text-xl font-semibold mb-3">Tin mới đăng</div>
              <ul>
                {posts.map((post, index) => (
                  <PostItemNav key={index} {...post} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const posts = [
  {
    title: "CHDV Mới Khai Trương Nội Thất Mới 100% Qua Q1 chỉ 3 phút đi bộ",
    image:
      "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/04/20/sp_1745158968.jpg",
    price: "6 triệu/tháng",
    time: "38 phút trước",
    link: "/chdv-moi-khai-truong-noi-that-moi-100-qua-q1-chi-3-phut-di-bo-pr679876.html",
  },
  {
    title: "(Thủ Đức) - CẦN CHO THUÊ GẤP TẦNG TRỆT LÀM VĂN PHÒNG",
    image:
      "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/04/20/vp5_1745157031.jpg",
    price: "17 triệu/tháng",
    time: "1 giờ trước",
    link: "/thu-duc-can-cho-thue-gap-tang-tret-lam-van-phong-pr679874.html",
  },
];
