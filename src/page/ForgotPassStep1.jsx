import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authApi } from "../api/auth";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  emailOrPhone: yup.string().required("Trường này là bắt buộc"),
});
export const ForgotPassStep1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await authApi.forgot(data.emailOrPhone);
      //   console.log("Response:", res);
      if (res.status == 200) {
        toast.success("Gửi mã xác đã được gửi !");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-6 lg:mt-12 lg:mb-12 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-xl bg-white shadow-sm rounded-2xl p-6 lg:p-10">
          <div className="flex justify-between mb-8">
            <div className="text-2xl font-semibold text-black pb-2 w-full">
              Khôi phục mật khẩu
            </div>
          </div>
          <p className="lead">
            Nhập Email/SĐT của bạn để nhận mã đặt lại mật khẩu
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3 relative">
              <input
                type="text"
                id="emailOrPhone"
                placeholder=" "
                {...register("emailOrPhone")}
                className={`form-control form-control-lg rounded-[0.5rem] border ${
                  errors.emailOrPhone ? "border-red-500" : "border-gray-300"
                } peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500`}
              />
              <label
                htmlFor="emailOrPhone"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email/Số điện thoại
              </label>
              {errors.emailOrPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrPhone.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-red-500 text-white rounded-xl text-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? "Đang gửi..." : "Tiếp tục"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
