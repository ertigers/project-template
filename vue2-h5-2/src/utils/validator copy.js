// import validator from "validator";

// var qx_validator = {
//   isMobile: (rule, value, callback) => {
//     if (!value && !rule.required) {
//       callback();
//       return;
//     }
//     if (validator.isMobilePhone(value.toString())) {
//       callback();
//     } else {
//       callback(new Error(rule.message));
//     }
//     return;
//   },
//   isEmpty: (rule, value, callback) => {
//     if (!value && !rule.required) {
//       callback();
//       return;
//     }
//     if (validator.isEmpty(value.toString())) {
//       callback(new Error(rule.message));
//     } else {
//       callback();
//     }
//     return;
//   },
//   // 是否是中国大陆手机号
//   isCNMobile: (rule, value, callback) => {
//     if (!value && !rule.required) {
//       callback();
//       return;
//     }
//     if (validator.isMobilePhone(value.toString(), "zh-CN")) {
//       callback();
//     } else {
//       callback(new Error(rule.message));
//     }
//     return;
//   },
// };

// export default qx_validator;
