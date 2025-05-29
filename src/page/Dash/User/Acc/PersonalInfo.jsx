import { useState } from "react";

export const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    user_avatar: "",
    phone: "123456789",
    name: "john_doe",
    email: "test@gmail.com",
    user_id: "1",
  });

  const [showInvoiceInfo, setShowInvoiceInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "get_invoice") {
      setShowInvoiceInfo(checked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" max-w-2xl mx-auto">
      <div className="bg-white shadow rounded p-3">
        {/* Avatar Section */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden ">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://phongtro123.com/images/default-user.svg)`,
              }}
            ></div>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">{formData.name}</p>
            <p className="text-gray-600">{formData.phone}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="cursor-pointer inline-block w-full">
            <input className="hidden" type="file" multiple />
            <input
              type="hidden"
              name="user_avatar"
              value={formData.user_avatar}
            />
            <div className="border border-gray-100 rounded-md py-2 px-4 w-full text-center hover:bg-gray-50">
              <i className="me-2">📷</i> Đổi ảnh đại diện
            </div>
          </label>
        </div>

        {/* Phone - readOnly */}
        <div className="mb-4">
          <label
            htmlFor="user_phone"
            className="block text-sm font-medium mb-1"
          >
            Số điện thoại
          </label>
          <input
            type="text"
            readOnly
            id="user_phone"
            name="phone"
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 cursor-not-allowed"
            value={formData.phone}
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="user_name" className="block text-sm font-medium mb-1">
            Tên liên hệ
          </label>
          <input
            type="text"
            id="user_name"
            name="name"
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
            placeholder="Ex: Nguyễn Văn A"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="user_email"
            className="block text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="user_email"
            name="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
            placeholder="nguyenvana@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password (read-only) */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            value="********"
            readOnly
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div> */}
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-red-500 text-white font-medium py-2 px-4 rounded-md w-full hover:bg-orange-600 transition"
        >
          Cập nhật
        </button>
      </div>

      {/* Hidden User ID */}
      <input type="hidden" name="user_id" value={formData.user_id} />
    </form>
  );
};
