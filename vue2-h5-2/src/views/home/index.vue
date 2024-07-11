<template>
  <div class="home-container">
    <!-- 顶部-信号栏区域-刘海顶部 -->
    <div class="sys-header"></div>
    <!-- logo -->
    <div class="logo"></div>
    <!-- 放置功能模块区域 -->
    <h4>考勤</h4>
    <div class="app-wrap">
      <div
        class="app"
        v-for="(app, index) in appList"
        :key="index"
        @click="go(app.route)"
      >
        <img :src="app.icon" alt="" />
        <div>{{ app.name }}</div>
      </div>
    </div>
    <h4>综合</h4>
    <div class="app-wrap">
      <div
        class="app"
        v-for="(app, index) in appList2"
        :key="index"
        @click="go(app.route)"
      >
        <img :src="app.icon" alt="" />
        <div>{{ app.name }}</div>
      </div>
    </div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "@/layout/index.vue";
export default {
  name: "",
  components: { Layout },
  data() {
    return {
      appList: [
        {
          name: "统计",
          route: "/statistics",
          icon: require("@/assets/icons/statistics.png"),
        },
        {
          name: "打卡",
          route: "/checked",
          icon: require("@/assets/icons/checked.png"),
        },
        {
          name: "补签",
          route: "/sign",
          icon: require("@/assets/icons/sign.png"),
        },
        {
          name: "假期",
          route: "/vacation",
          icon: require("@/assets/icons/vacation.png"),
        },
        {
          name: "出差",
          route: "/business",
          icon: require("@/assets/icons/business.png"),
        },
      ],
      appList2: [
        {
          name: "会议签到",
          route: "/meeting",
          icon: require("@/assets/icons/meeting.png"),
        },
        {
          name: "OA审批",
          route: "/oa",
          icon: require("@/assets/icons/oa.png"),
        },
        {
          name: "日志",
          route: "/report",
          icon: require("@/assets/icons/report.png"),
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    go(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped lang="scss">
.home-container {
  padding: 10px 10px 0px;
  h4 {
    padding-bottom: 10px;
    margin-top: 40px;
    border-bottom: 1px solid;
    border-image: linear-gradient(
        90deg,
        rgba(252, 134, 57, 1) 0%,
        rgba(252, 134, 57, 0.18110994397759106) 61%,
        rgba(252, 134, 57, 0.08867296918767509) 100%
      )
      2 2 2 2;
  }
}
.logo {
  width: 100%;
  height: 200px;
  background-image: url("~@/assets/home-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
}
.app-wrap {
  display: grid;
  grid-gap: 20px 20px;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 80px);

  .app {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
    > div {
      margin-top: 6px;
    }
  }
}
</style>
