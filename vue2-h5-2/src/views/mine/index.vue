<template>
  <div class="home-container">
    <!-- 顶部-信号栏区域-刘海顶部 -->
    <div class="sys-header"></div>
    <div>
      <div class="label-item">
        <span>姓名</span>
        <span>{{ employeeInfo.name }}</span>
      </div>
      <div class="label-item">
        <span>性别</span>
        <span>{{ employeeInfo.gender ? "男" : "女" }}</span>
      </div>
      <div class="label-item">
        <span>手机</span>
        <span>{{ employeeInfo.mobile }}</span>
      </div>
      <div class="label-item">
        <span>邮箱</span>
        <span>{{ employeeInfo.email }}</span>
      </div>
      <div class="label-item">
        <span>所属部门</span>
        <span>{{ employeeInfo.department_name }}</span>
      </div>
      <div class="label-item">
        <span>职位</span>
        <span>{{ employeeInfo.department_title }}</span>
      </div>
      <div class="label-item">
        <span>工号</span>
        <span>{{ employeeInfo.attendanceid }}</span>
      </div>
      <div class="label-item">
        <span>入职日期</span>
        <span>{{
          employeeInfo.entrytime ? employeeInfo.entrytime.substring(0, 10) : ""
        }}</span>
      </div>
      <div class="label-item" @click="handleEditPassword">
        <span>修改密码</span>
        <van-icon name="arrow" />
      </div>
      <div class="btn-wrap" @click="handleLogout">
        <van-button type="danger" style="width: 200px">退出登录</van-button>
      </div>
    </div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "@/layout/index.vue";
import auth from "@/api/auth";
import { getUserInfo, removeUserInfo } from "@/utils/auth";

export default {
  name: "",
  components: { Layout },
  data() {
    return {
      employeeInfo: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.employeeInfo = getUserInfo();
  },
  methods: {
    handleEditPassword() {
      this.$router.push({ path: "/mine/setPassword" });
    },
    handleLogout() {
      auth.logout().then((res) => {
        console.log(res);
        removeUserInfo();
        this.$router.replace({ path: "/login" }, () => {
          this.$toast.success("已退出登录!");
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.home-container {
  padding: 10px 10px 0px;
  .label-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 10px;
    border-bottom: 1px solid rgb(234, 234, 234);
    span:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }
    span:nth-child(2) {
      font-size: 16px;
      color: rgb(165, 165, 165);
    }
  }
  .btn-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
  }
}
</style>
