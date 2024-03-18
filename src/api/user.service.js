import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/user/";
const CREATOR_URL = "http://localhost:8080/api/v1/creator/";
const userId = localStorage.getItem("usersID");

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

const addToCart = (data) => {
  // console.log("Values:", artworkId);
  // console.log("data:", data);
  // console.log("Values:", userId);
  return axios.post(API_URL + "addToCart",  data , { headers: authHeader() })
 
    // .then((response) => {
    //   console.log("API Response:", response.data); 
    //   return response.data; 
    // })
    // .catch((error) => {
    //   console.error("Error while adding to cart:", error);
    //   throw error; 
    // });
};

const getCart = () => {
  return axios.get(API_URL + "view-cart/" + userId, { headers: authHeader() })
    // .then((response) => {
    //   console.log("Cart data:", response.data);
    //   return response.data;
    // })
    // .catch((error) => {
    //   console.error("Error fetching cart data:", error);
    //   throw error;
    // });
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
const getComment = () => {
  return axios.get(API_URL + "getallComment" , { headers: authHeader() })
};
const viewOrderDetail = (orderId) => {
  return axios.get(API_URL + "orderDetail/" + orderId, { headers: authHeader() })
};
const createArtWork = (formData) => {
  return axios.post(CREATOR_URL + "create2", formData , { headers: authHeader() });
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
  getComment,
  createArtWork,
};




// const addToWishlist = (values) => {
//   return axios.put(
//     "http://localhost:8000/api/v1/product/wishlist",
//     values,
//     { headers: authHeader() }
//   );
// };




// const deleteCart = (id) => {
//   return axios.delete(API_URL + `cart/${id}`, { headers: authHeader() });
// };
// const getWishlist = () => {
//   return axios.get(API_URL + "wishlist", { headers: authHeader() });
// };
// const applyCoupon = (values) => {
//   return axios.post(API_URL + "cart/applycoupon", values, {
//     headers: authHeader(),
//   });
// };
// const postOrder = (values) => {
//   return axios.post(API_URL + "cart/cash-order", values, {
//     headers: authHeader(),
//   });
// };
// const emptyCart = () => {
//   return axios.delete(API_URL + "empty-cart", {
//     headers: authHeader(),
//   });
// };
// const updateCart = () => {
//   return axios.get(API_URL + "updatecart", { headers: authHeader() });
// };

  // getPublicContent,
  // getUserBoard,
  // getModeratorBoard,
  // getAdminBoard,
  
  // getWishlist,
  // addToWishlist,
  // deleteCart,
  // applyCoupon,
  // postOrder,
  // emptyCart,

  // updateCart,
