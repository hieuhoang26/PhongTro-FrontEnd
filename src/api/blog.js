import http from "./http";

export const blogApi = {
  getList() {
    return http.get("blog");
  },

  getDetail(slug) {
    return http.get(`blog/${slug}`);
  },
};
