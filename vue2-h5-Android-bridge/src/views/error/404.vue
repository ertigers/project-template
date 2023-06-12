<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
    <div class="error-handle">
      <router-link to="/">
        <button class="button" type="primary" size="large">返回首页</button>
      </router-link>
      <button class="button error-btn" type="primary" size="large" @click="goBack"
        >返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>


<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 20%;
}
.error-code {
  line-height: 1;
  font-size: 80px;
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  color: #00a854;
}
.error-desc {
  font-size: 18px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
}
.button {
  height: 44px;
  text-align: center;
  color: #fff;
  background-color: #1989fa;
  border: 1px solid #1989fa;
  border-radius: 2px;
  cursor: pointer;
  padding: 0 15px;
}
.error-btn {
  margin-left: 100px;
}
</style>
