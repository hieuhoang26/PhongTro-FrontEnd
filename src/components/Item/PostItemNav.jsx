import React from "react";

const PostItemNav = ({ image, title, price, time, link }) => {
  return (
    <li className="border-t pt-4 mt-4 border-gray-300 first:mt-0 first:pt-0 first:border-t-0">
      <a href={link} className="flex" title={title}>
        <figure className="flex-shrink-0 w-[100px] h-[80px] overflow-hidden rounded">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </figure>
        <div className="flex-grow pl-3">
          <p className="mb-2 text-[#055699] text-sm font-medium line-clamp-2">
            {title}
          </p>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-[#f60]">{price}</span>
            <time className="text-gray-500 text-xs">{time}</time>
          </div>
        </div>
      </a>
    </li>
  );
};

export default PostItemNav;
