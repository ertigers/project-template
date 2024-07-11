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

// export default {
//   fetch: params => {
//     return API.GET('/api/mis/v1/humanresource/department/', params);
//   },
//   add: params => {
//     return API.POST('/api/mis/v1/humanresource/department/add', params);
//   },
//   set: params => {
//     return API.POST('/api/mis/v1/humanresource/department/set', params);
//   },
//   trash: params => {
//     return API.POST('/api/mis/v1/humanresource/department/trash', params);
//   },
//   restore: params => {
//     return API.POST('/api/mis/v1/humanresource/department/restore', params);
//   },
//   remove: params => {
//     return API.POST('/api/mis/v1/humanresource/department/remove', params);
//   },
//   check: params => {
//     return API.POST('/api/mis/v1/humanresource/department/check', params);
//   },
//   fetchTitle: params => {
//     return API.GET('/api/mis/v1/humanresource/department/title', params);
//   },
//   fetchTitleByNested: params => {
//     return API.GET('/api/mis/v1/humanresource/department/title/nested', params);
//   },
//   checkTitle: params => {
//     return API.POST('/api/mis/v1/humanresource/department/title/check', params);
//   },
//   addTitle: params => {
//     return API.POST('/api/mis/v1/humanresource/department/title/add', params);
//   },
//   setTitle: params => {
//     return API.POST('/api/mis/v1/humanresource/department/title/set', params);
//   },
//   trashTitle: params => {
//     return API.POST('/api/mis/v1/humanresource/department/title/trash', params);
//   }
// };
