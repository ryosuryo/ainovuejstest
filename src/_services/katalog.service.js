// import {authHeader} from "../_helpers";
import http from "./axios";
export const katalogService = {
  getListCategory,
  getProductByID
};
function getListCategory(merchant = 2, outletId = 1) {
  return http.get("/merchant/" + merchant + "/outlet/" + outletId + "/category").then(response => {
    console.log(response.data.data);
    return response.data.data;
  });
}
function getProductByID(categoryId, page, limit, merchant = 2, outletId = 1) {
  return http
    .get(
      "/merchant/" +
        merchant +
        "/outlet/" +
        outletId +
        "/category/" +
        categoryId +
        "/product?page=" +
        page +
        "&limit=" +
        limit +
        "&active=true"
    )
    .then(response => {
      console.log(response.data.data);
      return response.data.data;
    });
}
