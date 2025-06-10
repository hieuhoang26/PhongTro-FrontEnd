import LocationModal from "../components/Filter/LocationModal";
import { FilterPage } from "../components/Filter/FilterPage";
import PostItemNav from "../components/Item/PostItemNav";

import { Link, useParams } from "react-router-dom";

import { PostCardV2 } from "../components/Item/PostCardV2";
import { PostCard } from "../components/Item/PostCard";
import { PostCardV3 } from "../components/Item/PostCardV3";
import { Pagination } from "../components/Pagination";
import { GoDotFill, GoShareAndroid } from "react-icons/go";
import { useContext, useEffect, useState } from "react";
import { BiHeart, BiSolidCheckCircle, BiSolidHeart } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import MediaSlider from "../components/MediaSlider";
import { FiMapPin } from "react-icons/fi";
import {
  formatArea,
  formatDate,
  formatPrice,
  formatTimeAgo,
} from "../utils/other";
import { amenitiesList } from "../utils/contant";
import { postApi } from "../api/post";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { MapDetail } from "../components/Map/MapDetail";
import { ReportModal } from "../components/Report/ReportModal";
import { AuthContext } from "../context/AuthContext";
import { favorApi } from "../api/favor";
import { toast } from "react-toastify";
import { RelatedPost } from "../components/RelatedPost";

