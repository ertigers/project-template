import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入Vant
import Vant from "vant";
import "vant/lib/index.css";

import moment from "moment"; //导入文件
Vue.filter('formatDate', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})

import validator from "@/utils/validator";

import "@/icons"; // icon

import "@/style/index.scss";

Vue.use(Vant);
Vue.prototype.$moment = moment; //全局moment对象使用
Vue.prototype.$validator = validator; //全局moment对象使用

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
