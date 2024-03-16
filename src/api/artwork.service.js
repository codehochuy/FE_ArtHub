import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service"; // Import AuthService để sử dụng hàm isLoggedIn


const API_URL = "http://localhost:8080/api/v1/user/";
// const getArtWork = () => {
//   return axios.get(API_URL + "creator/getallArtWork", { headers: authHeader()});
// };

// const getArtWork = () => {
//   // if (authHeader()) {
//     const user = JSON.parse(localStorage.getItem('user'));
//     // if (AuthService.isLoggedIn()) {
//       if (user && user.token) {
//     return axios.get(API_URL + "creator/getallArtWork", { headers: authHeader() });
//   } else {
//     // Nếu người dùng chưa đăng nhập, bạn có thể xử lý ở đây, ví dụ: chuyển hướng đến trang đăng nhập
//     return Promise.reject("User not logged in"); 
//   }
// };
const getArtWork = () => {
  return axios.get(API_URL + "getAllArtWork", { headers: authHeader() });
};

// const getProductById = (id) => {
//   return axios.get(`${API_URL}home/getProductById/${id}`);
// };
// const postProduct = (values) => {
//   return axios.post(API_URL + "product/createProduct", values, { headers: authHeader() });
// };
// const putProduct = (id,values) => {
//   return axios.put(`${API_URL}product/updateProduct/${id}`, values, {
//     headers: authHeader(),
//   });
// };
// const deleteProduct = (id) => {
//   return axios.delete(`${API_URL}product/deleteProduct/${id}`, { headers: authHeader() });
// };
export default {
  // postProduct,
  getArtWork,
  // deleteProduct,
  // getProductById,
  // putProduct,
};