export default function Detail() {
  const { id } = useParams();
  const { userId, role } = useContext(AuthContext);

  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const [showReport, setShowReport] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleOpenReport = () => {
    if (role && role !== "ROLE_ADMIN") {
      setShowReport(true);
    } else {
      toast.warn("Không có quyền thực hiện báo cáo!");
    }
  };
  const handleCloseReport = () => setShowReport(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await postApi.detail(id);
        setDetail(response.data.data);
        console.log("Detail response:", response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    const isLiked = async () => {
      if (!userId || !detail.id) return;

      try {
        const response = await favorApi.isLiked(
          Number(detail.id),
          Number(userId)
        );
        // console.log("isLiked response:", response.data);
        setLiked(response.data || false);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    isLiked();
  }, [detail.id, userId]); // Chỉ gọi khi cả 2 đã có giá trị

  const toggleLike = async () => {
    if (!userId) {
      console.log("Please login to like posts");
      return;
    }

    try {
      if (liked) {
        await favorApi.unLikePost(detail.id, userId);
      } else {
        await favorApi.likePost(detail.id, userId);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Đang tải dữ liệu...</div>;
  }
  // console.log(detail);

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-screen-xl px-4">
        <div className="flex gap-6">
          {/* main */}
          <div className="w-7/10 ">
            <MediaSlider mediaList={detail.images} />

            {/* Info */}
            <div className="bg-white shadow-sm rounded-xl p-4 mb-3 mt-3">
              <header className="border-b pb-4 mb-4 border-[#f1f1f1]">
                <div
                  className={`inline-flex items-center text-sm font-normal uppercase mb-1 px-2 py-1 rounded text-white ${
                    detail.isVip === 5
                      ? "bg-[#e41b23]"
                      : detail.isVip === 4
                      ? "bg-pink-500"
                      : detail.isVip === 3
                      ? "bg-orange-500"
                      : detail.isVip === 2
                      ? "bg-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex">
                    {[...Array(detail.isVip === 3 ? 4 : detail.isVip)].map(
                      (_, i) => (
                        <FaStar key={i} className="text-yellow-300 mx-[1px]" />
                      )
                    )}
                  </div>
                  {detail.isVip === 5
                    ? "Tin VIP nổi bật"
                    : detail.isVip === 4
                    ? "Tin VIP 1"
                    : detail.isVip === 3
                    ? "Tin VIP 2"
                    : detail.isVip === 2
                    ? "Tin VIP 3"
                    : ""}
                </div>
                <h1
                  className={` leading-snug mb-2 ${
                    detail.isVip === 5
                      ? "text-[#e41b23] text-[20px] font-semibold uppercase"
                      : detail.isVip === 4
                      ? "text-pink-500 text-[20px] font-semibold uppercase"
                      : detail.isVip === 3
                      ? "text-orange-500 text-[20px] font-semibold uppercase"
                      : detail.isVip === 2
                      ? "text-blue-500 text-[20px] font-semibold uppercase"
                      : "font-semibold"
                  }`}
                >
                  {detail.title}
                </h1>
                <address className="not-italic text-sm leading-snug text-gray-700 flex items-center gap-1">
                  <FiMapPin className="flex-shrink-0" />
                  <span>{detail?.address}</span>
                  {/* <span className="text-blue-600 underline cursor-pointer ml-1">
                    Xem bản đồ
                  </span> */}
                </address>

                <div className="flex justify-between mt-2 text-sm text-gray-700">
                  <div className="flex gap-3 items-center">
                    <span className="text-red-600 font-bold text-lg">
                      {formatPrice(detail?.price)}
                    </span>
                    -<span>{formatArea(detail.area)} m²</span>-
                    <time title="Thứ 2, 11:36 21/04/2025">
                      {formatTimeAgo(detail.createdAt)}
                    </time>
                  </div>
                  <div>Mã tin: #{detail.id}</div>
                </div>
              </header>

              <section className="mt-2 mb-4">
                <h2 className="text-lg font-medium mb-3">Đặc điểm tin đăng</h2>
                <table className="table-auto w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-2 text-gray-500 whitespace-nowrap">
                        Chuyên mục:
                      </td>
                      <td colSpan={3} className="py-1">
                        <a className="underline text-blue-600" href="#">
                          Cho thuê phòng trọ xxxxx
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 text-gray-500">Khu vực:</td>
                      <td colSpan={3} className="py-1">
                        <a className="underline text-blue-600" href="#">
                          Hà Nội
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 text-gray-500">Địa chỉ:</td>
                      <td colSpan={3} className="py-1">
                        {detail.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 text-gray-500">Mã tin:</td>
                      <td className="py-1">#{detail.id}</td>
                      <td className="py-1 pr-2 text-gray-500">Ngày đăng:</td>
                      <td className="py-1">{formatDate(detail.createdAt)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 text-gray-500">Gói tin:</td>
                      <td className="py-1 text-red-500">
                        {detail.isVip === 5
                          ? "Tin VIP nổi bật"
                          : detail.isVip === 4
                          ? "Tin VIP 1"
                          : detail.isVip === 3
                          ? "Tin VIP 2"
                          : detail.isVip === 2
                          ? "Tin VIP 3"
                          : "Tin thường"}
                      </td>
                      <td className="py-1 pr-2 text-gray-500">Ngày hết hạn:</td>
                      <td className="py-1">
                        {formatDate(detail.vipExpiryDate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="border-b pb-3 mb-4 border-[#f1f1f1]">
                <h2 className="text-lg font-medium mb-3">Thông tin mô tả</h2>
                <div className="space-y-2 text-sm">
                  {detail.description.split("\n").map((line, index) => (
                    <p key={index} className="text-gray-700">
                      {line.trim()}
                    </p>
                  ))}
                </div>
              </section>

              <section className="border-b pb-3 mb-4 border-[#f1f1f1]">
                <h2 className="text-lg font-medium mb-3">Nổi bật</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 text-sm">
                  {amenitiesList.map((item) => {
                    const isChecked = detail.categories.includes(
                      String(item.id)
                    );
                    return (
                      <div key={item.id} className="flex items-center">
                        <BiSolidCheckCircle
                          className={`bi bi-check-circle-fill ${
                            isChecked ? "text-green-600" : "text-gray-300"
                          } mr-2`}
                        />
                        <span
                          className={` ${
                            isChecked ? "text-gray-700" : "text-gray-300"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
              {/* Map  */}
              <section className="border-b pb-4 mb-4 border-[#f1f1f1]">
                <h2 className="text-lg font-medium mb-2">Vị trí & bản đồ</h2>
                <p className="text-sm mb-2">
                  <i className="bi bi-geo-alt mr-2"></i>
                  Địa chỉ: {detail.address}
                  <span className="inline-block text-blue-600 underline ml-1 cursor-pointer">
                    Xem bản đồ lớn
                  </span>
                </p>
                <MapDetail address={detail.address} />
              </section>
              {/* Thông tin liên hệ */}
              <section className="mb-4">
                <h2 className="text-lg font-medium mb-3">Thông tin liên hệ</h2>
                <div className="flex gap-4">
                  <img
                    className="rounded-full w-24 h-24 object-cover"
                    src="https://phongtro123.com/images/default-user.svg"
                    alt="Lê Thị Hồng Tâm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-medium">
                        {detail?.nameContact}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></span>
                        Đang hoạt động
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      1 tin đăng <span className="mx-1">•</span> Tham gia từ:
                      15/04/2025
                    </div>
                    <div className="flex gap-2 mt-3">
                      <a
                        href="tel:0976514555"
                        className="bg-green-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
                      >
                        <FaPhoneAlt />
                        {detail?.phoneContact}
                      </a>
                      <a
                        href="https://zalo.me/0976514555"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
                      >
                        <LuMessageSquareMore /> Nhắn Zalo
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <div className="bg-yellow-100 p-3 rounded text-sm">
                <ul className="list-disc pl-4">
                  <li className="font-semibold">Lưu ý:</li>
                  <li>
                    Chỉ đặt khi cọc xác định được chủ nhà và có thỏa thuận biên
                    nhận rõ ràng.
                  </li>
                  <li>
                    Kiểm tra mọi điều khoản và yêu cầu liệt kê tất cả chi phí
                    hàng tháng vào hợp đồng.
                  </li>
                  <li>
                    Nếu tin đăng không đúng hoặc có dấu hiệu lừa đảo,{" "}
                    <span className="text-blue-600 underline cursor-pointer">
                      hãy phản ánh với chúng tôi.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*  sidebar */}
          <div className="w-3/10 ">
            <div className="grid grid-cols-1  gap-2">
              {/* User  */}
              <div className="bg-white shadow-sm rounded p-3 mb-3 hidden lg:block">
                <div className="mb-3">
                  <img
                    className="avatar size-20 block p-1 mx-auto"
                    src="https://phongtro123.com/images/default-user.svg"
                    alt="Lê Thị Hồng Tâm"
                  />
                  <div className="mt-3 text-center">
                    <span className="text-lg font-medium">
                      {detail.nameContact}
                    </span>
                    <div className="flex justify-center text-xs">
                      <GoDotFill className="mt-1 mr-1" />
                      <span>Đang hoạt động</span>
                    </div>
                    <div className="text-sm mt-1">
                      1 tin đăng <span className="dot">- </span>Tham gia từ:
                      15/04/2025
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center ">
                  <div className="space-y-2 w-full">
                    <button className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 font-medium w-full">
                      <FaPhoneAlt className="text-base" />
                      <span>{detail.phoneContact}</span>
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium w-full">
                      <LuMessageSquareMore className="text-base" />
                      <span>Nhắn Zalo</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mt-3 mb-3 gap-2">
                  <button
                    className="whitespace-nowrap flex items-center justify-center"
                    title="Tin đã lưu"
                    onClick={toggleLike}
                  >
                    {liked ? (
                      <BiSolidHeart size={20} className="text-red-500 mr-1" />
                    ) : (
                      <BiHeart size={20} className="text-gray-400 mr-1" />
                    )}
                    <span>Lưu tin</span>
                  </button>

                  <button className="whitespace-nowrap flex items-center justify-center">
                    <GoShareAndroid size={20} className="mr-1" />
                    <span>Chia sẻ</span>
                  </button>

                  <button
                    className="whitespace-nowrap flex items-center justify-center"
                    onClick={handleOpenReport}
                  >
                    <IoWarningOutline size={20} className="mr-1" />
                    <span>Báo xấu</span>
                  </button>
                </div>
              </div>

              {/* Tin nổi bật  */}
              <div className="bg-white border border-gray-300 p-4 rounded-xl shadow ">
                <div className="text-xl font-semibold mb-3">Tin mới đăng</div>

                <PostItemNav />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <RelatedPost post={detail} />
        </div>
      </div>
      <ReportModal
        show={showReport}
        onClose={handleCloseReport}
        postId={detail.id}
      />
    </div>
  );
}
