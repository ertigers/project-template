/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import { Message } from "element-ui"; //引用饿了么UI消息组件
import axios from "axios"; //引用axios

// create an axios instance
const request = axios.create({
  baseURL: "http://172.22.95.1:9591",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

// request interceptor
// request.interceptors.request.use(
//   (config) => {
//     let adminToken = localStorage.getItem("admin_token");
//     if (adminToken) {
//       config.headers.Authorization = `${adminToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     // do something with request error
//     console.log(error); // for debug
//     return Promise.reject(error);
//   }
// );

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const res = response.data; //res is my own data
      if (res.code === 0) {
        return res.data;
      } else {
        Message({
          message: res.error || "Error",
          type: "error",
          duration: 2 * 1000,
        });
        if (res.code === 401) {
          location.href = `/login?redirect=${location.pathname}`;
        }
        return Promise.reject(new Error(res.error || "Error"));
      }
    } else {
      Message({
        message: "Error",
        type: "error",
        duration: 2 * 1000,
      });
      return Promise.reject(new Error("Error"));
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export { request }