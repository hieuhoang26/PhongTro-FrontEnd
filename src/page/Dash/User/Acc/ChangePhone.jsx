import { useState } from "react";

export const ChangePhone = () => {
  const [formData, setFormData] = useState({
    old_phone: "123456789",
    phone: "",
    verify_code: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetVerificationCode = (e) => {
    e.preventDefault();
    console.log("Getting verification code for:", formData.phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting form:", formData);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Thay đổi số điện thoại</h2>

          {/* Old phone (read-only) */}
          <div className="mb-4">
            <label
              htmlFor="user_phone_old"
              className="block text-sm font-medium mb-1"
            >
              Số điện thoại cũ
            </label>
            <input
              type="tel"
              name="old_phone"
              id="user_phone_old"
              value={formData.old_phone}
              readOnly
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* New phone */}
          <div className="mb-4">
            <label
              htmlFor="user_phone_new"
              className="block text-sm font-medium mb-1"
            >
              Số điện thoại mới
            </label>
            <input
              type="tel"
              name="phone"
              id="user_phone_new"
              value={formData.phone}
              placeholder="Nhập số điện thoại mới"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-md"
            />
          </div>

          {/* Get verification code */}
          <div className="mb-6">
            <button
              onClick={handleGetVerificationCode}
              className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition"
            >
              Lấy mã xác thực
            </button>
          </div>

          {/* Verification code */}
          <div className="mb-6">
            <label
              htmlFor="user_verify_code"
              className="block text-sm font-medium mb-1"
            >
              Nhập mã xác thực
            </label>
            <input
              type="text"
              name="verify_code"
              id="user_verify_code"
              value={formData.verify_code}
              placeholder="Nhập mã xác thực"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-md"
            />
          </div>

          {/* Submit */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={
                isSubmitting || !formData.phone || !formData.verify_code
              }
              className={`w-full py-2 px-4 text-white font-medium rounded-md transition ${
                isSubmitting || !formData.phone || !formData.verify_code
                  ? "bg-red-400 cursor-not-allowed opacity-50"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
