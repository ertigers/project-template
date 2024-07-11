import Vue from "vue";
import VueRouter from "vue-router";
import { getUserInfo } from "@/utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    component: () => import("@/views/home/index2"),
  },
  {
    path: "/mine",
    component: () => import("@/views/mine/index"),
  },
  {
    path: "/index2",
    component: () => import("@/layout/index2"),
    children: [
      {
        path: "/statistics",
        component: () => import("@/views/statistics/index"),
        meta: { title: "统计" },
      },
      {
        path: "/checked",
        component: () => import("@/views/checked/index"),
        meta: { title: "打卡" },
      },
      {
        path: "/sign",
        component: () => import("@/views/sign/index"),
        meta: { title: "补签" },
      },
      {
        path: "/vacation",
        component: () => import("@/views/vacation/index"),
        meta: { title: "假期" },
      },
      {
        path: "/business",
        component: () => import("@/views/business/index"),
        meta: { title: "出差" },
      },
      {
        path: "/oa",
        component: () => import("@/views/oa/index"),
        meta: { title: "OA审批" },
      },
      {
        path: "/report",
        component: () => import("@/views/report/index"),
        meta: { title: "日志" },
      },
      {
        path: "/meeting",
        component: () => import("@/views/meeting/index"),
        meta: { title: "会议签到" },
      },
      {
        path: "/mine/setPassword",
        component: () => import("@/views/mine/setPassword"),
        meta: { title: "修改密码" },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("views/login/index"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let qxmis = getUserInfo();
  if (
    to.path == "/login" ||
    to.path == "/setupwizard" ||
    to.name == "qbank-paper-preview" ||
    to.path.indexOf("/public") > -1
  ) {
    next();
  } else {
    if (qxmis) {
      if (qxmis.code == 301) {
        // 密码过期,操作限制
        // next(`/public/${qxmis.epid}/edit-password`);
        next();
      } else {
        next();
      }
    } else {
      next("/login");
    }
  }
});

export default router;
