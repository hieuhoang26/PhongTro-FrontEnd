import http from "./http";

export const statisticApi = {
  getPostByStatus() {
    return http.get("/statistic/post-by-status");
  },

  getPostByType() {
    return http.get("/statistic/post-by-type");
  },

  getCardStatistics() {
    return http.get("/statistic/card");
  },

  getPostByDate() {
    return http.get("/statistic/post-by-date");
  },

  getRevenueByDate() {
    return http.get("/statistic/revenue-by-date");
  },
};
