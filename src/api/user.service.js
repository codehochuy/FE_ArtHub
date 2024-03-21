// import axios from "axios";
import axios from 'axios';
import authHeader from "./auth-header";

const AUTH_URL = "http://localhost:8080/api/v1/auth/";
const API_URL = "http://localhost:8080/api/v1/user/";
const CREATOR_URL = "http://localhost:8080/api/v1/creator/";
const ADMIN_URL = "http://localhost:8080/api/v1/admin/";
const userId = localStorage.getItem("usersID");

const addToCart = (data) => {
  return axios.post(API_URL + "addToCart",  data , { headers: authHeader() })
};
const getCart = () => {
  return axios.get(API_URL + "view-cart/" + userId, { headers: authHeader() })
};
const createOrder = (data) => {
  return axios.post(API_URL + "createOrder",  data , { headers: authHeader() })
};
const createOrderDetail = (data) => {
  return axios.post(API_URL + "createOrderDetail" , data, { headers: authHeader() })
};
const remove_from_cart = (cartId) => {
  return axios.delete(API_URL + "remove-from-cart/" + cartId, { headers: authHeader() });
};
const viewOrder = (audienceId) => {
  return axios.get(API_URL + "order/" + audienceId, { headers: authHeader() });
};
const createLike = (data) => {
  return axios.post(API_URL + "Like",  data , { headers: authHeader() })
};
const getComment = (artworkId) => {
  return axios.get(API_URL + "comments/artwork/"  + artworkId ,   { headers: authHeader() });
};
const viewOrderDetail = (orderId) => {
  return axios.get(API_URL + "orderDetail/" + orderId, { headers: authHeader() })
};
const createArtWork = (data) => {
  return axios.post(CREATOR_URL + "create", data,   { headers: authHeader() });
};
const getArtWork = (creatorId) => {
  return axios.get(CREATOR_URL +"artworks/"  + creatorId ,   { headers: authHeader() });
};
const deleteArtWork = (artworkid) => {
  return axios.delete(CREATOR_URL + artworkid , { headers: authHeader() });
};
const updateArtWork = (artworkId, data) => {
  return axios.put(`${CREATOR_URL}updateArtwork/${artworkId}`, data, { headers: authHeader() });
};
const top_up = (userId, data) => {
  return axios.put(`${API_URL}${userId}/balance`, data, { headers: authHeader() });
};
const getUser = () => {
  return axios.get(ADMIN_URL + "allUser"  ,   { headers: authHeader() });
};
const banUser = (id) => {
  return axios.put(ADMIN_URL + "banUser/" + id, null, { headers: authHeader() });
};
const unbanUser = (id) => {
  return axios.put(ADMIN_URL + "unbanUser/" + id, null, { headers: authHeader() });
};
const getBalance = (id) => {
  return axios.get(API_URL + "userinfo/" + id, { headers: authHeader() });
};
const sendMail = (orderId) => {
  return axios.post(`${AUTH_URL}sendArtworkInfo/${orderId}`, null, { headers: authHeader() });
};
// const historyOrder = (orderId) => {
//   return axios.get(`${CREATOR_URL}history/${orderId}`, null ,null , { headers: authHeader() });
// };
const historyOrder = (userid) => {
  return axios.get(`${CREATOR_URL}history/${userid}`, {
    headers: authHeader()
  });
};





export default {
  addToCart,
  getCart,
 viewOrder,
 viewOrderDetail,
  createOrder,
  createOrderDetail,
  remove_from_cart,
  createLike,
  createArtWork,
  getArtWork,
  deleteArtWork,
  updateArtWork,
  top_up,
  getComment,
  getUser,
  banUser,
  unbanUser,
  getBalance,
  sendMail,
  historyOrder,
};