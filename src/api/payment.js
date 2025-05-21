import http from "./http";

export const paymentApi = {
  createVnPayPayment(
    amount,
    type,
    userId,
    postId = null,
    isVip = null,
    dateTime = null
  ) {
    const params = {
      amount,
      type,
      userId,
    };

    if (postId) {
      params.postId = postId;
    }
    if (isVip) {
      params.isVip = isVip;
    }
    if (dateTime) {
      params.dateTime = dateTime;
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

  // payWithWallet(amount, userId, postId) {
  //   const data = {
  //     amount,
  //     userId,
  //     postId,
  //   };
  //   return http.post("pay/pay-by-wallet", data);
  // },
  payWithWallet(data) {
    return http.post("pay/pay-by-wallet", data);
  },
};
