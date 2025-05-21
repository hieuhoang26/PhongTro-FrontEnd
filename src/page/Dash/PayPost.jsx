import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { PaymentSummary } from "./PaymentSummary";

import icon_vnpay from "../../assets/icon_vnpay.png";
import { IoWalletOutline } from "react-icons/io5";

export const packages = [
  {
    value: "6",
    title: "Tin miễn phí",
    priceDay: "(0/ngày)",
    priceWeek: "(0/tuần)",
    priceMonth: "(0/tháng)",
  },
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

export const PayPost = ({
  setStep,
  formData,
  setFormData,
  handleSubmit,
  totalAmount,
  setTotalAmount,
  payMethod,
  setPayMethod,
}) => {
  const [packageType, setPackageType] = useState("day"); // day, week, month

  const [selectedPackage, setSelectedPackage] = useState("4"); // to VIP

  const [totalDay, setTotalDay] = useState("3");
  const [totalWeek, setTotalWeek] = useState("1");
  const [totalMonth, setTotalMonth] = useState("1");

  const [postLabel, setPostLabel] = useState(false);
  const [usePostTiktok, setUsePostTiktok] = useState(false);

  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi

  const pkg = packages.find((p) => p.value === selectedPackage);

  useEffect(() => {
    const calculateExpirationDate = () => {
      const now = new Date();
      let duration = 0;

      if (packageType === "day") duration = parseInt(totalDay);
      if (packageType === "week") duration = parseInt(totalWeek) * 7;
      if (packageType === "month") duration = parseInt(totalMonth) * 30;

      now.setDate(now.getDate() + duration);
      return now.toISOString(); // Hoặc format bạn muốn
    };
    const calculateTotal = () => {
      const pricePerUnit = parseInt(getPricePerUnit());
      let duration = 1;

      if (packageType === "day") duration = parseInt(totalDay);
      if (packageType === "week") duration = parseInt(totalWeek);
      if (packageType === "month") duration = parseInt(totalMonth);

      let total = pricePerUnit * duration;

      // Add label cost if selected (2000 per day)
      if (postLabel) {
        const labelDays =
          packageType === "day"
            ? duration
            : packageType === "week"
            ? duration * 7
            : duration * 30;
        total += 2000 * labelDays;
      }

      return total;
    };

    const total = calculateTotal();
    const expiryDate = calculateExpirationDate();

    setTotalAmount(total);

    setFormData((prev) => ({
      ...prev,
      isVip: selectedPackage,
      vipExpiryDate: expiryDate,
    }));
  }, [
    selectedPackage,
    packageType,
    totalDay,
    totalWeek,
    totalMonth,
    setFormData,
  ]);

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
  const handlePaymentSubmit = (e) => {
    // Kiểm tra điều kiện trước khi submit
    if (selectedPackage === "6") {
      if (packageType !== "day") {
        setError("Gói Miễn phí  chỉ áp dụng cho loại ngày (day)");
        return;
      }
      if (parseInt(totalDay) > 3) {
        setError("Gói Miễn phí chỉ được đăng tối đa 3 ngày");
        return;
      }
    }

    // Nếu không có lỗi thì submit
    setError("");
    handleSubmit(e);
  };

  const handlePayOptionChange = (optionId) => {
    setPayMethod(optionId === payMethod ? null : optionId);
  };

  return (
    <div className="relative ">
      {/* nav */}
      <div className="sticky top-[45px] bg-white shadow-sm p-3 px-5 pb-2 z-10">
        <nav aria-label="breadcrumb">
          <ol className="flex text-sm space-x-2">
            <li className="breadcrumb-item">
              <button
                className="flex items-center text-blue-600 cursor-pointer text-xs"
                onClick={() => setStep(1)}
              >
                <IoMdArrowBack />
                Danh sách tin đăng
              </button>
            </li>
          </ol>
        </nav>
        <div className="flex items-center mt-2">
          <h1 className="text-2xl font-semibold whitespace-nowrap">
            Thanh toán dịch vụ đăng tin
          </h1>
        </div>
      </div>
      {/* main */}
      <div class="flex justify-center">
        <div class="w-full max-w-[1200px]  mt-10 flex gap-3">
          {/* Main */}
          <div class="w-7/10">
            <div className="bg-white shadow-sm rounded p-4 mb-4">
              <div className="text-lg font-medium mb-3">Chọn gói tin đăng</div>
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

              {/* Tick  */}
              <div className="mt-3 space-y-3">
                {/* Checkbox: Gắn nhãn cho thuê nhanh */}
                <div className="flex items-start space-x-2">
                  <input
                    id="post_label"
                    type="checkbox"
                    checked={postLabel}
                    onChange={(e) => setPostLabel(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="post_label" className="text-sm text-gray-700">
                    Gắn nhãn cho thuê nhanh (
                    <span className="text-green-600 font-semibold">2000 ₫</span>
                    /ngày)
                  </label>
                </div>

                {/* Checkbox: Đăng video Tiktok */}
                {["1", "2", "3", "4"].includes(selectedPackage) && (
                  <>
                    <div className="flex items-start space-x-2">
                      <input
                        id="use_post_tiktok"
                        type="checkbox"
                        checked={usePostTiktok}
                        onChange={(e) => setUsePostTiktok(e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="use_post_tiktok"
                        className="text-sm text-gray-700"
                      >
                        Đăng video lên kênh Tiktok{" "}
                        <a
                          href="https://www.tiktok.com/@phongtro123.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Phongtro123
                        </a>{" "}
                        (<s className="text-red-500">100.000₫</s>{" "}
                        <span className="text-green-600 font-semibold">0₫</span>
                        )
                      </label>
                    </div>

                    <em className="block text-xs text-red-600">
                      Nếu bạn chưa có sẵn video, chỉ cần tích chọn, nhân viên
                      Phongtro123.com sẽ chủ động liên hệ để hỗ trợ bạn nhận
                      video, tải lên hệ thống hoặc thậm chí đến tận nơi để quay
                      video chuyên nghiệp.
                    </em>
                  </>
                )}
              </div>

              {/* Infor Package */}
              <div>
                <div className={`${selectedPackage !== "6" ? "hidden" : ""}`}>
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

                <div className={`${selectedPackage !== "5" ? "hidden" : ""}`}>
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

                <div className={`${selectedPackage !== "4" ? "hidden" : ""}`}>
                  <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                    <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                    <div className="flex-shrink">
                      <p className="mb-1 font-bold">
                        TIN VIP 3<span className="star star-2 ml-1"></span>
                      </p>
                      <p className="mb-1">
                        <span className="text-blue-600 font-bold uppercase">
                          TIÊU ĐỀ IN HOA MÀU XANH
                        </span>
                        , gắn biểu tượng 2 ngôi sao màu vàng ở tiêu đề tin đăng.
                        Hiển thị sau tin VIP nổi bật, Tin VIP 1, Tin VIP 2, Tin
                        VIP 3 và trên các tin khác.
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

                <div className={`${selectedPackage !== "3" ? "hidden" : ""}`}>
                  <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                    <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                    <div className="flex-shrink">
                      <p className="mb-1 font-bold">
                        TIN VIP 2<span className="star star-3 ml-1"></span>
                      </p>
                      <p className="mb-1">
                        <span className="text-orange-600 font-bold uppercase">
                          TIÊU ĐỀ IN HOA MÀU CAM
                        </span>
                        , gắn biểu tượng 3 ngôi sao màu vàng ở tiêu đề tin đăng.
                        Hiển thị sau tin VIP nổi bật, Tin VIP 1, Tin VIP 2 và
                        trên các tin khác.
                      </p>
                      <p className="m-0">
                        Tin đăng VIP hiển thị ngay, không cần chờ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${selectedPackage !== "2" ? "hidden" : ""}`}>
                  <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                    <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                    <div className="flex-shrink">
                      <p className="mb-1 font-bold">
                        TIN VIP 1<span className="star star-4 ml-1"></span>
                      </p>
                      <p className="mb-1">
                        <span className="text-pink-600 font-bold uppercase">
                          TIÊU ĐỀ IN HOA MÀU HỒNG
                        </span>
                        , gắn biểu tượng 4 ngôi sao màu vàng ở tiêu đề tin đăng.
                        Hiển thị sau tin VIP nổi bật, Tin VIP 1 và trên các tin
                        khác.
                      </p>
                      <p className="m-0">
                        Tin đăng VIP hiển thị ngay, không cần chờ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${selectedPackage !== "1" ? "hidden" : ""}`}>
                  <div className="flex items-start text-sm bg-yellow-100 text-yellow-800 p-4 mt-3 mb-0 rounded">
                    <i className="icon info-circle mt-1 mr-2 flex-shrink-0"></i>
                    <div className="flex-shrink">
                      <p className="mb-1 font-bold">
                        TIN NỔI BẬT<span className="star star-5 ml-1"></span>
                      </p>
                      <p className="mb-1">
                        <span className="text-red-600 font-bold uppercase">
                          TIÊU ĐỀ IN HOA MÀU ĐỎ
                        </span>
                        , gắn biểu tượng 5 ngôi sao màu vàng và hiển thị to và
                        nhiều hình hơn các tin khác. Nằm trên tất cả các tin
                        khác, được hưởng nhiều ưu tiên và hiệu quả giao dịch cao
                        nhất. Đồng thời xuất hiện đầu tiên ở mục tin nổi bật
                        xuyên suốt khu vực chuyên mục đó
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
              <div class="text-xl font-medium">Chọn phương thức thanh toán</div>

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
                            onChange={() => handlePayOptionChange(option.id)}
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
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {/* Submit */}
            <div className="flex">
              <button
                className="flex items-center justify-center w-full rounded-xl bg-gray-200 text-gray-700 text-sm font-medium p-3 me-1 hover:bg-gray-300"
                onClick={() => setStep(1)}
              >
                <IoMdArrowBack size={20} className="mr-2" />
                Quay lại
              </button>

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
              postLabel={postLabel}
              usePostTiktok={usePostTiktok}
              totalAmount={totalAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
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
