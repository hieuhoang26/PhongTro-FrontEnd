import React, { useState } from "react";

const AboutPhongTroSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white shadow-lg p-6 rounded-lg text-gray-800">
        <h2 className="text-2xl font-semibold text-center mb-4">
          CHO THUÊ PHÒNG TRỌ NHÀ TRỌ TẠI PHONGTRO123.COM
        </h2>
        <div
          className={`transition-all duration-300 space-y-4 text-sm leading-relaxed ${
            showMore ? "max-h-[5000px]" : "max-h-[400px] overflow-hidden"
          }`}
        >
          <div className="prose max-w-none text-gray-700">
            <p>
              Khi có nhu cầu <strong>thuê phòng trọ</strong>, chắc hẳn bạn sẽ
              băn khoăn với hàng loạt câu hỏi như:{" "}
              <em>
                “Không biết bắt đầu từ đâu? Sợ bị mất cọc oan vì những phòng trọ
                “ảo”? Tìm mãi nhưng không ra phòng ưng ý?...”
              </em>
            </p>
            <p>
              Đừng quá lo lắng, vì <strong>Phongtro123.com</strong> chính là
              giải pháp tối ưu. Bạn có thể <strong>tìm phòng trọ</strong> mà
              không cần lặn lội khắp nơi, chỉ cần vài cú nhấp chuột là tìm thấy
              nơi ở tiềm năng.
            </p>
            <h3 className="text-xl font-semibold mt-3">
              Giới thiệu về Phongtro123.com
            </h3>
            <p>
              <strong>
                Phongtro123.com là kênh thông tin Phòng trọ số 1 Việt Nam
              </strong>
              , chuyên về cho thuê phòng trọ, nhà trọ lớn nhất hiện nay với hơn
              72.481 tin riêng về phòng trọ và hơn 200.000 tin tổng cộng. Hơn 3
              triệu lượt truy cập mỗi tháng.
            </p>

            <h3 className="text-xl font-semibold mt-3">Ưu điểm của website</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Chuyên môn hóa:</strong> Chỉ tập trung cho thuê phòng
                trọ, giúp tiết kiệm thời gian.
              </li>
              <li>
                <strong>Nguồn tin dồi dào:</strong> Cập nhật liên tục mỗi ngày.
              </li>
              <li>
                <strong>Thông tin minh bạch:</strong> Được kiểm duyệt kỹ càng.
              </li>
              <li>
                <strong>Bộ lọc thông minh:</strong> Lọc theo khu vực, giá cả,
                loại phòng dễ dàng.
              </li>
              <li>
                <strong>Hỗ trợ chủ trọ:</strong> Giao diện dễ dùng, nhanh tiếp
                cận người thuê.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-3">Dịch vụ nổi bật</h3>
            <p>
              Gói đăng tin linh hoạt, hỗ trợ quay video, chia sẻ Facebook, tối
              ưu SEO giúp tăng hiệu quả.
            </p>

            <h3 className="text-xl font-semibold mt-3">
              Cam kết của chúng tôi
            </h3>
            <ul className="list-decimal list-inside space-y-2">
              <li>
                <strong>Chất lượng tin đăng:</strong> Được kiểm duyệt, hạn chế
                tin ảo.
              </li>
              <li>
                <strong>Hỗ trợ tận tâm:</strong> CSKH chuyên nghiệp, nhiệt tình.
              </li>
              <li>
                <strong>Hiệu quả cao:</strong> Tiếp cận nhanh, đúng đối tượng.
              </li>
              <li>
                <strong>Chi phí rẻ:</strong> Nhiều gói linh hoạt cho mọi nhu
                cầu.
              </li>
              <li>
                <strong>Đổi mới liên tục:</strong> Giao diện thân thiện, dễ
                dùng.
              </li>
            </ul>

            <p className="mt-4">
              <strong>
                Phongtro123.com - Kênh thông tin Phòng trọ số 1 Việt Nam.
              </strong>{" "}
              Truy cập ngay
              <a
                //   href="https://phongtro123.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                phongtro123.com
              </a>{" "}
              để đăng tin miễn phí hôm nay!
            </p>
          </div>

          {!showMore && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPhongTroSection;
