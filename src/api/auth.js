import http from "./http";

export const URL_LOGIN = "auth/login";
export const URL_REGISTER = "auth/register";

export const URL_REFRESH = "auth/refresh";
export const URL_FORGOT = "auth/forgot-password";
// export const URL_LOGOUT = "auth/logout";

export const authApi = {
  registerAccount(body) {
    return http.post(URL_REGISTER, body);
  },
  login(body) {
    return http.post(URL_LOGIN, body);
  },
  forgot(email) {
    return http.post(`${URL_FORGOT}`, {
      email: email,
    });
  },
};
