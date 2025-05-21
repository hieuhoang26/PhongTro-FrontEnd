import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OCR_TOKEN } from "../../../../utils/mapbox";
import { toast } from "react-toastify";

// ✅ Schema kiểm tra dữ liệu bằng Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Vui lòng nhập họ tên"),
  dob: yup.string().required("Vui lòng chọn ngày sinh"),
  idNumber: yup
    .string()
    .matches(/^\d{9,12}$/, "Số CCCD không hợp lệ")
    .required("Vui lòng nhập số CCCD"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
});

export default function Verify() {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Thông tin xác minh:", data);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.fpt.ai/vision/idr/vnm/", {
        method: "POST",
        headers: {
          api_key: OCR_TOKEN,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("OCR API result:", result);
      const data = result?.data?.[0];

      if (data) {
        setValue("fullName", data.name || "");
        setValue("dob", formatDate(data.dob));
        setValue("idNumber", data.id || "");
        setValue("address", data.address || "");
      } else {
        toast.error("Không nhận diện được thông tin từ ảnh.");
      }
    } catch (error) {
      console.error("OCR API error:", error);
      alert("Có lỗi xảy ra khi gọi API.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dobString) => {
    // Kiểm tra định dạng dd/mm/yyyy
    if (!dobString || !dobString.includes("/")) return "";
    const [day, month, year] = dobString.split("/");
    return `${year}-${month}-${day}`; // Định dạng ISO cho input date
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Ảnh CCCD */}
      <div className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl p-4 shadow-md">
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="CCCD"
              className="rounded-xl max-h-80 object-contain"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa ảnh
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer text-gray-400 hover:border-blue-400 transition">
            <span>Chọn ảnh CCCD</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
        {loading && <p className="text-blue-600 mt-2">Đang xử lý ảnh...</p>}
      </div>

      {/* Form thông tin */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-300 rounded-2xl p-6 shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Thông tin CCCD</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Họ và tên"
              {...register("fullName")}
              className="w-full p-2 border rounded"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("dob")}
              className="w-full p-2 border rounded"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Số CCCD"
              {...register("idNumber")}
              className="w-full p-2 border rounded"
            />
            {errors.idNumber && (
              <p className="text-red-500 text-sm">{errors.idNumber.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Địa chỉ"
              {...register("address")}
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Xác minh
        </button>
      </form>
    </div>
  );
}
