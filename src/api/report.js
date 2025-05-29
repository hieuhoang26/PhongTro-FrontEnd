import { size } from "lodash";
import http from "./http";

export const reportApi = {
  report(data) {
    return http.post("report", data);
  },
  getList() {
    return http.get("report/admin");
  },
};
