import React, { useEffect, useState, useRef, useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdDelete, MdFileDownloadDone } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { postApi } from "../../../api/post";
import { formatArea, formatPrice, formatTimeAgo } from "../../../utils/other";
import logoUser from "../../../assets/default_user.svg";
import { PostModal } from "../../../components/Admin/Modal/PostModal";
import { toast } from "react-toastify";

const PendingPost = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const loadingRef = useRef(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const fetchPosts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await postApi.getPostsByStatus(
        null,
        "PENDING",
        page,
        1,
        "createdAt,asc"
      );

      setPosts((prevPosts) => [...prevPosts, ...response.data.items]);
      setHasMore(response.data.items.length > 0);
      if (response.data.items.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset and fetch new results
    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPosts();
  };
  // Hàm xử lý khi click nút Edit
  const handleEdit = (postId) => {
    setSelectedPostId(postId);
    setIsEditModalOpen(true);
  };

  // Hàm xử lý khi click nút Approve
  const handleApprove = async (postId) => {
    try {
      await postApi.changeStatus(postId, JSON.stringify("APPROVED"));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      fetchPosts();
      toast.success("Bài đăng đã được duyệt thành công!");
    } catch (error) {
      console.error("Failed to approve post:", error);
      toast.error("Có lỗi xảy ra khi duyệt bài đăng!");
    }
  };

  // Hàm xử lý khi click nút Delete
  const handleDelete = async (postId) => {
    // if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
    try {
      await postApi.changeStatus(postId, JSON.stringify("REJECTED"));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      fetchPosts();
      // Thông báo thành công
      toast.success("Bài đăng đã được xóa thành công!");
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Có lỗi xảy ra khi xóa bài đăng!");
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPostId(null);
  };

  // Hàm này có thể được gọi từ modal sau khi chỉnh sửa thành công
  const handleEditSuccess = () => {
    fetchPosts();
    handleCloseEditModal();
  };

  if (loading && posts.length === 0) return <div>Đang tải dữ liệu...</div>;

  if (posts.length === 0 && !loading) return <div>Không có bài đăng nào.</div>;

  return (
    <div className="relative">
      <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
        <div className="flex">
          <h1 className="text-2xl font-semibold whitespace-nowrap mb-1">
            Duyệt bài đăng
          </h1>
        </div>
      </div>

      <div className="m-5">
        <form onSubmit={handleSubmit} className="flex items-center mb-3 gap-3">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control text-base w-[250px] pr-10 p-2 border border-gray-200 rounded-lg focus:outline-none h-10"
              id="searchInput"
              type="text"
              placeholder="Tìm theo mã tin hoặc tiêu đề"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 w-10 h-full flex items-center justify-center border-0 bg-transparent p-0"
            >
              <IoIosSearch size={20} className="text-gray-500" />
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center">
        <ul className="w-full max-w-4xl ">
          {posts.map((post, index) => (
            <li
              key={post.id}
              ref={index === posts.length - 1 ? lastPostElementRef : null}
              className="bg-white shadow rounded p-4 mb-4 flex gap-4 hover:shadow-lg hover:scale-[1.02] transition-transform"
            >
              {/* Image */}
              <div className="w-[180px] h-[135px] flex-shrink-0 overflow-hidden rounded">
                <a href={post.url} title={post.title} className="block h-full">
                  <img
                    src={post.images[0]}
                    alt="Main"
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Content + Buttons */}
              <div className="flex flex-1 justify-between">
                {/* Info Text */}
                <div className="text-sm flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                      <a href={post.url}>{post.title}</a>
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-2">
                      <span className="text-green-600 font-semibold text-base">
                        {formatPrice(post.price)}/tháng
                      </span>
                      <span className="text-base">
                        - {formatArea(post.area)} m²
                      </span>
                      <span className="text-base">{post.address}</span>
                    </div>
                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src={post.avatar || logoUser}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-700">
                          {post.username}
                        </p>
                        <time className="text-xs text-gray-400">
                          {formatTimeAgo(post.createdAt)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col justify-center items-end gap-3 ml-4 text-2xl">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleApprove(post.id)}
                    className="text-green-500 hover:text-green-600"
                    title="Duyệt bài"
                  >
                    <MdFileDownloadDone />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Xóa bài"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal chỉnh sửa */}
      {isEditModalOpen && (
        <PostModal
          postId={selectedPostId}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
        />
      )}
      {loading && posts.length > 0 && (
        <div className="text-center py-4">Đang tải thêm...</div>
      )}
    </div>
  );
};

export default PendingPost;
