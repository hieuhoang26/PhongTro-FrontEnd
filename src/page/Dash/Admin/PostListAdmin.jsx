import { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { postApi } from "../../../api/post";
import { AuthContext } from "../../../context/AuthContext";
import { PostModal } from "../../../components/Admin/Modal/PostModal";
import { toast } from "react-toastify";

export const PostListAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState(null);

  const { userId } = useContext(AuthContext);

  // Filter state
  const [filters, setFilters] = useState({
    typeId: null,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    cityId: null,
    districtId: null,
    wardId: null,
    categoryIds: null,
  });

  // Fetch data using filter API
  const fetchPosts = async (currentPage = 0) => {
    try {
      const params = {
        ...filters,
        page: currentPage,
        size: 3,
        sort: "desc",
      };

      // If searching by ID or title
      if (search) {
        if (!isNaN(search)) {
          params.id = search; // Search by post ID if input is number
        } else {
          params.title = search; // Search by title if input is string
        }
      }

      // If filtering by status
      if (status) {
        params.status = status;
      }

      const response = await postApi.filter(params);
      // console.log(response.data.data);
      setPosts(response.data.data.items);
      setTotalPages(response.data.data.totalPages);
      setPage(Number(response.data.data.page));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [status, page, filters]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    fetchPosts(selectedPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPosts(0);
  };

  const handleDeletePost = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá bài đăng này không?")) {
      try {
        // await postApi.delete(id);
        fetchPosts(page);
        toast.success("Đã xoá bài đăng thành công!");
      } catch (error) {
        console.error(error);
        toast.error("Xoá bài đăng thất bại, vui lòng thử lại!");
      }
    }
  };

  // Add filter controls to your form
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value ? value : null,
    }));
  };

  return (
    <div className="relative ">
      <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
        <div className="flex">
          <h1 className="text-2xl font-semibold whitespace-nowrap mb-1">
            Danh sách bài đăng
          </h1>
        </div>
      </div>

      <div className="m-5">
        <form
          onSubmit={handleSubmit}
          className="flex items-center mb-3 gap-3 flex-wrap"
        >
          {/* Dropdown lọc trạng thái */}
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

          {/* Input tìm kiếm */}
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

          {/* Additional filters */}
          <div className="flex gap-3 flex-wrap">
            <input
              name="minPrice"
              type="number"
              placeholder="Giá từ"
              className="border border-gray-200 rounded-lg p-2 h-10 w-24"
              onChange={handleFilterChange}
            />
            <input
              name="maxPrice"
              type="number"
              placeholder="Giá đến"
              className="border border-gray-200 rounded-lg p-2 h-10 w-24"
              onChange={handleFilterChange}
            />
            <input
              name="minArea"
              type="number"
              placeholder="Diện tích từ"
              className="border border-gray-200 rounded-lg p-2 h-10 w-24"
              onChange={handleFilterChange}
            />
            <input
              name="maxArea"
              type="number"
              placeholder="Diện tích đến"
              className="border border-gray-200 rounded-lg p-2 h-10 w-24"
              onChange={handleFilterChange}
            />
          </div>
        </form>
      </div>

      {/* Rest of the component remains the same */}
      <div className="flex justify-center">
        <div className="w-full mt-6 overflow-auto max-w-screen-2xl mx-auto px-4">
          <table className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Table content remains the same */}
            <thead className="bg-gray-100">
              <tr>
                {[
                  "ID",
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
                    index === posts.length - 1 ? "" : "border-b border-gray-200"
                  }`}
                >
                  <td className="p-4 text-gray-700">{post.id}</td>
                  <td className="p-4 flex items-center gap-3">
                    {post.images.length > 0 && (
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-12 h-12 object-cover p-1  rounded-md"
                      />
                    )}
                    <p className="text-gray-900 font-medium">{post.title}</p>
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
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                        onClick={() => {
                          setPostId(post.id);
                          setIsOpen(true);
                        }}
                      >
                        <MdEdit className="text-blue-600" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-red-200 transition text-red-600"
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

          {/* Pagination */}
          <div className="flex justify-center my-8">
            <ReactPaginate
              previousLabel={"← Trước"}
              nextLabel={"Sau →"}
              pageCount={totalPages}
              marginPagesDisplayed={0}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"flex items-center space-x-2"}
              pageClassName={"px-3 py-1 border rounded-md hover:bg-gray-200"}
              activeClassName={"bg-blue-500 text-white"}
              previousClassName={
                "px-3 py-1 border rounded-md hover:bg-gray-200"
              }
              nextClassName={"px-3 py-1 border rounded-md hover:bg-gray-200"}
              breakClassName={"px-3 py-1"}
              forcePage={page}
            />
          </div>
        </div>
      </div>

      <PostModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postId={postId}
        setPostId={setPostId}
      />
    </div>
  );
};
