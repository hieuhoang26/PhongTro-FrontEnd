import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogApi } from "../api/blog";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await blogApi.getDetail(slug);
        if (!response.status == 200) throw new Error("Blog not found");
        const data = await response.data;
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!blog)
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <p className="text-red-500">Blog post not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to home
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-2xl mt-5">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 leading-tight">
        {blog.title}
      </h1>

      {/* {blog.thumbnail && (
        <div className="mb-8">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>
      )} */}

      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
}
