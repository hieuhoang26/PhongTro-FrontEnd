import React, { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello, tôi có thể giúp gì bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("0");
  const [loading, setLoading] = useState(false);

  const callGeminiAPI = async (userInput) => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput, mode: mode }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (mode === "0") {
        // Xử lý kết quả từ database
        if (data.result && Array.isArray(data.result)) {
          if (data.result.length === 0) {
            setMessages((prev) => [
              ...prev,
              { from: "bot", text: "Không tìm thấy kết quả phù hợp." },
            ]);
            return;
          }

          const htmlReply = data.result
            .map((item) => {
              /* prettier-ignore */
              return `<span style="color: #1e40af;">🏠<strong>${item.title || "Không có tiêu đề"}</strong></span>
<span>📍 <strong>Địa chỉ:</strong> ${item.address || "Chưa cập nhật"}</span>
<span>📐 <strong>Diện tích:</strong> ${item.area || "N/A"} m²</span>
<span>💰 <strong>Giá:</strong> ${item.price?.toLocaleString() || "N/A"} VND</span>
<span>📞 <strong>Liên hệ:</strong> ${item.name_contact || "Chưa cập nhật"} - ${item.phone_contact || "Chưa cập nhật"}</span>
<a href="/detail/${item.id}" style="color: #2563eb;" target="_blank" rel="noopener noreferrer">🔗 Xem chi tiết</a>`;
            })
            .join("<hr/>");

          setMessages((prev) => [...prev, { from: "bot", html: htmlReply }]);
        } else {
          setMessages((prev) => [
            ...prev,
            { from: "bot", text: "Không tìm thấy dữ liệu." },
          ]);
        }
      } else if (mode === "1") {
        // Xử lý câu trả lời dạng text
        if (data.answer) {
          setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
        } else {
          setMessages((prev) => [
            ...prev,
            { from: "bot", text: "Không thể trả lời câu hỏi này." },
          ]);
        }
      }
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Lỗi khi kết nối đến máy chủ." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    callGeminiAPI(input.trim()); // Gọi API với nội dung người dùng nhập
    setInput("");
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-black hover:bg-gray-700 text-white"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRegMessage size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-4 z-[999] bg-white p-6 rounded-lg border border-gray-200 w-[400px] h-[600px] shadow-md flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4">
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="h-8 text-sm rounded-md border border-gray-300 bg-white px-2 py-1 focus:ring-2 focus:ring-gray-400"
            >
              <option value="0">🔍 Tìm kiếm</option>
              <option value="1">ℹ️ Thông tin</option>
            </select>
          </div>

          {/* Chat messages */}
          <div className="flex-1 pr-2 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 my-2 text-sm ${
                  msg.from === "user" ? "justify-end text-right" : "text-left"
                }`}
              >
                {/* Bot avatar placeholder */}
                {msg.from === "bot" && (
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></span>
                )}

                <div
                  className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap ${
                    msg.from === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="font-semibold mb-1">
                    {msg.from === "user" ? "You" : "AI"}
                  </div>

                  {/* Render HTML if exists, otherwise plain text */}
                  {msg.html ? (
                    <div
                      className="[&_p]:text-xs [&_strong]:text-blue-800"
                      dangerouslySetInnerHTML={{ __html: msg.html }}
                    />
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-500 mt-2">Typing...</div>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="flex pt-4 space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 h-10 rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-gray-400"
              placeholder="Type your message"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-md bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
