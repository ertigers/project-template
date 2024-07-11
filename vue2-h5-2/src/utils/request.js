import axios from "axios";
import { Toast } from "vant";
import router from "@/router";
import { removeUserInfo } from "@/utils/auth";
import errorCode from "./error";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    // if (config.method === 'post') {
    //   config.data = JSON.stringify(config.data)
    // }
    // if (store.getters.token) {
    //   config.headers["Authorization"] = "Bearer " + getToken();
    // }
    // config.headers["Accept-Language"] = getLanguage();
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // console.log(response);
      const res = response.data; // res is my own data
      if (res.code === 0) {
        return res;
      } else if (res.code === 8 || res.code === 4) {
        removeUserInfo();
        router.replace({ path: "/login" });
        Toast.fail("登录信息失效,请重新登录");
      } else {
        Toast.fail(errorCode.msg(res.code) || res.msg || "操作失败" || "Error");
        return Promise.reject(res || "Error");
      }
    } else {
      Toast.fail("Error");
      return Promise.reject(new Error("Error"));
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Toast({
      message: error.message,
      type: "fail",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
