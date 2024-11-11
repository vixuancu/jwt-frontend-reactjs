import axios from "axios";
const registerNewUser = (email, phone, username, password) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/v1/register`, {
    email,
    phone,
    username,
    password,
  });
};
const loginUser = (valueLogin, password) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login`, {
    valueLogin,
    password,
  });
};
export { registerNewUser, loginUser };
