import React from "react";

export default function WhyChoose() {
  return (
    <div className="container mx-auto mt-1 px-4">
      <div className="bg-white shadow-sm p-6 rounded text-center text-base">
        <h3 className="text-xl font-semibold mb-4">
          Tại sao lại chọn PhongTro123.com?
        </h3>
        <p className="mb-6">
          Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào
          là trang web đứng top Google về các từ khóa:
          <a
            href="https://phongtro123.com"
            className="text-blue-600 hover:underline font-semibold mx-1"
          >
            cho thuê phòng trọ
          </a>
          ,<span className="font-semibold">nhà trọ</span>,
          <a
            href="/nha-cho-thue"
            className="text-blue-600 hover:underline font-semibold mx-1"
          >
            thuê nhà nguyên căn
          </a>
          ,
          <a
            href="/cho-thue-can-ho"
            className="text-blue-600 hover:underline font-semibold mx-1"
          >
            cho thuê căn hộ
          </a>
          ,
          <a
            href="/tim-nguoi-o-ghep"
            className="text-blue-600 hover:underline font-semibold mx-1"
          >
            tìm người ở ghép
          </a>
          ,
          <a
            href="/cho-thue-mat-bang"
            className="text-blue-600 hover:underline font-semibold mx-1"
          >
            cho thuê mặt bằng
          </a>
          ... Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều
          khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { number: "130.000+", text: "Chủ nhà & Môi giới" },
            { number: "200.000+", text: "Tin đăng" },
            { number: "1.000+", text: "Tin đăng/ngày" },
            { number: "3.000.000+", text: "Lượt xem/tháng" },
          ].map((item, index) => (
            <div
              key={index}
              className="shadow-sm p-4 border rounded text-center"
            >
              <div className="text-lg font-bold">{item.number}</div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">
          Chi phí thấp, hiệu quả tối đa
        </h3>
        <div className="text-yellow-500 text-xl mb-4">★★★★★</div>

        <blockquote className="italic text-gray-700 mb-6">
          <p className="mb-2">
            Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
            chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy,
            và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
            website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu
            quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng
            trống kéo dài
          </p>
          <footer className="text-sm text-gray-600">
            — Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)
          </footer>
        </blockquote>

        <h3 className="text-lg font-semibold mb-2">
          Bạn đang có phòng trọ / căn hộ cho thuê?
        </h3>
        <p className="mb-4">
          Không phải lo tìm người cho thuê, phòng trống kéo dài
        </p>

        <a
          href="/admin"
          className="inline-flex items-center justify-center bg-yellow-400 text-white text-lg font-semibold px-6 py-3 rounded-2xl hover:bg-yellow-500"
        >
          <span className="mr-2">📢</span> Đăng tin ngay
        </a>
      </div>
    </div>
  );
}
