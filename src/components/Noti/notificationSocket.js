import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getAccessTokenFromSession } from "../../utils/storage";

let stompClient = null;

export const connectNotificationSocket = (userId, onMessageCallback) => {
  const token = getAccessTokenFromSession();

  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = new Client({
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log("Connected to notification socket");
      stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        const notification = JSON.parse(message.body);
        onMessageCallback(notification);
      });
    },
    onStompError: (frame) => {
      console.error("STOMP Error:", frame);
    },
  });

  stompClient.activate();
};

export const disconnectNotificationSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
