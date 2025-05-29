import { useContext, useEffect, useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import logoUser from "../../assets/default_user.svg";
import { formatArea, formatPrice, formatTimeAgo } from "../../utils/other";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { favorApi } from "../../api/favor";

export const PostCardV2 = ({ post }) => {
  const [liked, setLiked] = useState(post.isLike);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    setLiked(post.isLike || false);
  }, [post.isLike]);

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
    return imageUrls[displayIndex] || "/placeholder-image.jpg";
  };
  return (
    <li className="bg-white shadow-sm rounded p-4 mb-3 grid sm:flex gap-3">
      <div className="sm:w-2/5 relative">
        <a href={"/"} title={post.title} className="block relative">
          {/* Container chính - sử dụng aspect ratio */}
          <div className="flex h-[200px] w-[250px] rounded-md overflow-hidden bg-gray-100">
            {/* Ảnh lớn bên trái */}
            <div className="w-2/3 h-full relative">
              <img
                src={getImage(0)}
                alt="Main"
                className="absolute w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            </div>

            {/* 2 ảnh nhỏ bên phải */}
            <div className="w-1/3 flex flex-col">
              <div className="h-1/2 relative border-l border-white">
                <img
                  src={getImage(1)}
                  alt="Sub1"
                  className="absolute w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="h-1/2 relative border-l border-t border-white">
                <img
                  src={getImage(2)}
                  alt="Sub2"
                  className="absolute w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          {/* <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            <i className="bi bi-star-fill mr-1"></i> Tin VIP
          </div> */}
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-0.5 rounded">
            <i className="bi bi-camera-fill mr-1"></i>
            {post.images.length}
          </div>
        </a>
      </div>

      <div className="sm:w-3/5 text-sm space-y-2">
        <h3 className="font-semibold text-base uppercase">
          <a
            href={`/detail/${post.id}`}
            className={`hover:underline block ${
              post.isVip === 4
                ? "text-pink-500"
                : post.isVip === 3
                ? "text-orange-500"
                : ""
            }`}
          >
            <span
              className="text-ellipsis overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              <span className="inline-flex mr-1">
                {[...Array(post.isVip)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-300" size={14} />
                ))}
              </span>
              {post.title}
            </span>
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

        <p className="line-clamp-2 text-gray-500 text-sm">{post.description}</p>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <img src={logoUser} alt="user" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-medium">{post?.username}</p>
              <time className="text-xs text-gray-400">
                {formatTimeAgo(post?.createdAt)}
              </time>
            </div>
          </div>
          <div className="flex items-center gap-2 mr-3 mt-2">
            <button
              onClick={toggleLike}
              className="text-xl transition-colors duration-200 relative top-[2px]"
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
