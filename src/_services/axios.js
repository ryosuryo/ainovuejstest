/* eslint-disable */
import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import router from "../_router";
// LocalstorageService
const localStorageService = LocalStorageService.getService();
const baseURL = "https://private-anon-87f9034263-retailmockapp.apiary-mock.com";
const http = axios.create({
  baseURL
});
// Add a request interceptor
http.interceptors.request.use(
  config => {
    console.log(localStorageService.getAccessToken());
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
//Add a response interceptor
http.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === baseURL + "/auth/token/refresh") {
      router.push("/masuk");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return axios
        .post("/auth/token", {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
export default http;
