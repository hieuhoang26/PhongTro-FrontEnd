import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authApi } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  fullname: yup.string().required("Họ tên không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .min(4, "Mật khẩu ít nhất 4 ký tự")
    .required("Mật khẩu không được để trống"),
  user_type: yup.string().required("Vui lòng chọn loại tài khoản"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      phone: data.phone,
      email: data.email,
      password: data.password,
      name: data.fullname,
      role: data.user_type === "1" ? 1 : 2,
    };

    try {
      // await authApi.registerAccount(payload);
      console.log(payload);
      toast.success("Tạo tài khoản thành công!");
      navigate("/dang-nhap");
    } catch (error) {
      toast.error("Đăng ký thất bại");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-6 lg:mt-12 lg:mb-12 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-xl bg-white shadow-sm rounded-2xl p-6 lg:p-10">
          <div className="flex justify-between mb-8">
            <a
              href="/dang-nhap"
              className="text-2xl font-light text-center text-gray-500 border-b-2 border-gray-200 pb-2 w-full"
            >
              Đăng nhập
            </a>
            <a
              href="/dang-ky"
              className="text-2xl font-semibold text-center text-black border-b-2 border-red-500 pb-2 w-full"
            >
              Tạo tài khoản mới
            </a>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Họ tên"
              id="fullname"
              register={register("fullname")}
              error={errors.fullname?.message}
            />
            <Input
              label="Số điện thoại"
              id="phone"
              register={register("phone")}
              error={errors.phone?.message}
            />
            <Input
              label="Email"
              id="email"
              register={register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Mật khẩu"
              id="password"
              register={register("password")}
              error={errors.password?.message}
              type="password"
            />

            <div className="mt-6">
              <label className="font-medium">Loại tài khoản</label>
              <div className="flex mt-2 space-x-6">
                <label className="flex items-center space-x-2">
                  <input type="radio" value="1" {...register("user_type")} />
                  <span>Tìm kiếm</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" value="2" {...register("user_type")} />
                  <span>Chính chủ</span>
                </label>
              </div>
              {errors.user_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.user_type.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-red-500 text-white rounded-xl text-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
              </button>
            </div>
          </form>

          <p className="text-xs mt-6 pt-6">
            Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{" "}
            <a
              href="/quy-dinh-su-dung"
              target="_blank"
              rel="nofollow"
              className="underline"
            >
              quy định sử dụng
            </a>{" "}
            cũng như{" "}
            <a
              href="/chinh-sach-bao-mat"
              target="_blank"
              rel="nofollow"
              className="underline"
            >
              chính sách bảo mật
            </a>{" "}
            của chúng tôi
          </p>
          <p className="text-xs mt-2">
            Bản quyền © 2015 - 2025 Phongtro123.com
          </p>
        </div>
      </div>
    </div>
  );
};

// Component nhập liệu dùng chung
const Input = ({ label, id, register, error, type = "text" }) => (
  <div className="form-floating mb-3 relative">
    <input
      type={type}
      id={id}
      placeholder=" "
      {...register}
      className={`form-control form-control-lg rounded-[0.5rem] border peer block w-full px-8 py-4 text-base bg-white ${
        error ? "border-red-500" : "border-gray-300"
      } focus:border-blue-500 focus:ring-blue-500`}
    />
    <label
      htmlFor={id}
      className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
      {label}
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Register;
