// src/services/api.js

import http from "./http";

export const URL_FETCH_CONVERSATION = (userAId, userBId) =>
  `/api/messages/conversation/${userAId}/${userBId}`;

// export const URL_MARK_MESSAGE_READ = (messageId) =>
//   `/api/messages/${messageId}/read`;
export const chatApi = {
  fetchUserConversations(userId) {
    return http.get(`/chat/conversation/list?userId=${userId}`);
  },
  getOrCreateConversation(userA, userB) {
    return http.get(`/chat/conversation?userA=${userA}&userB=${userB}`);
  },

  fetchMessages(conversationId, userId) {
    return http.get(
      `/chat/messages?conversationId=${conversationId}&userId=${userId}`
    );
  },
  searchUsers(search) {
    return http.get(`/chat/search?phoneOrName=${search}`);
  },
  isUnread(userId) {
    return http.get(`/chat/unread?userId=${userId}`);
  },
};
