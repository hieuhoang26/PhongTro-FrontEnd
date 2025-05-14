import http from "./http";

export const paymentApi = {
  createVnPayPayment(amount, type, userId, postId = null) {
    const params = {
      amount,
      type,
      userId,
    };

    if (postId) {
      params.postId = postId;
    }

    return http.post("pay/vnpay", null, { params });
  },
  // User History
  getWallet(userId) {
    return http.get(`pay/wallet?userId=${userId}`);
  },
  getTransaction(userId) {
    return http.get(`pay/transaction?userId=${userId}`);
  },
  getOrder(userId) {
    return http.get(`pay/order?userId=${userId}`);
  },

  //   handleVnPayReturn(allParams) {
  //     return http.get("/return", { params: allParams });
  //   },
};
