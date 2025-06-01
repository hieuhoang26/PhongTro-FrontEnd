import React from "react";

import * as yup from "yup";
import { authApi } from "../api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp")
    .required("Bắt buộc"),
});

export const ForgotPassStep2 = () => {
  const [searchParams] = useSearchParams();
  const secretKey = searchParams.get("token");

  const [complete, setComplete] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await authApi.changePassword({
        secretKey,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      setComplete(true);
    } catch (error) {
      console.error("Change password failed", error);
      alert("Thay đổi mật khẩu thất bại. Vui lòng thử lại.");
    }
  };

  if (complete) {
    return (
      <div className="container mx-auto mt-6 mb-6 lg:mt-12 lg:mb-12 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-white shadow-sm rounded-2xl p-6 lg:p-10">
            <div className="alert bg-green-100 text-green-800 rounded-lg p-4 mb-6 flex items-start">
              <div className="flex-shrink-0 mr-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="m-0">
                  Mật khẩu mới của bạn đã được tạo. Hãy ghi nhớ cẩn thận nhé
                </p>
              </div>
            </div>
            <div className="flex space-x-6">
              <a
                href="/dang-nhap-tai-khoan"
                className="text-blue-600 hover:underline"
              >
                Đi đến trang đăng nhập
              </a>
              <a href="/" className="text-blue-600 hover:underline">
                Đi đến trang chủ
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 mb-6 lg:mt-12 lg:mb-12 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-xl bg-white shadow-sm rounded-2xl p-6 lg:p-10">
          <p className="lead mb-4">
            Nhập mật khẩu mới vào ô bên dưới để hoàn tất
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3 relative">
              <input
                type="password"
                id="newPassword"
                placeholder=" "
                {...register("newPassword")}
                className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="newPassword"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Mật khẩu mới
              </label>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="form-floating mb-3 relative">
              <input
                type="password"
                id="confirmPassword"
                placeholder=" "
                {...register("confirmPassword")}
                className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="confirmPassword"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Xác nhận mật khẩu mới
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold"
              >
                Hoàn tất
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
