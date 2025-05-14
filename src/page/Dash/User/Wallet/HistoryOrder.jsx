import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { paymentApi } from "../../../../api/payment";

export const HistoryOrder = () => {
  const { userId } = useContext(AuthContext);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      paymentApi.getOrder(userId).then((res) => {
        if (res.status === 200 && res.data?.data) {
          const transformed = res.data.data.map((item) => ({
            id: item.id,
            status: item.status === "COMPLETED" ? "success" : "error",
            date: new Date(item.createdAt).toLocaleString("vi-VN"),
            amount: `-${Number(item.amount).toLocaleString()} đ`,
            transactionCode: `Post #${item.post}`,
            method: item.paymentMethod,
            note:
              item.status === "COMPLETED"
                ? "Thanh toán thành công"
                : "Thất bại",
          }));
          setOrderHistory(transformed);
        }
      });
    }
  }, [userId]);

  return (
    <div className="flex justify-center px-4 lg:p-6">
      <div className="w-full max-h-[450px] overflow-y-auto border border-gray-200 rounded-lg">
        <table className="min-w-full table-fixed text-xs">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0 z-10">
            <tr>
              <th className="p-4">STT</th>
              <th className="p-4">Ngày giao dịch</th>
              <th className="p-4 text-right">Số tiền</th>

              <th className="p-4 text-right">Thực chi</th>
              <th className="p-4">Mã giao dịch</th>
              <th className="p-4">Phương thức</th>
              <th className="p-4">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderHistory.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 whitespace-nowrap">{item.date}</td>
                <td className="p-4 text-right">{item.amount}</td>
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
