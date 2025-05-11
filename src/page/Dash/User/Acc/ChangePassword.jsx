import { useState } from "react";

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    cf_password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      console.log("Submitting password change:", formData);

      // Replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Optionally reset form or show notification
    } catch (error) {
      console.error("Password change failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white shadow-sm rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Thay đổi mật khẩu</h2>

          <div className="mb-4 relative">
            <input
              type="password"
              name="old_password"
              id="old_password"
              value={formData.old_password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 peer"
            />
            <label
              htmlFor="old_password"
              className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm"
            >
              Nhập mật khẩu cũ
            </label>
          </div>

          <div className="mb-4 text-sm">
            <a
              href="https://phongtro123.com/quen-mat-khau"
              className="text-blue-500 underline"
            >
              Bạn quên mật khẩu?
            </a>
          </div>

          <div className="mb-4 relative">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 peer"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm"
            >
              Nhập mật khẩu mới
            </label>
          </div>

          <div className="mb-6 relative">
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              value={formData.cf_password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 peer"
            />
            <label
              htmlFor="cf_password"
              className="absolute left-3 top-3 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-orange-500 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm"
            >
              Xác nhận mật khẩu mới
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
          </button>
        </form>
      </div>
    </div>
  );
};
