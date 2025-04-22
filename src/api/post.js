import http from "./http";

const FILTER = "post/filter";

export const postApi = {
  filter(params) {
    return http.get(FILTER, { params });
  },
  detail(id) {
    return http.get(`post/${id}`);
  },
};
// postApi.filter({
//     typeId: 1,
//     minPrice: 1000000,
//     categoryIds: [1, 2],
//   });
