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

// // 查询人员某一段时间考勤汇总详情
// fetchDays: params => {
//   return API.GET('/api/mis/v1/attendance/statistic/days', params);
// },
// http://172.22.93.1:8080/api/mis/v1/attendance/statistic/days?begintime=1685548800&endtime=1688054400&employee_index=7&isFast=true

// // 查询人员月度汇总详情
// fetchMonthly: params => {
//   return API.GET('/api/mis/v1/attendance/statistic/monthly', params);
// },
// http://172.22.93.1:8080/api/mis/v1/attendance/statistic/monthly?month=2023-06&department_index=22&cascade=true&page=1&rows=20
