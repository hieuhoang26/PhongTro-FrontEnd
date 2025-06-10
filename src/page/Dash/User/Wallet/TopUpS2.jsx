import React, { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AuthContext } from "../../../../context/AuthContext";
import { paymentApi } from "../../../../api/payment";

export const TopUpS2 = ({ setStep, payMethod }) => {
  const { userId } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    amount: "50000",
    amount_input: "50.000",
    type_charging: "atm",
  });

  const amountOptions = [
    { value: "50000", label: "50.000" },
    { value: "100000", label: "100.000" },
    { value: "200000", label: "200.000" },
    { value: "500000", label: "500.000" },
    { value: "1000000", label: "1.000.000" },
    { value: "2000000", label: "2.000.000" },
    { value: "5000000", label: "5.000.000" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountChange = (value) => {
    const selected = amountOptions.find((item) => item.value === value);
    setFormData((prev) => ({
      ...prev,
      amount: value,
      amount_input: selected ? selected.label : value,
    }));
  };

  const amount = parseInt(formData.amount.replace(/\./g, ""));
  const tax = Math.round(amount * 0.1);
  const subTotal = amount - tax;
  const discount = 0;
  const total = subTotal + discount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const rawAmount = parseInt(formData.amount.replace(/\./g, ""));
    const rawAmount = total;
    try {
      if (payMethod === 1) {
        const res = await paymentApi.createVnPayPayment(
          rawAmount,
          "TOP_UP",
          userId,
          null
        );
        console.log(res.data?.paymentUrl);
        // Redirect to VNPay link nếu backend trả URL
        if (res.data?.paymentUrl) {
          // window.location.href = res.data.paymentUrl;
          window.open(res.data.paymentUrl, "_blank");
        }
      } else if (payMethod === 2) {
        // Gọi API chuyển khoản nếu có
        console.log("Chuyển khoản ngân hàng - tạo phiếu hướng dẫn");
        // Ví dụ giả định: paymentApi.createBankTransfer(...)
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <form
      className="w-full"
      id="frm-payment-method-atm"
      onSubmit={handleSubmit}
      method="POST"
      noValidate
    >
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Chọn số tiền cần nạp</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {amountOptions.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer p-2 border rounded-xl text-center text-sm font-medium transition-all ${
                formData.amount === option.value
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <input
                type="radio"
                name="amount"
                value={option.value}
                checked={formData.amount === option.value}
                onChange={() => handleAmountChange(option.value)}
                className="hidden"
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-sm mb-1">Hoặc nhập số tiền cần nạp</p>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              name="amount_input"
              className="w-full px-3 py-2 text-sm focus:outline-none"
              placeholder="Nhập số tiền cần nạp"
              value={formData.amount_input}
              onChange={handleChange}
            />
            <span className="bg-gray-100 px-4 text-sm">₫</span>
          </div>
          {/* <div className="text-orange-500 mt-1 text-xs">
            {amountTextMap[formData.amount]}
          </div> */}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Thông tin nạp tiền</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="text-left py-1">Số tiền nạp</td>
              <td className="text-right py-1">{formData.amount_input}₫</td>
            </tr>
            <tr>
              <td className="text-left py-1">Thuế VAT (10%)</td>
              <td className="text-right py-1">-{tax.toLocaleString()}₫</td>
            </tr>
            <tr>
              <td className="text-left py-1">Sau thuế</td>
              <td className="text-right py-1">{subTotal.toLocaleString()}₫</td>
            </tr>
            <tr>
              <td className="text-left py-1">Khuyến mãi</td>
              <td className="text-right py-1">+{discount.toLocaleString()}₫</td>
            </tr>
            <tr className="font-bold">
              <td className="text-left pt-2">Thực nhận</td>
              <td className="text-right pt-2">{total.toLocaleString()}₫</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex">
        <button
          className="flex items-center justify-center w-full rounded-xl bg-gray-200 text-gray-700 text-sm font-medium p-3 me-1 hover:bg-gray-300"
          onClick={() => setStep(1)}
        >
          <IoMdArrowBack size={20} className="mr-2" />
          Quay lại
        </button>

        <button
          className="w-full rounded-xl bg-red-600 text-white text-sm font-medium p-3 ms-1 whitespace-nowrap opacity-50 cursor-auto"
          type="submit"
        >
          Nạp
        </button>
      </div>

      <input
        type="hidden"
        name="type_charging"
        value={formData.type_charging}
      />
    </form>
  );
};
