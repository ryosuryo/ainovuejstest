// import {authHeader} from "../_helpers";
import http from "./axios";
import LocalStorageService from "./LocalStorageService";
export const userService = {
  login,
  logout
};
const localStorageService = LocalStorageService.getService();
function login(username, password) {
  return http.post("/auth/login", { email: username, password: password }).then(response => {
    console.log(response.data.data);
    if (response.data.data.access_token.token) {
      localStorageService.setToken(response.data.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data.data.user;
  });
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
