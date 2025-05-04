import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";

// Schema validate bằng Yup
const schema = yup.object({
  phone: yup.string().required("Số điện thoại không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, userId } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authApi.login(data);
      console.log("Đăng nhập thành công:", response.data.data);
      login(response.data.data);
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response?.data || error.message);
      alert("Thông tin đăng nhập không chính xác!");
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-6 lg:mt-12 lg:mb-12 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-xl bg-white shadow-sm rounded-2xl p-6 lg:p-10">
          <div className="flex justify-between mb-8">
            <a
              href="/dang-nhap"
              className="text-2xl font-semibold text-center text-black border-b-2 border-red-500 pb-2 w-full"
            >
              Đăng nhập
            </a>
            <a
              href="/dang-ky"
              className="text-2xl font-light text-center text-gray-500 border-b-2 border-gray-200 pb-2 w-full"
            >
              Tạo tài khoản mới
            </a>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3 relative">
              <input
                type="text"
                id="phone"
                // name="phone"
                placeholder=" "
                minLength={3}
                required
                data-msg="Không được phép để trống"
                // className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
                className={`form-control form-control-lg rounded-[0.5rem] border text-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500`}
                {...register("phone")}
              />
              <label
                htmlFor="phone"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Số điện thoại
              </label>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="form-floating mb-3 relative">
              <input
                type="password"
                id="password"
                // name="password"
                placeholder=" "
                minLength={3}
                required
                data-msg="Không được phép để trống"
                // className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
                className={`form-control form-control-lg rounded-[0.5rem] border text-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500`}
                {...register("password")}
              />
              <label
                htmlFor="password"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Mật khẩu
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-red-500 text-white rounded-xl text-lg font-semibold hover:bg-red-600"
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </div>
          </form>
          <a
            href="/quen-mat-khau"
            className="text-sm text-gray-500 hover:text-gray-700 mt-2 underline hover:no-underline cursor-pointer transition-colors duration-200"
          >
            Bạn quên mật khẩu?
          </a>
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

export default Login;
