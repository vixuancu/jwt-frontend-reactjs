import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

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
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
