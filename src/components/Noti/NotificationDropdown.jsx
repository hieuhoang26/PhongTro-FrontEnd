import { FiBell, FiCheck } from "react-icons/fi";
import { useState, useEffect, useRef, useContext } from "react";
import { notificationApi } from "../../api/notification";
import { useInView } from "react-intersection-observer";
import { AuthContext } from "../../context/AuthContext";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "./notificationSocket";
import { toast } from "react-toastify";

export const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { ref: bottomRef, inView } = useInView();

  const { userId } = useContext(AuthContext);

  console.log(notifications);

  // Load initial notifications when userId changes or on first render
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const res = await notificationApi.getUserNotifications(
          userId,
          page,
          10
        );
        const data = res?.data?.data?.items || [];
        setNotifications(data);
        if (data.length < 10) setHasMore(false); // nếu ít hơn 10, không có thông báo mới
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
      setLoading(false);
    };

    fetchData();
    // Kết nối socket và nhận thông báo
    connectNotificationSocket(userId, (newNotification) => {
      setTimeout(() => {
        toast.info("Bạn có thông báo mới");
        console.log("ssss");
      }, 100);
      fetchData();
    });
    return () => disconnectNotificationSocket();
  }, [userId]); // fetch khi userId thay đổi

  // Auto load when scroll to bottom
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllRead(userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Error marking all as read");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking as read");
    }
  };

  return (
    <div
      className="relative hidden xl:flex items-center px-1 text-gray-700 hover:bg-gray-100 rounded-full mr-4 cursor-pointer"
      ref={ref}
    >
      {/* Icon chuông + Badge */}
      <div className="relative" onClick={() => setOpen(!open)}>
        {notifications.some((n) => !n.isRead) && (
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2" />
        )}
        <FiBell className="text-gray-600" size={20} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 rounded-t-lg">
            <span className="font-semibold text-gray-800 text-base">
              Thông báo
            </span>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:underline"
            >
              Đánh dấu đã đọc tất cả
            </button>
          </div>

          {/* Danh sách */}
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {notifications.length > 0 ? (
              <>
                {notifications.map((noti) => (
                  <div
                    key={noti.id}
                    className={`relative px-4 py-3 text-sm cursor-pointer transition-colors duration-200 border-b border-gray-200 last:border-b-0 ${
                      noti.isRead
                        ? "bg-white text-gray-400"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium"
                    }`}
                  >
                    <div onClick={() => handleMarkAsRead(noti.id)}>
                      <div className="font-semibold text-sm">{noti.title}</div>
                      <div className="text-xs mt-1 line-clamp-2 text-gray-600">
                        {noti.content}
                      </div>
                      {noti.createdAt && (
                        <div className="text-[11px] text-gray-400 mt-1 italic">
                          {formatTime(noti.createdAt)}
                        </div>
                      )}
                    </div>
                    {!noti.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(noti.id);
                        }}
                        className="absolute top-2 right-3 p-1 text-gray-400 hover:text-blue-600"
                        title="Đánh dấu đã đọc"
                      >
                        <FiCheck size={16} />
                      </button>
                    )}
                  </div>
                ))}

                {/* Load more indicator */}
                <div
                  ref={bottomRef}
                  className="py-2 text-center text-gray-400 text-xs"
                >
                  {loading
                    ? "Đang tải..."
                    : hasMore
                    ? "Cuộn để tải thêm"
                    : "Hết thông báo"}
                </div>
              </>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                Không có thông báo nào.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
};
