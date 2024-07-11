import request from "@/utils/request";

const prefix = "/api/mis/v1/humanresource/department";

export default {
  fetch: (params) => {
    return request({ url: `${prefix}/`, method: "get", params });
  },
  add: (data) => {
    return request({ url: `${prefix}/add`, method: "post", data });
  },
};

// 示例:
// get请求: params
// post请求: data

// 常用字段含义:
// trash  逻辑删除
// restore  恢复逻辑删除
// remove  物理删除
