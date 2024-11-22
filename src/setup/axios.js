import axios from "axios";
import { toast } from "react-toastify";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.defaults.withCredentials = true;
// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent-Làm gì đó trước khi yêu cầu được gửi đi
    return config;
  },
  function (error) {
    // Do something with request error-Làm gì đó với lỗi yêu cầu
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    //Bất kỳ mã trạng thái nào nằm trong phạm vi 2xx đều khiến chức năng này được kích hoạt
    // Do something with response data
    return response.data;
  },
  function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (err && err.response && err.response.status) || 500;
    console.log("err.response", err.response);
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized the user. please Login");
        // window.location.href='./login'
        return Promise.reject(err);
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error(`You don't permission to access this resource...`);
        return Promise.reject(err);
        //return err.response.data.DT  dùng promise.reject phải có try catch ở phần call API ko lỗi báo màn hình
      }

      // bad request
      case 400: {
        return Promise.reject(err);
      }

      // not found
      case 404: {
        return Promise.reject(err);
      }

      // conflict
      case 409: {
        return Promise.reject(err);
      }

      // unprocessable
      case 422: {
        return Promise.reject(err);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(err);
      }
    }
  }
);
export default instance;
