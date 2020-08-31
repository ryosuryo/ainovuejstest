/* eslint-disable */
import axios from "axios";
import router from "../_router";

const LSService = (function() {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    console.log(tokenObj);
    localStorage.setItem("access_token", tokenObj.token);
    localStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken
  };
})();
// LSService
const LocalSService = LSService.getService();
const baseURL = "https://private-anon-87f9034263-retailmockapp.apiary-mock.com";
const http = axios.create({
  baseURL
});
// Add a request interceptor
http.interceptors.request.use(
  config => {
    console.log(LocalSService.getAccessToken());
    const token = LocalSService.getAccessToken();
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
      const refreshToken = LocalSService.getRefreshToken();
      return axios
        .post("/auth/token", {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            LocalSService.setToken(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + LocalSService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
export default http;
