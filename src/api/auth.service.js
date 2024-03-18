import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}${"login"}`, {
      email,
      password,
    })
    .then((response) => {
      const { access_token, userInfo } = response.data; 
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("usersID", userInfo.usersID);
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error while logging in:", error);
      throw error; 
    });
};


const loginGoogle = (accessToken) => {
  return axios
    .post(`${API_URL}${"login"}`, )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  // localStorage.clear(); 
};
  // Cập nhật state trong useState
  // setOrders([]); // Ví dụ: Nếu orders là state của bạn
  // setOrderdetails([]); // Ví dụ: Nếu orderdetails là state của bạn
  // setCarts([]);
  
  // Cập nhật tất cả các state khác tương tự nếu cần




const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token;
};

export default {
  register,
  login,
  isLoggedIn,
  logout,
};