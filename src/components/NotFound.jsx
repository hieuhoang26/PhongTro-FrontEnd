import React from "react";

const NotFoundPost = () => {
  return (
    <div className="p-5 text-center flex flex-col items-center justify-center">
      <img
        src="/images/file-searching-rafiki-gray.svg"
        alt="No posts found"
        className="max-w-[150px] max-h-[150px]"
      />
      <p className="mt-2 mb-0 text-gray-700">Tìm thấy 0 tin đăng</p>
      <p className="text-gray-600">
        Bấm{" "}
        <a
          href="https://phongtro123.com/quan-ly/dang-tin-moi.html"
          className="underline text-blue-600 hover:text-blue-800"
        >
          vào đây
        </a>{" "}
        để bắt đầu đăng tin
      </p>
    </div>
  );
};

export default NotFoundPost;
