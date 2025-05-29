import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { verifyApi } from "../../../../api/verify";

import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
export const VerifyManager = () => {
  const [verifications, setVerifications] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.5 });

  // Khi status thay đổi -> reset lại state và gọi fetch
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      setPage(0);
      setVerifications([]);
      setHasMore(true);
      try {
        const res = await verifyApi.getList(status, 0, 5);
        const data = res.data.data.content || [];
        setVerifications(data);
        if (data.length < 5) setHasMore(false);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, [status]);

  // Load thêm khi page tăng (trừ page 0 vì đã load ở trên)
  useEffect(() => {
    const fetchMore = async () => {
      if (page === 0 || loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await verifyApi.getList(status, page, 5);
        const data = res.data.data.content || [];
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setVerifications((prev) => [...prev, ...data]);
        }
      } catch (err) {
        toast.error("Không thể tải thêm dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchMore();
  }, [page]);

  // Tự tăng page khi scroll đến cuối
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  const handleAction = async (id, action) => {
    // TODO: approve/reject logic here
  };

  return (
    <div className=" relative">
      <div className="sticky top-[45px] bg-white shadow-sm py-4 px-5 z-10">
        <div className="flex">
          <h1 className="text-2xl font-semibold whitespace-nowrap mb-1">
            Duyệt xác minh
          </h1>
        </div>
      </div>
      <div className="mb-4 p-6 max-w-7xl mx-auto">
        {/* Filter */}
        <div className="">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="PENDING">Đang chờ</option>
            <option value="APPROVED">Đã duyệt</option>
            <option value="REJECTED">Bị từ chối</option>
          </select>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {verifications.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 bg-white overflow-hidden"
            >
              <img
                src={item.frontImageUrl}
                alt="Ảnh CCCD"
                className="w-full h-64 object-contain bg-gray-50 p-2 rounded-xl"
              />

              <div className="p-4 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">Họ tên:</span>{" "}
                  {item.extractedName}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Ngày sinh:
                  </span>{" "}
                  {item.extractedDob}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Địa chỉ:</span>{" "}
                  {item.extractedAddress}
                </p>

                {status === "PENDING" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleAction(item.id, "approve")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-full transition"
                    >
                      <FaCheckCircle className="text-white" />
                      Duyệt
                    </button>
                    <button
                      onClick={() => handleAction(item.id, "reject")}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-full transition"
                    >
                      <FaTimesCircle className="text-white" />
                      Từ chối
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Intersection Observer trigger */}
        <div ref={ref} className="h-16 flex justify-center items-center">
          {loading && <p className="text-blue-500">Đang tải thêm...</p>}
          {!hasMore && !loading && (
            <p className="text-gray-400">Đã hết dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
};
