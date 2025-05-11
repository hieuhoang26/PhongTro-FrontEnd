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

  //   handleVnPayReturn(allParams) {
  //     return http.get("/return", { params: allParams });
  //   },
};
