import { useState } from "react";

const ForgotPass = () => {
  const [currentStep, setCurrentStep] = useState("verify_account");
  const [phoneEmail, setPhoneEmail] = useState("");
  const [verifyType, setVerifyType] = useState("zalo");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitFirstStep = (e) => {
    e.preventDefault();
    setCurrentStep("verify_code");
  };

  const handleSubmitSecondStep = (e) => {
    e.preventDefault();
    setCurrentStep("new_password");
  };

  const handleSubmitThirdStep = (e) => {
    e.preventDefault();
    setCurrentStep("complete");
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

          {/* Step 1: Verify Account */}
          {currentStep === "verify_account" && (
            <div>
              <p className="lead mb-4">
                Nhập Email/SĐT của bạn để nhận mã đặt lại mật khẩu
              </p>
              <form className="space-y-4" onSubmit={handleSubmitFirstStep}>
                <div className="form-floating mb-3 relative">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder=" "
                    minLength={3}
                    required
                    value={phoneEmail}
                    onChange={(e) => setPhoneEmail(e.target.value)}
                    className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="phone"
                    className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Số điện thoại
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <p className="lead mb-4">Xác thực qua:</p>
                  <div className="form-floating d-flex">
                    <div className="form-check me-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="verify_type"
                        id="verify_type_zalo"
                        value="zalo"
                        checked={verifyType === "zalo"}
                        onChange={() => setVerifyType("zalo")}
                        required
                      />
                      <label
                        className="lead form-check-label"
                        htmlFor="verify_type_zalo"
                      >
                        Zalo
                      </label>
                    </div>
                    <div className="form-check me-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="verify_type"
                        id="verify_type_sms"
                        value="sms"
                        checked={verifyType === "sms"}
                        onChange={() => setVerifyType("sms")}
                        required
                      />
                      <label
                        className="lead form-check-label"
                        htmlFor="verify_type_sms"
                      >
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-500 text-white rounded-xl text-lg font-semibold"
                  >
                    Tiếp tục
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: New Password */}
          {currentStep === "new_password" && (
            <div>
              <p className="lead mb-4">
                Nhập mật khẩu mới vào ô bên dưới để hoàn tất
              </p>
              <form className="space-y-4" onSubmit={handleSubmitThirdStep}>
                <div className="form-floating mb-3 relative">
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    placeholder=" "
                    minLength={6}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="new_password"
                    className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Mật khẩu mới
                  </label>
                </div>
                <div className="form-floating mb-3 relative">
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder=" "
                    minLength={6}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control form-control-lg rounded-[0.5rem] border border-gray-300 peer block w-full px-8 py-4 text-base bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="confirm_password"
                    className="form-label absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 left-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Xác nhận mật khẩu mới
                  </label>
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
          )}

          {/* Step 4: Complete */}
          {currentStep === "complete" && (
            <div>
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
          )}

          <p className="text-xs mt-6 mb-0">
            Nếu bạn cần hỗ trợ, vui lòng liên hệ SĐT/Zalo:{" "}
            <a href="tel:0909 316 890" className="text-red-500 font-bold">
              0909 316 890
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
