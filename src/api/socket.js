// src/services/api.js

import http from "./http";

export const URL_FETCH_CONVERSATION = (userAId, userBId) =>
  `/api/messages/conversation/${userAId}/${userBId}`;

// export const URL_MARK_MESSAGE_READ = (messageId) =>
//   `/api/messages/${messageId}/read`;

export const chatApi = {
  fetchContacts(userId) {
    return http.get(`chat/contacts/${userId}`);
  },
  fetchConversation(userAId, userBId) {
    return http.get(`chat/conversation/${userAId}/${userBId}`);
  },
  //   markMessageAsRead(messageId) {
  //     return http.put(URL_MARK_MESSAGE_READ(messageId));
  //   },
};
