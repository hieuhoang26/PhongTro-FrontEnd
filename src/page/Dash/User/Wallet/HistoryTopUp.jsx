import React from "react";

export const HistoryTopUp = () => {
  const paymentHistory = [
    {
      id: 1,
      status: "error",
      date: "00:44 12/5/2025",
      amount: "+50.000",
      tax: "4.550",
      discount: "0",
      received: "0",
      transactionCode: "PT12312052025004400",
      method: "QRCODE - QR9L3CUL",
      note: "",
    },
    {
      id: 2,
      status: "warning",
      date: "21:37 8/5/2025",
      amount: "+50.000",
      tax: "4.550",
      discount: "0",
      received: "0",
      transactionCode: "PT12308052025213736",
      method: "Cửa Hàng Tiện Lợi\nHạn thanh toán: 21:37 15/05/2025",
      note: "Tạo mã thành công",
    },
  ];

  const renderStatusIcon = (status) => {
    const baseClass = "w-3 h-3 inline-block";
    if (status === "error") {
      return (
        <svg
          className={`${baseClass} text-red-500`}
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
        </svg>
      );
    }
    return (
      <svg
        className={`${baseClass} text-yellow-500`}
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
      </svg>
    );
  };

  return (
    <div className="flex justify-center px-4 lg:p-6">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-fixed text-xs border border-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Ngày nạp</th>
              <th className="p-4 text-right">Số tiền nạp</th>
              <th className="p-4 text-right">Thuế</th>
              <th className="p-4 text-right">Khuyến mãi</th>
              <th className="p-4 text-right">Thực nhận</th>
              <th className="p-4">Mã giao dịch</th>
              <th className="p-4">Phương thức</th>
              <th className="p-4">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentHistory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="text-center p-4">
                  {renderStatusIcon(item.status)}
                </td>
                <td className="p-4 whitespace-nowrap">{item.date}</td>
                <td className="p-4 text-right">{item.amount}</td>
                <td className="p-4 text-right">{item.tax}</td>
                <td className="p-4 text-right">{item.discount}</td>
                <td className="p-4 text-right">{item.received}</td>
                <td className="p-4">{item.transactionCode}</td>
                <td className="p-4 whitespace-pre-line">{item.method}</td>
                <td className="p-4 text-gray-700">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
