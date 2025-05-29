import { use, useContext, useState } from "react";
import { reportApi } from "../../api/report";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export const ReportModal = ({ show, onClose, postId }) => {
  const { userId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    reason: "scam",
    message: "",
    postId: Number(postId),
    userId: Number(userId),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        reason:
          formData.reason === "other" && formData.message
            ? `other: ${formData.message}`
            : formData.reason,
      };

      const res = await reportApi.report(dataToSend);
      console.log("Data to send:", res.data);
      if (res.data.status === 201) {
        toast.success("Phản ánh của bạn đã được gửi. Cảm ơn bạn!");
        onClose();
      } else {
        toast.error("Gửi phản ánh thất bại. Vui lòng thử lại.");
      }
      toast.success("Phản ánh của bạn đã được gửi. Cảm ơn bạn!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        show ? "translate-x-0" : "translate-x-full"
      } w-full max-w-md 2xl:max-w-lg [@media(min-width:1920px)]:max-w-xl`}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Phản ánh tin đăng</h2>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="text-3xl font-light text-gray-500 hover:text-red-600"
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Lý do */}
          <div>
            <p className="font-semibold text-lg text-gray-800 mb-2">
              Lý do phản ánh
            </p>
            <div className="space-y-2">
              {[
                { value: "scam", label: "Tin có dấu hiệu lừa đảo" },
                { value: "duplicate", label: "Tin trùng lặp nội dung" },
                {
                  value: "cant_contact",
                  label: "Không liên hệ được chủ tin đăng",
                },
                {
                  value: "fake",
                  label:
                    "Thông tin không đúng thực tế (giá, diện tích, hình ảnh...)",
                },
                { value: "other", label: "Lý do khác" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={formData.reason === option.value}
                    onChange={handleChange}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mô tả thêm */}
          <div>
            <label
              htmlFor="message"
              className="block mb-1 font-medium text-gray-800"
            >
              Mô tả thêm
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-28 text-sm"
              placeholder="Mô tả thêm..."
            ></textarea>
          </div>

          {/* Thông tin liên hệ */}
          {/* <div>
            <p className="font-semibold text-lg text-gray-800 mb-2">
              Thông tin liên hệ
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-1 font-medium text-gray-800"
                >
                  Họ tên của bạn
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 font-medium text-gray-800"
                >
                  Số điện thoại của bạn
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>
          </div> */}

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
            >
              Gửi phản ánh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
