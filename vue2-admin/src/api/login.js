import { request } from "./request";

const prefix = "/api/v1";

export const login = {
  login: (query) => {
    return request({
      url: `${prefix}/admin/login`,
      method: "post",
      data: query,
    });
  },
  login2: (query) => {
    return request({
      url: `${prefix}/admin/login`,
      method: "post",
      data: query,
    });
  },

};

// //登录系统
// export function login(query) {
//   return request({
//       url: "/common/auth/login",
//       method: "post",
//       data: query,
//   });
// }
// //退出系统
// export function logout(query) {
//   return request({
//       url: "/common/auth/logout",
//       method: "post",
//       data: query,
//   });
// }
