import http from "./http";

export const userApi = {
  getById(id) {
    return http.get(`user/${id}`);
  },
};
