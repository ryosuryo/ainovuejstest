// import {authHeader} from "../_helpers";
import http from "./axios";
export const userService = {
  login,
  logout
};
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
export default LSService;
const LocalSService = LSService.getService();
function login(username, password) {
  return http.post("/auth/login", { email: username, password: password }).then(response => {
    console.log(response.data.data);
    if (response.data.data.access_token.token) {
      LocalSService.setToken(response.data.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data.data.user;
  });
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
