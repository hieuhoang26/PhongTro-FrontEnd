import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../../../context/AuthContext";
import { userApi } from "../../../../api/user";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
});

export const PersonalInfo = () => {
  const { userId } = useContext(AuthContext);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const initialDataRef = useRef({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUser = async () => {
    try {
      const res = await userApi.getById(userId);
      const user = res.data?.data;
      const initialData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
      initialDataRef.current = initialData;
      reset(initialData);
      setAvatarPreview(user.avatarUrl);
    } catch (err) {
      console.error("Lỗi khi lấy user:", err);
    }
  };

  // Gọi API get user info khi load
  useEffect(() => {
    fetchUser();
  }, [userId, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      let hasChanges = false;

      // Check for changed fields
      if (dirtyFields.name || data.name !== initialDataRef.current.name) {
        formData.append("name", data.name);
        hasChanges = true;
      }

      if (dirtyFields.email || data.email !== initialDataRef.current.email) {
        formData.append("email", data.email);
        hasChanges = true;
      }

      if (avatarFile) {
        formData.append("avatarUrl", avatarFile);
        hasChanges = true;
      }

      // Only call API if there are changes
      if (hasChanges) {
        await userApi.updateUser(userId, formData);
        // Update initial data reference after successful update
        initialDataRef.current = {
          ...initialDataRef.current,
          name: data.name,
          email: data.email,
        };
        toast.success("Cập nhật thành công!");
        await fetchUser();
      } else {
        toast.warn("Không có thay đổi nào để cập nhật");
      }
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
      toast.error("Cập nhật thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded p-3">
        {/* Avatar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <img
              src={
                avatarPreview ||
                "https://phongtro123.com/images/default-user.svg"
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">{watch("name")}</p>
            <p className="text-gray-600">{watch("phone")}</p>
          </div>
        </div>

        {/* Upload avatar */}
        <div className="mb-4">
          <label className="cursor-pointer inline-block w-full">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="border border-gray-100 rounded-md py-2 px-4 w-full text-center hover:bg-gray-50">
              <i className="me-2">📷</i> Đổi ảnh đại diện
            </div>
          </label>
        </div>

        {/* Phone - read only */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            {...register("phone")}
            readOnly
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tên liên hệ</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-200 rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-red-500 text-white font-medium py-2 px-4 rounded-md w-full hover:bg-orange-600 transition ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </div>
    </form>
  );
};
