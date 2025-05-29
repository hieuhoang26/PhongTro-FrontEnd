import { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdEdit, MdDelete, MdUpdate } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { postApi } from "../../../api/post";
import { AuthContext } from "../../../context/AuthContext";
import { PostModal } from "../../../components/Admin/Modal/PostModal";
import { toast } from "react-toastify";
import { VipModal } from "../../../components/Admin/Modal/VipModal";
import { useInView } from "react-intersection-observer";

export const PostListUser = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [postId, setPostId] = useState(null);
  const { userId } = useContext(AuthContext);

  const { ref, inView } = useInView({ threshold: 1 });

  const fetchPosts = async (currentPage = 0, isLoadMore = false) => {
    try {
      const response = await postApi.getPostsByStatus(
        userId,
        status,
        currentPage,
        5,
        "desc"
      );
      if (isLoadMore) {
        setPosts((prev) => [...prev, ...response.data.items]);
      } else {
        setPosts(response.data.items);
      }

      setPage(response.data.page);
      setHasMore(response.data.items.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts(0);
    }
  }, [userId, status]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchPosts(page + 1, true);
    }
  }, [inView]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPosts(0);
  };

  const handleDeletePost = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá bài đăng này không?")) {
      try {
        // await postApi.delete(id);
        fetchPosts(0);
        toast.success("Đã xoá bài đăng thành công!");
      } catch (error) {
        console.error(error);
        toast.error("Xoá bài đăng thất bại, vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
        <h1 className="text-2xl font-semibold mb-1">Danh sách bài đăng</h1>
      </div>

      <div className="m-5">
        <form onSubmit={handleSubmit} className="flex items-center mb-3 gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 rounded-lg text-base p-2 h-10 focus:outline-none w-[180px]"
          >
            <option value="">Lọc theo trạng thái</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="PAYING">PAYING</option>
          </select>

          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control text-base w-[250px] pr-10 p-2 border border-gray-200 rounded-lg focus:outline-none h-10"
              type="text"
              placeholder="Tìm theo mã tin hoặc tiêu đề"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 w-10 h-full flex items-center justify-center border-0 bg-transparent"
            >
              <IoIosSearch size={20} className="text-gray-500" />
            </button>
          </div>
        </form>
      </div>

      {posts.length === 0 ? (
        <div className="p-5 text-center flex flex-col items-center justify-center">
          <img
            src="https://phongtro123.com/images/file-searching-rafiki-gray.svg"
            alt="No posts"
            className="max-w-[200px] max-h-[200px]"
          />
          <p className="mt-2 text-red-600">Tìm thấy 0 tin đăng</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-full mt-6 max-w-screen-2xl mx-auto px-4">
            <div className="max-h-[600px] overflow-y-auto border border-gray-200 rounded-lg">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr>
                    {[
                      "Tiêu đề",
                      "Giá",
                      "Diện tích",
                      "Địa chỉ",
                      "Trạng thái",
                      "Ngày tạo",
                      "",
                    ].map((header) => (
                      <th
                        key={header}
                        className="p-4 text-left font-semibold text-gray-600"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr
                      key={post.id}
                      className={`hover:bg-gray-50 transition-all ${
                        index === posts.length - 1
                          ? ""
                          : "border-b border-gray-200"
                      }`}
                    >
                      <td className="p-4 flex items-center gap-3">
                        {post.images.length > 0 && (
                          <img
                            src={post.images[0]}
                            alt={post.title}
                            className="w-12 h-12 object-cover p-1 rounded-md"
                          />
                        )}
                        <p className="text-gray-900 font-medium">
                          {post.title}
                        </p>
                      </td>
                      <td className="p-4 text-gray-700">
                        {post.price.toLocaleString()} đ
                      </td>
                      <td className="p-4 text-gray-700">{post.area} m²</td>
                      <td className="p-4 text-gray-700">{post.address}</td>
                      <td className="p-4 text-gray-700">{post.status}</td>
                      <td className="p-4 text-gray-700">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="p-2 rounded-full hover:bg-gray-200"
                            onClick={() => {
                              setPostId(post.id);
                              setIsOpenUp(true);
                            }}
                          >
                            <MdUpdate className="text-blue-600" />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-gray-200"
                            onClick={() => {
                              setPostId(post.id);
                              setIsOpen(true);
                            }}
                          >
                            <MdEdit className="text-blue-600" />
                          </button>
                          <button
                            className="p-2 rounded-full hover:bg-red-200 text-red-600"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Trigger to load more when in view */}
              <div ref={ref} className="py-5 text-center text-gray-500">
                {hasMore ? "Đang tải thêm bài viết..." : "Đã tải hết bài viết."}
              </div>
            </div>
          </div>
        </div>
      )}

      <PostModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postId={postId}
        setPostId={setPostId}
      />
      <VipModal
        isOpen={isOpenUp}
        setIsOpen={setIsOpenUp}
        postId={postId}
        setPostId={setPostId}
      />
    </div>
  );
};
