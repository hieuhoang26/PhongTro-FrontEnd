import { size } from "lodash";
import http from "./http";

export const verifyApi = {
  verify(formData) {
    return http.post("verify", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  changeStatus(id, status) {
    return http.patch(`verify?id=${id}&status=${status}`);
  },
  getList(status, page, size) {
    return http.get("verify/list", {
      params: {
        status,
        page,
        size,
      },
    });
  },
};
