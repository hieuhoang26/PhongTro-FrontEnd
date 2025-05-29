import { useContext, useEffect, useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { FaPhoneAlt, FaStar } from "react-icons/fa";

import logoUser from "../../assets/default_user.svg";
import { formatArea, formatPrice, formatTimeAgo } from "../../utils/other";
import { AuthContext } from "../../context/AuthContext";
import { favorApi } from "../../api/favor";

export const PostCardV3 = ({ post }) => {
  const [liked, setLiked] = useState(post.isLike);

  useEffect(() => {
    setLiked(post.isLike || false);
  }, [post.isLike]);

  const { userId } = useContext(AuthContext);

  const placeholder = "/placeholder-image.jpg";

  const toggleLike = async () => {
    if (!userId) {
      console.log("Please login to like posts");
      return;
    }
    try {
      if (liked) {
        await favorApi.unLikePost(post.id, userId);
      } else {
        await favorApi.likePost(post.id, userId);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const isImageUrl = (url) => {
    return url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const getImage = (displayIndex) => {
    // Lọc ra các URL là ảnh
    const imageUrls = post.images?.filter((url) => isImageUrl(url)) || [];
    return imageUrls[displayIndex] || placeholder;
  };

  return (
    <li className="bg-white shadow-sm rounded p-4 mb-3 grid  gap-3">
      {/* PHẦN ẢNH */}
      <div className="relative h-[350px] w-full flex rounded overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden z-10">
          <div className="absolute top-4 left-[-55px] w-[140%] rotate-[-45deg] bg-red-500 text-white text-center shadow-md py-[2px]">
            <div className="text-[9px] font-semibold leading-tight">
              CHO THUÊ
            </div>
            <div className="text-[11px] font-extrabold leading-tight">
              NHANH
            </div>
          </div>
        </div>

        {/* Ảnh lớn bên trái */}
        <div className="w-2/3 h-full relative">
          <img
            src={getImage(0)}
            alt="Main"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => (e.target.src = placeholder)}
          />
        </div>

        {/* 2 ảnh nhỏ bên phải - xếp dọc */}
        <div className="w-1/3 flex flex-col">
          <div className="h-1/2 border-l border-white relative">
            <img
              src={getImage(1)}
              alt="Sub1"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => (e.target.src = placeholder)}
            />
          </div>
          <div className="h-1/2 border-l border-t border-white relative">
            <img
              src={getImage(2)}
              alt="Sub2"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => (e.target.src = placeholder)}
            />
          </div>
        </div>

        {/* Badge VIP */}
        {/* <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
          Tin VIP
        </div> */}

        {/* Số lượng ảnh */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
          {post.images?.length || 0}
        </div>
      </div>
      {/* PHẦN THÔNG TIN */}
      <div className="flex flex-col justify-between text-sm">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-red-600 uppercase">
            <a
              href={`/detail/${post.id}`}
              className="text-red-600 hover:underline block"
            >
              <span className="inline-flex mr-1">
                {[...Array(post.isVip || 5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-300" size={14} />
                ))}
              </span>
              {post.title}
            </a>
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-green-600 font-semibold text-base">
              {formatPrice(post.price)}/tháng
            </span>

            <span className="text-gray-600 font-normal text-sm">
              - {formatArea(post.area)} m²
            </span>

            <span className="text-gray-500 text-sm">{post.address}</span>
          </div>

          <p className="line-clamp-2 text-gray-500 text-sm mt-2">
            {post.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3 mb-2">
          <div className="flex items-center gap-2 ml-2">
            <img src={logoUser} alt="user" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-medium">{post?.username || "Người đăng"}</p>
              <time className="text-xs text-gray-400">
                {formatTimeAgo(post?.createdAt)}
              </time>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:0931313570"
              className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 text-sm px-3 py-1 rounded no-underline"
            >
              <FaPhoneAlt className="p-1" size={20} />
              0931313570
            </a>

            <button
              onClick={toggleLike}
              className="text-xl transition-colors duration-200"
            >
              {liked ? (
                <BiSolidHeart size={24} className="text-red-500" />
              ) : (
                <BiHeart size={24} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
