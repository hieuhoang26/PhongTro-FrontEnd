// src/services/websocket.js
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.subscriptions = {};
  }

  initialize(token) {
    this.stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`http://localhost:8080/ws?token=${token}`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str),
    });

    return this.stompClient;
  }

  connect(callbacks = {}) {
    if (!this.stompClient) return;

    this.stompClient.onConnect = (frame) => {
      console.log("Connected: ", frame);
      if (callbacks.onConnect) callbacks.onConnect(frame);
    };

    this.stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
      if (callbacks.onError) callbacks.onError(frame);
    };

    this.stompClient.onDisconnect = () => {
      console.log("Disconnected");
      if (callbacks.onDisconnect) callbacks.onDisconnect();
    };

    this.stompClient.activate();
  }

  subscribe(destination, callback, id = null) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("STOMP client not connected at subscribe time");
      return null;
    }
    console.log("Subscribing to", destination);
    const subId = id || `sub-${Date.now()}`;
    this.subscriptions[subId] = this.stompClient.subscribe(
      destination,
      (message) => callback(JSON.parse(message.body))
    );

    return subId;
  }
  send(destination, body, headers = {}) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("STOMP client not connected");
      return false;
    }

    this.stompClient.publish({
      destination,
      body: JSON.stringify(body),
      headers: { ...headers, "content-type": "application/json" },
    });

    return true;
  }

  unsubscribe(subscriptionId) {
    if (this.subscriptions[subscriptionId]) {
      this.subscriptions[subscriptionId].unsubscribe();
      delete this.subscriptions[subscriptionId];
    }
  }

  disconnect() {
    if (this.stompClient) {
      Object.keys(this.subscriptions).forEach((id) => this.unsubscribe(id));
      this.stompClient.deactivate();
    }
  }

  getClient() {
    return this.stompClient;
  }
}

export const webSocketService = new WebSocketService();
