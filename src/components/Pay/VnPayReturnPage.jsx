import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VnPayReturnPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const params = {};
        for (let [key, value] of searchParams.entries()) {
          params[key] = value;
        }

        const response = await axios.get(
          "http://localhost:8080/api/v1/pay/return",
          {
            params,
          }
        );

        const data = response.data;
        // console.log(data);

        if (data) {
          setMessage(
            "Thanh toán thành công! Cảm ơn bạn. Bạn sẽ được chuyển hướng sau ít giây..."
          );

          // Thêm độ trễ 3 giây trước khi chuyển hướng
          const timer = setTimeout(() => {
            window.close();
          }, 1500);

          // Cleanup function để tránh memory leak
          return () => clearTimeout(timer);
        } else {
          setMessage("Thanh toán thất bại hoặc bị hủy.");
          const timer = setTimeout(() => {
            window.close();
          }, 1500);

          // Cleanup function để tránh memory leak
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Lỗi khi xử lý VNPay return:", error);
        setMessage("Có lỗi xảy ra khi xác minh kết quả thanh toán.");
      }
    };

    fetchPaymentResult();
  }, [searchParams, navigate]); // Thêm navigate vào dependency array

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-semibold mb-4">Kết quả thanh toán</h1>
        <p>{message}</p>
        {message.includes("thành công") && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VnPayReturnPage;
