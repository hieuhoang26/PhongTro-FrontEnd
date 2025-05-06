import { useState, useEffect, useRef, useCallback, useContext } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { AuthContext } from "../../context/AuthContext";
import { chatApi } from "../../api/socket";
import {
  getAccessTokenFromSession,
  getProfileFromSession,
} from "../../utils/storage";

export const ChatApp = () => {
  const { userId } = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); // User nhận
  //   const [currentConversationId, setCurrentConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const messagesEndRef = useRef(null);
  const stompClient = useRef(null);

  const token = getAccessTokenFromSession();

  //   console.log("user", userId);
  //   console.log("curr", currentChat);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = new Client({
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
        // setupSubscriptions();
      },
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("WebSocket Error:", frame);
      },
    });
    stompClient.current.activate();
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
        console.log("[WebSocket] STOMP client deactivated");
      }
    };
  }, [userId]);

  // Load contacts
  useEffect(() => {
    if (!userId) return;

    const fetchContacts = async () => {
      try {
        const data = await chatApi.fetchUserConversations(userId);
        setContacts(data.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [userId]);

  // Load messages when chat changes
  // Khi chọn người chat => lấy conversationId + messages + subscribe
  useEffect(() => {
    const loadConversation = async () => {
      if (!currentChat || !userId) return;
      try {
        const res = await chatApi.getOrCreateConversation(
          userId, // id gửi
          currentChat.id // id nhận
        );
        // console.log("Conversation", res.data);
        const conversationId = res.data.id;

        // Lấy tin nhắn
        const msgRes = await chatApi.fetchMessages(conversationId);

        // console.log("mess", msgRes.data);
        setMessages(
          msgRes.data.map((msg) => ({
            ...msg,
            incoming: msg.senderId != userId,
          }))
        );

        // Subscribe WebSocket
        stompClient.current.subscribe(
          `/topic/conversations-${conversationId}`,
          (message) => {
            const msg = JSON.parse(message.body);
            setMessages((prev) => [
              ...prev,
              {
                ...msg,
                incoming: msg.senderId != userId,
              },
            ]);
          }
        );
        console.log(
          `[WebSocket] Subscribed to /topic/conversations/${conversationId}`
        );
      } catch (err) {
        console.error("Error loading conversation:", err);
      }
    };

    loadConversation();
  }, [currentChat, userId]);

  // Send new message
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !currentChat || !stompClient.current?.connected)
      return;

    const message = {
      senderId: userId,
      receiverId: currentChat.id,
      content: newMessage,
      contentType: "text",
    };

    setMessages((prev) => [
      ...prev,
      {
        ...message,
        incoming: false,
        timestamp: new Date().toISOString(),
      },
    ]);

    stompClient.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(message),
    });

    setNewMessage("");
  }, [newMessage, userId, currentChat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat App</h1>
          <div className="flex items-center">
            <span
              className={`h-3 w-3 rounded-full mr-2 ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span>{isConnected ? "Online" : "Offline"}</span>
          </div>
        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {contacts.map((contact) => {
            // Xác định user hiển thị (user không null)
            const displayUser = contact.user2 ? contact.user2 : contact.user1;
            // Lấy thông tin tin nhắn cuối
            const lastMessage =
              contact.lastMessage?.content || "No messages yet";

            return (
              <div
                key={contact.id}
                onClick={() => setCurrentChat(displayUser)}
                className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
                  currentChat?.id === contact.id ? "bg-gray-200" : ""
                }`}
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    // src={
                    //   displayUser.avatarUrl ||
                    //   `https://placehold.co/200x/cccccc/ffffff.svg?text=${displayUser.name.charAt(
                    //     0
                    //   )}&font=Lato`
                    // }
                    src={`https://placehold.co/200x/${contact.color}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{displayUser.name}</h2>
                  <p className="text-gray-600 truncate">{lastMessage}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 relative">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">
            {currentChat ? currentChat.name : "Select a chat"}
          </h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {currentChat ? (
            messages.length > 0 ? (
              <>
                {messages.map((message, index) =>
                  message.incoming ? (
                    <div key={index} className="flex mb-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <img
                          src={`https://placehold.co/200x/${currentChat.color}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p className="text-gray-700">{message.content}</p>
                        <span className="text-xs text-gray-500 self-end">
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex justify-end mb-4">
                      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                        <p>{message.content}</p>
                        <span className="text-xs text-indigo-200 self-end">
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="My Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                  )
                )}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Select a contact to start chatting
              </p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        {currentChat && (
          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!isConnected}
                className={`px-4 py-2 rounded-md ml-2 ${
                  isConnected
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isConnected ? "Send" : "Connecting..."}
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
