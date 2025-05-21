import { useEffect } from "react";
import { packages } from "./PayPost";

export const PaymentSummary = ({
  packageType,
  selectedPackage,
  totalDay,
  totalWeek,
  totalMonth,
  postLabel,
  usePostTiktok,
  totalAmount,
  vipExpiryDate,
}) => {
  // Find the selected package
  const pkg = packages.find((p) => p.value === selectedPackage);

  // Calculate expiration date (current date + duration)
  const calculateExpirationDate = () => {
    // const now = new Date();
    const baseDate = vipExpiryDate ? new Date(vipExpiryDate) : new Date();
    let duration = 0;

    if (packageType === "day") duration = parseInt(totalDay);
    if (packageType === "week") duration = parseInt(totalWeek) * 7;
    if (packageType === "month") duration = parseInt(totalMonth) * 30;

    // now.setDate(now.getDate() + duration);
    const expirationDate = new Date(baseDate);
    expirationDate.setDate(expirationDate.getDate() + duration);
    return expirationDate.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calculate package price per unit
  const getPricePerUnit = () => {
    if (!pkg) return "0";
    if (packageType === "day") return pkg.priceDay.replace(/[^\d]/g, "");
    if (packageType === "week") return pkg.priceWeek.replace(/[^\d]/g, "");
    return pkg.priceMonth.replace(/[^\d]/g, "");
  };

  // Get duration text based on package type
  const getDurationText = () => {
    if (packageType === "day") return `${totalDay} ngày`;
    if (packageType === "week") return `${totalWeek} tuần`;
    return `${totalMonth} tháng`;
  };

  // Get price per unit text
  const getPriceText = () => {
    const price = getPricePerUnit();
    if (packageType === "day")
      return `${parseInt(price).toLocaleString("vi-VN")}/ngày`;
    if (packageType === "week")
      return `${parseInt(price).toLocaleString("vi-VN")}/tuần`;
    return `${parseInt(price).toLocaleString("vi-VN")}/tháng`;
  };

  return (
    <div className="">
      <div className="bg-blue-100 shadow rounded p-4 sticky top-[158px]">
        <div className="text-xl font-semibold text-gray-800 mb-4">
          Thông tin thanh toán
        </div>
        <table className="table-auto w-full text-sm text-gray-700">
          <tbody>
            <tr>
              <td className="pl-0 py-1">Loại tin:</td>
              <td className="py-1 font-medium">{pkg?.title || "Chưa chọn"}</td>
            </tr>
            <tr>
              <td className="pl-0 py-1">Gói thời gian:</td>
              <td className="py-1 font-medium">
                {packageType === "day" && "Đăng theo ngày"}
                {packageType === "week" && "Đăng theo tuần"}
                {packageType === "month" && "Đăng theo tháng"}
              </td>
            </tr>
            <tr>
              <td className="pl-0 py-1">Đơn giá:</td>
              <td className="py-1 font-medium">{getPriceText()}</td>
            </tr>
            <tr>
              <td className="pl-0 py-1">Thời hạn:</td>
              <td className="py-1 font-medium">{getDurationText()}</td>
            </tr>
            <tr>
              <td className="pl-0 py-1">Ngày hết hạn:</td>
              <td className="py-1 font-medium">{calculateExpirationDate()}</td>
            </tr>
            <tr>
              <td className="pl-0 py-1">Thuế VAT (10%):</td>
              <td className="py-1 font-bold">0₫</td>
            </tr>
            <tr>
              <td className="pl-0 py-1">Thành tiền:</td>
              <td className="py-1 font-bold text-black text-lg">
                {/* {calculateTotal().toLocaleString("vi-VN")}₫ */}
                {/* {totalAmount}₫ */}
                {typeof totalAmount === "number" ? (
                  <div>{totalAmount.toLocaleString("vi-VN")}₫</div>
                ) : (
                  <div>Calculating...</div> // Fallback while loading
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
