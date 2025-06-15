import React, { useEffect, useState } from "react";
import { postApi } from "../../api/post";
import { formatPrice, formatTimeAgo } from "../../utils/other";

const PostItemNav = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await postApi.getLatest();
        if (res.status === 200) {
          setPosts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="group transition-shadow duration-300 rounded-xl hover:shadow-md bg-white p-2 border border-gray-200"
        >
          <a
            href={`/detail/${post.id}`}
            className="flex gap-3 items-start"
            title={post.title}
          >
            <figure className="flex-shrink-0 w-[100px] h-[80px] rounded overflow-hidden border border-gray-200">
              <img
                src={post.images?.[1] || "/default.jpg"}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="flex-grow">
              <p className="mb-2 text-[#055699] text-sm font-semibold leading-snug line-clamp-1 capitalize">
                {/* {post.title} */}
                {truncateText(post.title)}
              </p>

              <div className=" text-xs flex flex-col">
                <span className="text-[#f60] font-bold">
                  {formatPrice(post.price)}
                </span>
                <time className="text-gray-500">
                  {formatTimeAgo(post?.createdAt)}
                </time>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};
const truncateText = (text, maxLength = 12) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default PostItemNav;
