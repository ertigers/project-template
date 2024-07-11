import request from "@/utils/request";

const prefix = "/api/mis/v1/auth";

export default {
  // 登录
  login: (data) => {
    return request({ url: `${prefix}`, method: "post", data });
  },
  // 退出
  logout: (data) => {
    return request({ url: `${prefix}/logout`, method: "post", data });
  },
  // 图片验证码
  get_captcha: (params) => {
    return request({ url: `${prefix}/captcha`, method: "get", params });
  },
  // 获取用户详细信息
  getInfo: (params) => {
    return request({ url: `${prefix}/getInfo`, method: "get", params });
  },
  // 获取菜单栏
  navmenus: (params) => {
    return request({ url: `/api/mis/v1/mis/navmenus`, method: "get", params });
  },
};
