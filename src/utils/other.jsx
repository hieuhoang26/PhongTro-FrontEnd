export function formatTimeAgo(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  // Nếu cùng ngày
  if (
    createdDate.getDate() === now.getDate() &&
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getFullYear() === now.getFullYear()
  ) {
    if (diffInSeconds < 60) {
      return "Vừa xong";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    }
  } else {
    // Khác ngày
    const diffInDays = Math.floor(diffInSeconds / 86400); // 86400 = 24*60*60

    if (diffInDays < 30) {
      return `${diffInDays} ngày trước`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} tháng trước`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} năm trước`;
    }
  }
}

export function formatPrice(price) {
  if (price >= 1000000) {
    const million = price / 1000000;
    // Làm tròn 1 chữ số thập phân nếu cần
    return million % 1 === 0
      ? `${million} triệu`
      : `${million.toFixed(1)} triệu`;
  } else if (price >= 1000) {
    return `${Math.round(price / 1000)} nghìn`;
  }
  return price.toString();
}

// Hàm định dạng diện tích
export function formatArea(area) {
  // Kiểm tra nếu là số nguyên thì hiển thị không có thập phân
  return area % 1 === 0 ? area.toString() : area.toFixed(1);
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Lấy thứ trong tuần (0-6, 0 là Chủ nhật)
  const days = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const dayOfWeek = days[date.getDay()];

  // Lấy giờ và phút (định dạng 2 chữ số)
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Lấy ngày, tháng, năm (định dạng dd/MM/yyyy)
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${dayOfWeek}, ${hours}:${minutes} ${day}/${month}/${year}`;
}

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const parseNumber = (str) => {
  return Number(str.replace(/\./g, ""));
};
