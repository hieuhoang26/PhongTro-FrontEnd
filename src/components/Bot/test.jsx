// const callGeminiAPI = async (userInput) => {
//   try {
//     setLoading(true);

//     const response = await fetch("http://localhost:8080/bot", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ question: userInput, mode: mode }),
//     });

//     const data = await response.json();

//     console.log(data.result);

//     if (data.result && Array.isArray(data.result)) {
//       const htmlReply = data.result
//         .map((item) => {
//           return `

//       <span style="color: #1e40af;">🏠 <strong>${
//         item.title || "Không có tiêu đề"
//       }</strong></span>
//       <span>📍 <strong>Địa chỉ:</strong> ${
//         item.address || "Chưa cập nhật"
//       }</span>
//       <span>📐 <strong>Diện tích:</strong> ${item.area || "N/A"} m²</span>
//       <span>💰 <strong>Giá:</strong> ${
//         item.price?.toLocaleString() || "N/A"
//       } VND</span>
//       <span>📞 <strong>Liên hệ:</strong> ${
//         item.name_contact || "Chưa cập nhật"
//       } - ${item.phone_contact || "Chưa cập nhật"}</span>
//       <a href="/detail/${
//         item.id
//       }" style="color: #2563eb; text-decoration: underline;">Xem chi tiết</a>

//   `;
//         })
//         .join("");

//       setMessages((prev) => [...prev, { from: "bot", html: htmlReply }]);
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "Không tìm thấy kết quả phù hợp." },
//       ]);
//     }
//   } catch (error) {
//     console.error("API error:", error);
//     setMessages((prev) => [
//       ...prev,
//       { from: "bot", text: "Lỗi khi kết nối đến máy chủ." },
//     ]);
//   } finally {
//     setLoading(false);
//   }
// };
