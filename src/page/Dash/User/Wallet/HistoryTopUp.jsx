import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { paymentApi } from "../../../../api/payment";

export const HistoryTopUp = () => {
  const { userId } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      paymentApi.getTransaction(userId).then((res) => {
        if (res.status === 200 && res.data?.data) {
          const transformed = res.data.data.map((item) => ({
            id: item.id,
            status: "success", // Bạn có thể xử lý logic phân loại trạng thái ở đây
            date: new Date(item.createdAt).toLocaleString("vi-VN"),
            amount: `+${Number(item.amount).toLocaleString()}`,
            tax: "0", // Nếu có thêm trường tax từ backend thì sửa tại đây
            discount: "0",
            received: Number(item.amount).toLocaleString(),
            transactionCode: item.description,
            method: item.method,
            note: item.description.includes("topup")
              ? "Nạp tiền thành công"
              : "",
          }));
          setPaymentHistory(transformed);
        }
      });
    }
  }, [userId]);

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
        className={`${baseClass} text-green-500`}
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
      <div className="w-full max-h-[450px] overflow-y-auto border border-gray-200 rounded-lg">
        <table className="min-w-full table-fixed text-xs">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
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
