import http from "./http";

export const notificationApi = {
  getUserNotifications(userId, page, size) {
    return http.get(`notification`, {
      params: { userId, page, size },
    });
  },

  markAsRead(notificationId) {
    return http.put(`notification/read`, null, {
      params: { id: notificationId },
    });
  },

  markAllRead(userId) {
    return http.put(`notification/read-all`, null, {
      params: { userId },
    });
  },
};
