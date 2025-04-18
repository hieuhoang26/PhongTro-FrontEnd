import React from "react";

const Register = () => {
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

          <form className="space-y-4">
            <div className="form-floating mb-3 relative">
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder=" "
                minLength={3}
                required
                data-msg="Không được phép để trống"
                className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="fullname"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Họ tên
              </label>
            </div>
            <div className="form-floating mb-3 relative">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder=" "
                minLength={3}
                required
                data-msg="Không được phép để trống"
                className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="phone"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Số điện thoại
              </label>
            </div>
            <div className="form-floating mb-3 relative">
              <input
                type="text"
                id="email"
                name="email"
                placeholder=" "
                minLength={3}
                required
                data-msg="Không được phép để trống"
                className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="email"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email
              </label>
            </div>
            <div className="form-floating mb-3 relative">
              <input
                type="text"
                id="password"
                name="password"
                placeholder=" "
                minLength={3}
                required
                data-msg="Không được phép để trống"
                className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="password"
                className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Mật khẩu
              </label>
            </div>

            <div className="mt-6">
              <label className="font-medium">Loại tài khoản</label>
              <div className="flex mt-2 space-x-6">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="user_type" value="1" required />
                  <span>Tìm kiếm</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="user_type" value="2" />
                  <span>Chính chủ</span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled
                className="w-full py-3 bg-red-500 text-white rounded-xl text-lg font-semibold disabled:opacity-50"
              >
                Tạo tài khoản
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

export default Register;
