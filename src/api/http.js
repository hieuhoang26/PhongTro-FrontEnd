import axios from "axios";
import {
  clearSession,
  getAccessTokenFromSession,
  getRefreshTokenFromSession,
  setAccessTokenToSession,
  setProfileToSession,
  setRefreshTokenToSession,
} from "../utils/storage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { authApi } from "./auth";

const baseUrl = "http://localhost:8080/api/v1/";

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      // timeout: 10000,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    // Interceptor để đính access token
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = getAccessTokenFromSession();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor xử lý response
    this.instance.interceptors.response.use(
      (response) => {
        // Khi login thành công → lưu token
        if (response.config.url.includes("auth/login")) {
          const { accessToken, refreshToken } = response.data;
          setAccessTokenToSession(accessToken);
          setRefreshTokenToSession(refreshToken);

          // const decoded = jwtDecode(accessToken);
          // const { id, roleName } = decoded;
          // setProfileToSession({ id, role: roleName });
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const refreshToken = getRefreshTokenFromSession();

          if (!refreshToken) {
            return Promise.reject(error);
          }

          try {
            // const response = await authApi.refresh(refreshToken);
            // const { accessToken, refreshToken: newRefreshToken } =
            //   response.data;

            // setAccessTokenToSession(accessToken);
            // setRefreshTokenToSession(newRefreshToken);

            // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            clearSession();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
