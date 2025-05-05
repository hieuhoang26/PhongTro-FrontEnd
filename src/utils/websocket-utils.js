import { getStompClient } from "../api/websocket";

// src/utils/websocket-utils.js
export const isWebSocketConnected = () => {
  const stompClient = getStompClient();
  return stompClient && stompClient.connected;
};

export const subscribeToTopic = (topic, callback) => {
  const stompClient = getStompClient();
  if (stompClient && stompClient.connected) {
    return stompClient.subscribe(topic, (message) => {
      callback(JSON.parse(message.body));
    });
  }
  return null;
};

export const unsubscribeFromTopic = (subscription) => {
  if (subscription) {
    subscription.unsubscribe();
  }
};
