import React, { useEffect, useState } from "react";
import { blogApi } from "../api/blog";

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getList();
        console.log("Blogs response:", response);
        if (!response.status === 200) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="mt-2 mb-3">
        <h1 className="text-2xl font-medium mb-2 leading-snug">
          Tin Tức Thị Trường Cho Thuê
        </h1>
      </header>
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          >
            {blog.thumbnail && (
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 bg-white h-[150px]">
              <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {blog.description}
              </p>
              <span className="text-blue-600 text-sm font-medium hover:underline">
                Read more →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
