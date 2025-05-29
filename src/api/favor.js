import http from "./http";

export const favorApi = {
  likePost(postId, userId) {
    return http.post(`/favor?postId=${postId}&userId=${userId}`);
  },
  unLikePost(postId, userId) {
    return http.delete(`/favor?postId=${postId}&userId=${userId}`);
  },
  isLiked(postId, userId) {
    return http.get(`/favor/like?postId=${postId}&userId=${userId}`);
  },

  getListLike(userId) {
    return http.get(`/favor?userId=${userId}`);
  },
};
