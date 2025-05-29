import http from "./http";

const FILTER = "post/filter";

export const postApi = {
  filter(params) {
    return http.get(FILTER, { params });
  },
  createPost(formData) {
    return http.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updatePost(id, formData) {
    return http.put(`post/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPostsByStatus(userId, status, page, size, sort) {
    return http.get("post/status", {
      params: {
        userId,
        status,
        page,
        size,
        sort,
      },
    });
  },

  detail(id) {
    return http.get(`post/${id}`);
  },
  changeStatus(id, status) {
    return http.patch(`post/${id}`, status, {
      headers: { "Content-Type": "application/json" },
    });
  },
  reNewVip(postId, isVip, dateTime) {
    return http.post(`post/renew`, {
      postId,
      isVip,
      dateTime,
    });
  },

  delete(id) {
    return http.delete(`post/${id}`);
  },
  getNearby(lat, lng, typeId) {
    return http.get("post/nearby", {
      params: {
        lat,
        lng,
        typeId,
      },
    });
  },
  getLatest() {
    return http.get("post/latest");
  },
};
// postApi.filter({
//     typeId: 1,
//     minPrice: 1000000,
//     categoryIds: [1, 2],
//   });
