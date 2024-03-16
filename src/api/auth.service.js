import axios from "axios";

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
      // if (token) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("usersID", userInfo.usersID);
        // console.log("UserID:", userInfo.usersID); // Thêm console log ở đây

      }
      return response.data;
    })
   
    .catch((error) => {
      console.error("Error while logging in:", error);
      throw error; // Rethrow the error to handle it in the caller
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
  localStorage.removeItem("user");
};

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