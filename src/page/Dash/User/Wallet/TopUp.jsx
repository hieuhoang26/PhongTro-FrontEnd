import React from "react";
import icon_vnpay from "../../../../assets/icon_vnpay.png";

export const TopUp = ({ handleNext }) => {
  const paymentOptions = [
    {
      id: 1,
      name: "Ví điện tử VNPAY",
      icon: (
        <div className="w-10 h-10 flex justify-center items-center">
          <img src={icon_vnpay} alt="VNPAY" className="object-contain h-8" />
        </div>
      ),
    },
    {
      id: 2,
      name: "Thẻ ATM nội địa",
      icon: (
        <div className="bg-blue-100 rounded-md w-10 h-10 flex justify-center items-center">
          <span className="text-blue-600 font-semibold">ATM</span>
        </div>
      ),
    },
    {
      id: 3,
      name: "Chuyển khoản",
      icon: (
        <div className="bg-green-100 rounded-md w-10 h-10 flex justify-center items-center">
          <span className="text-green-600 font-semibold">CK</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center px-4">
      <div className="mt-6 w-full max-w-xl">
        <div>
          <div
            role="alert"
            className="bg-blue-50 border-l-4 border-blue-600 text-blue-800 text-sm p-4 rounded js-promotion-payment-daily"
          >
            <p className="mb-1 font-semibold">Ưu đãi nạp tiền:</p>
            <p className="mb-1">• Nạp từ 100.000 đến dưới 1.000.000 tặng 10%</p>
            <p className="mb-1">
              • Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%
            </p>
            <p className="mb-0">• Nạp từ 2.000.000 trở lên tặng 25%</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold my-4">
          Chọn phương thức nạp tiền
        </h2>
        <ul className="space-y-3">
          {paymentOptions.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleNext(option.id)}
                className="flex items-center w-full justify-between bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span className="text-gray-800 font-medium">
                    {option.name}
                  </span>
                </div>
                <span className="text-sm text-gray-400">›</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
// {
//   name: "Thẻ quốc tế",
//   icon: (
//     <div className="flex items-center gap-2">
//       <img
//         className="h-5 object-contain"
//         src="/images/logo-visa.svg"
//         alt="Visa"
//       />
//       <img
//         className="h-6 object-contain"
//         src="/images/logo-mastercard.svg"
//         alt="Mastercard"
//       />
//       <img
//         className="h-5 object-contain"
//         src="/images/logo-jcb.svg"
//         alt="JCB"
//       />
//       <img
//         className="h-4 object-contain"
//         src="/images/logo-american-express.svg"
//         alt="American Express"
//       />
//     </div>
//   ),
// },
