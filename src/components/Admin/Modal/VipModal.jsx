import { useContext, useEffect, useState } from "react";
import icon_vnpay from "../../../assets/icon_vnpay.png";
import { PaymentSummary } from "../../../page/Dash/PaymentSummary";
import { IoClose, IoWalletOutline } from "react-icons/io5";
import { postApi } from "../../../api/post";
import { set } from "react-hook-form";
import { getVipIdFromValue } from "../../../page/Dash/CreatePost";
import { toast } from "react-toastify";
import { paymentApi } from "../../../api/payment";
import { AuthContext } from "../../../context/AuthContext";
import { now } from "lodash";

export const VipModal = ({ postId, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [packageType, setPackageType] = useState("day"); // day, week, month

  const [selectedPackage, setSelectedPackage] = useState("4"); // to VIP
  const [totalDay, setTotalDay] = useState("3");
  const [totalWeek, setTotalWeek] = useState("1");
  const [totalMonth, setTotalMonth] = useState("1");
  const [totalAmount, setTotalAmount] = useState(0);
  const [payMethod, setPayMethod] = useState(0);
  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi
  const [postStatus, setPostStatus] = useState(""); // Thêm state để lưu trạng thái bài đăng

  const pkg = packages.find((p) => p.value === selectedPackage);
  const [isVip, setIsVip] = useState();
  const [vipExpiryDate, setVipExpiryDate] = useState();

  const { userId, isVerify } = useContext(AuthContext);

  // lấy postdetail từ postId
  useEffect(() => {
    if (postId && isOpen) {
      fetchPostDetails();
    }
  }, [postId, isOpen]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const response = await postApi.detail(postId);

      const postData = response.data.data;
      setIsVip(postData.isVip);
      setVipExpiryDate(postData.vipExpiryDate);
      setPostStatus(postData.status); // Lưu trạng thái bài đăng
    } catch (err) {
      setError(err.message || "Failed to fetch post details");
      console.error("Error fetching post details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const calculateExpirationDate = () => {
      console.log(isVip, vipExpiryDate, postStatus);
      // const baseDate = vipExpiryDate ? new Date(vipExpiryDate) : new Date();
      const baseDate =
        postStatus === "Expired" || vipExpiryDate == null
          ? new Date()
          : new Date(vipExpiryDate);
      let duration = 0;

      if (packageType === "day") duration = parseInt(totalDay);
      if (packageType === "week") duration = parseInt(totalWeek) * 7;
      if (packageType === "month") duration = parseInt(totalMonth) * 30;

      const expirationDate = new Date(baseDate);
      expirationDate.setDate(expirationDate.getDate() + duration);
      return expirationDate.toISOString(); // Hoặc format bạn muốn
    };
    const calculateTotal = () => {
      const pricePerUnit = parseInt(getPricePerUnit());
      let duration = 1;

      if (packageType === "day") duration = parseInt(totalDay);
      if (packageType === "week") duration = parseInt(totalWeek);
      if (packageType === "month") duration = parseInt(totalMonth);

      let total = pricePerUnit * duration;

      return total;
    };

    const total = calculateTotal();
    const expiryDate = calculateExpirationDate();

    setTotalAmount(total);
    setVipExpiryDate(expiryDate);
    setIsVip(Number(getVipIdFromValue(selectedPackage)));
  }, [selectedPackage, packageType, totalDay, totalWeek, totalMonth]);

  useEffect(() => {
    if (selectedPackage === "6") {
      handlePayOptionChange(0);
    }
  }, [selectedPackage]);

  const getPricePerUnit = () => {
    if (!pkg) return "0";
    if (packageType === "day") return pkg.priceDay.replace(/[^\d]/g, "");
    if (packageType === "week") return pkg.priceWeek.replace(/[^\d]/g, "");
    return pkg.priceMonth.replace(/[^\d]/g, "");
  };
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weeks = Array.from({ length: 4 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const renderPackageOptions = () => {
    return packages.map((pkg) => (
      <option
        key={pkg.value}
        value={pkg.value}
        data-title={pkg.title}
        data-price-day={pkg.priceDay}
        data-price-week={pkg.priceWeek}
        data-price-month={pkg.priceMonth}
      >
        {pkg.title}{" "}
        {packageType === "day"
          ? pkg.priceDay
          : packageType === "week"
          ? pkg.priceWeek
          : pkg.priceMonth}
      </option>
    ));
  };
  const handlePaymentSubmit = async (e) => {
    // Kiểm tra điều kiện trước khi submit
    if (selectedPackage === "6") {
      if (packageType !== "day") {
        toast.error("Gói Miễn phí  chỉ áp dụng cho loại ngày (day)");
        return;
      }
      if (parseInt(totalDay) > 3) {
        toast.error("Gói Miễn phí chỉ được đăng tối đa 3 ngày");
        return;
      }
    }
    const formattedDate = new Date(vipExpiryDate).toISOString().slice(0, 19); //
    if (payMethod === 1) {
      // Gọi API thanh toán bằng ví tài khoản

      const data = {
        amount: Number(totalAmount), // phải là số
        userId: userId,
        postId: postId,
        isVip: isVip,
        dateTime: formattedDate,
      };

      const walletResponse = await paymentApi.payWithWallet(data);
      if (walletResponse.data.status == 200) {
        toast.success("Thanh toán bằng ví thành công!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(walletResponse.data.message || "Thanh toán ví thất bại!");
      }
    } else if (payMethod === 2) {
      // Gọi API thanh toán bằng VNPay
      const paymentResponse = await paymentApi.createVnPayPayment(
        totalAmount,
        "PAYMENT",
        userId,
        postId,
        isVip,
        formattedDate
      );

      const { paymentUrl } = paymentResponse.data;
      console.log(paymentUrl);
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Không lấy được link thanh toán VNPay!");
      }
    } else {
      alert("Vui lòng chọn phương thức thanh toán hợp lệ.");
    }

    setError("");
    // handleSubmit(e);
  };

  const handlePayOptionChange = (optionId) => {
    setPayMethod(optionId === payMethod ? null : optionId);
  };

  //   useEffect(() => {
  //     if (postId && isOpen) {
  //       fetchPostDetails();
  //     }
  //   }, [postId, isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 overflow-y-auto max-h-[90vh] relative">
            {/* Header cố định */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-300">
              <div className="flex items-center justify-between p-4">
                <h1 className="text-2xl font-semibold whitespace-nowrap">
                  Update Vip
                </h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <IoClose />
                </button>
              </div>
            </div>

            <div class="flex justify-center">
              <div class="w-full max-w-[1200px]  mt-3 flex gap-3">
                {/* Main */}
                <div class="w-7/10">
                  <h3 className="text-xl font-semibold whitespace-nowrap text-red-600">
                    Bài đăng hiện tại : Vip {isVip} -{" "}
                    {formatDate(vipExpiryDate)}
                  </h3>
                  <div className="bg-white shadow-sm rounded p-4 mb-4">
                    <div className="text-lg font-medium mb-3">
                      Chọn gói tin đăng
                    </div>
                    {/* Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <div className="relative">
                          <label
                            htmlFor="package_type"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Gói thời gian
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="package_type"
                            value={packageType}
                            onChange={(e) => setPackageType(e.target.value)}
                            autoFocus={false}
                          >
                            <option value="day">Đăng theo ngày</option>
                            <option value="week">Đăng theo tuần</option>
                            <option value="month">Đăng theo tháng</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="relative">
                          <label
                            htmlFor="post_package"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Chọn loại tin
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="post_package"
                            value={selectedPackage}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                            autoFocus={false}
                            required
                          >
                            {renderPackageOptions()}
                          </select>
                        </div>
                      </div>

                      {packageType === "day" && (
                        <div>
                          <div className="relative">
                            <label
                              htmlFor="total_day"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Số ngày
                            </label>
                            <select
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                              id="total_day"
                              value={totalDay}
                              onChange={(e) => setTotalDay(e.target.value)}
                            >
                              {days.map((day) => (
                                <option key={day} value={day}>
                                  {day} ngày
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {packageType === "week" && (
                        <div>
                          <div className="relative">
                            <label
                              htmlFor="total_week"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Số tuần
                            </label>
                            <select
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                              id="total_week"
                              value={totalWeek}
                              onChange={(e) => setTotalWeek(e.target.value)}
                            >
                              {weeks.map((week) => (
                                <option key={week} value={week}>
                                  {week} tuần
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {packageType === "month" && (
                        <div>
                          <div className="relative">
                            <label
                              htmlFor="total_month"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Số tháng
                            </label>
                            <select
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                              id="total_month"
                              value={totalMonth}
                              onChange={(e) => setTotalMonth(e.target.value)}
                            >
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month} tháng
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Infor Package */}
                    <div>
                      <div
                        className={`${selectedPackage !== "6" ? "hidden" : ""}`}
                      >
                        <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                          <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                          <div className="flex-shrink-1">
                            <p className="mb-1 font-bold">Tin miễn phí</p>
                            <p className="mb-1">
                              <span className="text-gray-600 font-normal">
                                Tiêu đề màu mặc định, viết thường
                              </span>
                              . Hiển thị sau các tin VIP.
                            </p>
                            <p className="m-0">
                              Tin đăng sẽ phải chờ phê duyệt trước khi hiển thị.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${selectedPackage !== "5" ? "hidden" : ""}`}
                      >
                        <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                          <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                          <div className="flex-shrink">
                            <p className="mb-1 font-bold">Tin thường</p>
                            <p className="mb-1">
                              <span className="text-gray-600 font-normal">
                                Tiêu đề màu mặc định, viết thường
                              </span>
                              . Hiển thị sau các tin VIP.
                            </p>
                            <p className="m-0">
                              Tin đăng sẽ phải chờ phê duyệt trước khi hiển thị.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${selectedPackage !== "4" ? "hidden" : ""}`}
                      >
                        <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                          <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                          <div className="flex-shrink">
                            <p className="mb-1 font-bold">
                              TIN VIP 3
                              <span className="star star-2 ml-1"></span>
                            </p>
                            <p className="mb-1">
                              <span className="text-blue-600 font-bold uppercase">
                                TIÊU ĐỀ IN HOA MÀU XANH
                              </span>
                              , gắn biểu tượng 2 ngôi sao màu vàng ở tiêu đề tin
                              đăng. Hiển thị sau tin VIP nổi bật, Tin VIP 1, Tin
                              VIP 2, Tin VIP 3 và trên các tin khác.
                            </p>
                            <p className="m-0">
                              Tin đăng VIP hiển thị ngay, không cần chờ.
                            </p>
                            <p className="m-0 text-base text-red-600 font-medium">
                              (Khuyên dùng)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${selectedPackage !== "3" ? "hidden" : ""}`}
                      >
                        <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                          <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                          <div className="flex-shrink">
                            <p className="mb-1 font-bold">
                              TIN VIP 2
                              <span className="star star-3 ml-1"></span>
                            </p>
                            <p className="mb-1">
                              <span className="text-orange-600 font-bold uppercase">
                                TIÊU ĐỀ IN HOA MÀU CAM
                              </span>
                              , gắn biểu tượng 3 ngôi sao màu vàng ở tiêu đề tin
                              đăng. Hiển thị sau tin VIP nổi bật, Tin VIP 1, Tin
                              VIP 2 và trên các tin khác.
                            </p>
                            <p className="m-0">
                              Tin đăng VIP hiển thị ngay, không cần chờ.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${selectedPackage !== "2" ? "hidden" : ""}`}
                      >
                        <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                          <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                          <div className="flex-shrink">
                            <p className="mb-1 font-bold">
                              TIN VIP 1
                              <span className="star star-4 ml-1"></span>
                            </p>
                            <p className="mb-1">
                              <span className="text-pink-600 font-bold uppercase">
                                TIÊU ĐỀ IN HOA MÀU HỒNG
                              </span>
                              , gắn biểu tượng 4 ngôi sao màu vàng ở tiêu đề tin
                              đăng. Hiển thị sau tin VIP nổi bật, Tin VIP 1 và
                              trên các tin khác.
                            </p>
                            <p className="m-0">
                              Tin đăng VIP hiển thị ngay, không cần chờ.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${selectedPackage !== "1" ? "hidden" : ""}`}
                      >
                        <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                          <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                          <div className="flex-shrink">
                            <p className="mb-1 font-bold">
                              TIN NỔI BẬT
                              <span className="star star-5 ml-1"></span>
                            </p>
                            <p className="mb-1">
                              <span className="text-red-600 font-bold uppercase">
                                TIÊU ĐỀ IN HOA MÀU ĐỎ
                              </span>
                              , gắn biểu tượng 5 ngôi sao màu vàng và hiển thị
                              to và nhiều hình hơn các tin khác. Nằm trên tất cả
                              các tin khác, được hưởng nhiều ưu tiên và hiệu quả
                              giao dịch cao nhất. Đồng thời xuất hiện đầu tiên ở
                              mục tin nổi bật xuyên suốt khu vực chuyên mục đó
                            </p>
                            <p className="m-0">
                              Tin đăng VIP hiển thị ngay, không cần chờ.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Method to Pay */}
                  <div class="bg-white shadow-sm rounded p-4 mb-4">
                    <div class="text-xl font-medium">
                      Chọn phương thức thanh toán
                    </div>

                    {selectedPackage === "6" ? (
                      <div className="text-gray-700 font-medium mt-3">
                        Gói miễn phí
                      </div>
                    ) : (
                      <ul className="space-y-3 mt-3">
                        {paymentOptions.map((option, index) => (
                          <li key={index}>
                            <label className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  className="form-checkbox w-5 h-5 text-blue-600"
                                  checked={payMethod === option.id}
                                  onChange={() =>
                                    handlePayOptionChange(option.id)
                                  }
                                  // Optional: handle checked state
                                />
                                {option.icon}
                                <span className="text-gray-800 font-medium">
                                  {option.name}
                                </span>
                              </div>
                              <span className="text-sm text-gray-400">›</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                  )}
                  {/* Submit */}
                  <div className="flex">
                    <button
                      className="w-full rounded-xl bg-red-600 text-white text-sm font-medium p-3 ms-1 whitespace-nowrap opacity-50 cursor-auto"
                      type="button"
                      onClick={handlePaymentSubmit}
                    >
                      Thanh toán <span className="ml-1">???</span>
                    </button>
                  </div>
                </div>
                {/* All infor  */}
                <div class="w-3/10">
                  <PaymentSummary
                    packageType={packageType}
                    selectedPackage={selectedPackage}
                    totalDay={totalDay}
                    totalWeek={totalWeek}
                    totalMonth={totalMonth}
                    totalAmount={totalAmount}
                    vipExpiryDate={vipExpiryDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const packages = [
  // {
  //   value: "6",
  //   title: "Tin miễn phí",
  //   priceDay: "(0/ngày)",
  //   priceWeek: "(0/tuần)",
  //   priceMonth: "(0/tháng)",
  // },
  {
    value: "5",
    title: "Tin thường",
    priceDay: "(2.000/ngày)",
    priceWeek: "(12.000/tuần)",
    priceMonth: "(48.000/tháng)",
  },
  {
    value: "4",
    title: "Tin VIP 3",
    priceDay: "(10.000/ngày)",
    priceWeek: "(63.000/tuần)",
    priceMonth: "(240.000/tháng)",
  },
  {
    value: "3",
    title: "Tin VIP 2",
    priceDay: "(20.000/ngày)",
    priceWeek: "(133.000/tuần)",
    priceMonth: "(540.000/tháng)",
  },
  {
    value: "2",
    title: "Tin VIP 1",
    priceDay: "(30.000/ngày)",
    priceWeek: "(190.000/tuần)",
    priceMonth: "(800.000/tháng)",
  },
  {
    value: "1",
    title: "Tin VIP nổi bật",
    priceDay: "(50.000/ngày)",
    priceWeek: "(315.000/tuần)",
    priceMonth: "(1.200.000/tháng)",
  },
];
const paymentOptions = [
  {
    id: 1,
    name: "Ví tài khoản",
    icon: (
      <div className="w-10 h-10 flex justify-center items-center">
        {/* <img src={icon_vnpay} alt="VNPAY" className="object-contain h-8" /> */}
        <IoWalletOutline size={24} />
      </div>
    ),
    href: "/",
  },
  {
    id: 2,
    name: "Ví điện tử VNPAY",
    icon: (
      <div className="w-10 h-10 flex justify-center items-center">
        <img src={icon_vnpay} alt="VNPAY" className="object-contain h-8" />
      </div>
    ),
    href: "/",
  },
];
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Kiểm tra nếu ngày không hợp lệ
  // Lấy giờ và phút
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Lấy ngày, tháng, năm
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
