<template>
  <div class="home-container">
    <!-- 顶部-信号栏区域-刘海顶部 -->
    <div class="sys-header"></div>
    <h2>清新互联</h2>
    <!-- 用户头像和信息 -->
    <div class="auth-header">
      <van-image
        round
        width="58px"
        height="58px"
        :src="require('@/assets/icon/test.png')"
      />
      <span>{{ employeeInfo.name }} ({{ employeeInfo.department_title }})</span>
    </div>
   
    <!-- 应到天数和实到天数 -->
    <div class="statistics">
      <div class="days">
      <span>日</span>
      <h6>本月应到</h6>
      </div>
      <div class="line"></div>
      <div class="days">
      <span>日</span>
      <h6>本月实到</h6>
      </div>
    </div>
    <!-- 放置功能模块区域 -->
    <h4>考勤</h4>
    <div class="app-wrap">
      <div
        class="app"
        v-for="(app, index) in appList"
        :key="index"
        @click="go(app.route)"
      >
        <!-- <img :src="app.icon" alt="" /> -->
        <svg-icon :icon-class="app.icon" />
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
        <!-- <img :src="app.icon" alt="" /> -->
        <svg-icon :icon-class="app.icon" />
        <div>{{ app.name }}</div>
      </div>
    </div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "@/layout/index.vue";
import { getUserInfo } from "@/utils/auth";

export default {
  name: "",
  components: { Layout },
  data() {
    return {
      employeeInfo: {},
      appList: [
        {
          name: "统计",
          route: "/statistics",
          icon:"statistics"
          // icon: require("@/icons/svg/statistics.svg"),
        },
        {
          name: "打卡",
          route: "/checked",
          icon:"checked"
          // icon: require("@/icons/svg/checked.svg"),
        },
        {
          name: "补签",
          route: "/sign",
          icon:"sign"
          // icon: require("@/icons/svg/sign.svg"),
        },
        {
          name: "假期",
          route: "/vacation",
          icon:"vacation"
          // icon: require("@/icons/svg/vacation.svg"),
        },
        {
          name: "出差",
          route: "/business",
          icon:"business"
          // icon: require("@/icons/svg/business.svg"),
        },
      ],
      appList2: [
        {
          name: "会议签到",
          route: "/meeting",
          icon:"meeting"
          // icon: require("@/icons/svg/meeting.svg"),
        },
        {
          name: "OA审批",
          route: "/oa",
          icon:"oa"
          // icon: require("@/icons/svg/oa.svg"),
        },
        {
          name: "日志",
          route: "/report",
          icon:"report"
          // icon: require("@/icons/svg/report.svg"),
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
        this.employeeInfo = getUserInfo();
  },
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
    margin: 0;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    // padding-bottom: 10px;
    margin-top: 25px;
    margin-left: 5px;
  }
  h2{
    margin: 0 0 10px 0;
    font-size: 20px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    text-align: center;
  }
  .auth-header{
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-bottom: 20px;
    span{
      margin-left: 21px;
      font-size: 15px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
    }
  }
  .statistics{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 5px;
  width: 335px;
  height: 132px;
  background: linear-gradient(281deg, #FFFFFF 0%, #EFF5FF 98%);
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.09);
  border-radius: 10px 10px 10px 10px;
  border: 2px solid;
  border-image: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 2 2;
  .days{
    span{
      margin: 0 0 0 48px;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #00429D;
    }
    h6{
      margin: 17px 0 0 0 ;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #00429D;
    }
  }
  .line{
    width: 1px;
    height: 76px;
    background: linear-gradient(184deg, rgba(184,221,255,0) 0%, #94CBFF 47%, rgba(162,209,252,0) 100%);
    border-radius: 0px 0px 0px 0px;
  }
}
}

.app-wrap {
  display: grid;
  grid-gap: 15px 5px;
  margin:  0px 28px 0px 28px;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 80px);

  .app {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .svg-icon {
      width: 30px;
      height: 30px;
    }
    > div {
      margin-top: 6px;
      font-size: 12px;
    }
  }
}
</style>
