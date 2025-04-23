import http from "./http";

export const URL_CITY = "location/cities";
export const URL_DISTRICT = "location/districts";
export const URL_WARD = "location/wards";

// export const URL_LOGOUT = "auth/logout";

export const locationApi = {
  getCities() {
    return http.get(URL_CITY);
  },

  getDistricts(cityId) {
    return http.get(`${URL_DISTRICT}?cityId=${cityId}`);
  },
  getWards(districtId) {
    return http.get(`${URL_WARD}?districtId=${districtId}`);
  },
};
