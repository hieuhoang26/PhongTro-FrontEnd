import http from "./http";

export const userApi = {
  getById(id) {
    return http.get(`user/${id}`);
  },
  getList(page, size) {
    return http.get(`user/list?page=${page}&size=${size}`);
  },
  updateUser(userId, formData) {
    return http.put(`user/${userId}`, formData);
  },
};
