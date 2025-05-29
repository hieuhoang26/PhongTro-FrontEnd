import React, { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello, how can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const callGeminiAPI = async (userInput) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC37JRIpqR9eJmoRiodcZCRJWbvD93FZl0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userInput }],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to AI." },
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
    callGeminiAPI(" phongtro123" + input.trim());
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
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-4 z-[999] bg-white p-6 rounded-lg border border-gray-200 w-[400px] h-[480px] shadow-md flex flex-col">
          <div className="flex flex-col space-y-1.5 pb-4">
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          </div>

          <div className="flex-1 pr-2 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 my-2 text-sm ${
                  msg.from === "user" ? "justify-end text-right" : "text-left"
                }`}
              >
                {msg.from === "bot" && (
                  <span className="w-8 h-8 rounded-full bg-gray-200"></span>
                )}
                <p className="bg-gray-100 px-3 py-2 rounded-lg max-w-[75%]">
                  <span className="font-medium">
                    {msg.from === "user" ? "You" : "AI"}
                  </span>
                  : {msg.text}
                </p>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-500 mt-2">Typing...</div>
            )}
          </div>

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
