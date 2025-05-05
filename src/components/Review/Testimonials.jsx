import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Chú Kim Phú",
      content:
        "Tôi hài lòng với dịch vụ đăng tin cho thuê phòng trọ trên website phongtro123.com. Giao diện dễ sử dụng và nhanh chóng, giúp tôi tạo tin đăng một cách thuận tiện. Chỉ sau vài ngày, tôi đã nhận được nhiều lượt quan tâm và cuộc gọi từ người tìm phòng. Đặc biệt, đội ngũ hỗ trợ rất nhiệt tình và phản hồi nhanh chóng khi tôi cần giúp đỡ. Rất đáng để khuyên dùng!",
    },
    {
      name: "Chị Ngọc Anh",
      content:
        "Website phongtro123.com cho phép đăng tải thông tin cho thuê cực kỳ đơn giản và tôi đã thử. Việc đăng hình ảnh, thông tin phòng trọ lên trang web đã giúp khu trọ tôi có nhiều sinh viên tới thuê. Tôi đánh giá rất cao website và hình thức quảng cáo này. Tôi tin rằng Phongtro123.com sẽ ngày càng phát triển và trở thành địa chỉ tin cậy hàng đầu cho thị trường cho thuê phòng trọ tại Việt Nam.",
    },
    {
      name: "Anh Nam",
      content:
        "Một điểm mà tôi đặc biệt thích ở Phongtro123.com là cộng đồng người dùng tích cực của trang web. Tôi đã kết nối được với rất nhiều người thuê tiềm năng và tìm được người ở phù hợp chỉ trong thời gian ngắn. Nếu có một điều tôi muốn đề xuất, đó là có thể bổ sung thêm tính năng lọc tin đăng theo một số tiêu chí cụ thể hơn, như diện tích phòng, loại hình phòng trọ, v.v. Điều này sẽ giúp nền tảng ngày càng hoàn thiện hơn",
    },
    {
      name: "Cô Phạm Hằng",
      content:
        "So với các hình thức quảng cáo truyền thống, đăng tin trên Phongtro123.com giúp tôi tiết kiệm được rất nhiều chi phí mà vẫn đạt hiệu quả cao. Việc đăng tin, quản lý thông tin phòng trọ trên Phongtro123.com cũng vô cùng đơn giản, ngay cả với những người không quá rành về công nghệ như tôi.",
    },
    {
      name: "Chị Dung",
      content:
        "Vào 2 năm trước, sau đại dịch Covid vào thời điểm thành phố mở của trở lại, người lao động đổ về trở lại thành phố rất đông, rất nhiều người tìm kiếm phòng trọ, tuy nhiên nhà trọ của tôi lại không được quảng cáo nên rất ít người biết đến và thuê, số lượng chỉ tăng lên 2 - 3 phòng. May mắn sau khi lướt tìm kiếm thông tin cho thuê phòng trọ tôi đã tìm thấy website phongtro123.com cho phép đăng tin cho thuê phòng trọ một cách nhanh chóng, và rất đơn giản.",
    },
    {
      name: "Chị Thảo Trang",
      content:
        "Tôi đã tìm được một người thuê rất phù hợp chỉ sau vài ngày đăng tin. So với các trang web khác mà tôi đã từng sử dụng, Phongtro123.com có giao diện thân thiện hơn và dễ sử dụng hơn rất nhiều. Nếu có thể, tôi muốn Phongtro123.com bổ sung thêm tính năng lọc tin nhắn, giúp tôi dễ dàng quản lý các cuộc trò chuyện với nhiều người thuê khác nhau.",
    },
  ];

  return (
    <div className="flex justify-center pt-4 mt-4">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Khách hàng nói về chúng tôi
        </h2>
        <p className="text-lg text-center mb-10">
          Sự hài lòng của khách hàng là động lực phát triển của Phongtro123.com
        </p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start">
                <img
                  className="w-12 h-12 rounded-full mr-3"
                  src="https://phongtro123.com/images/default-user.svg"
                  alt={testimonial.name}
                />
                <div>
                  <span className="text-base font-medium">
                    {testimonial.name}
                  </span>
                  <div className="flex mt-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
