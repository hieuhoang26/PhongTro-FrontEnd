import { useContext, useEffect, useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";

import logoUser from "../../assets/default_user.svg";
import { formatArea, formatPrice, formatTimeAgo } from "../../utils/other";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { favorApi } from "../../api/favor";

export const PostCard = ({ post }) => {
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
  return (
    <li className="bg-white shadow-sm rounded p-4 mb-2 grid sm:flex gap-3 h-full sm:h-[210px] overflow-hidden ">
      <div className="sm:w-2/5 relative h-full ">
        <a
          href={`/detail/${post.id}`}
          title={post.title}
          className="block relative h-full"
        >
          <div className="aspect-[4/3] h-full ">
            <img
              src={post.images[0]}
              alt="Main"
              className="h-full w-full object-cover rounded"
              loading="lazy"
            />
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
              post.isVip === 2 ? "text-blue-500" : ""
            }`}
          >
            <span className="inline-flex mr-1">
              {[...Array(post.isVip || 0)].map((_, i) => (
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

        <p className="line-clamp-2 text-gray-500 text-sm mt-3">
          {post.description}
        </p>

        <div className="flex justify-between items-center mt-2">
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
