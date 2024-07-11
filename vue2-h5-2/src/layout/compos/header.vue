<template>
  <div class="header-wrap">
    <!-- 控制栏 -->
    <div class="header">
      <div class="left" @click="handleBack">
        <slot name="left">
          <van-icon name="arrow-left" size="23" color="white" />
        </slot>
      </div>
      <div class="center">
        <slot name="center">
          <p>{{ title }}</p>
        </slot>
      </div>
      <div class="right">
        <slot name="right">
          <p></p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  watch: {
    $route: {
      handler(to) {
        console.log("路由变化了", to.meta.title);
        this.title = to.meta.title;
      },
      immediate: true,
    },
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handleEdit() {},
  },
};
</script>

<style lang="scss" scoped>
.header-wrap {
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px 0;
  background-color: #518cfe;
  height: 80px;

  .left {
    width: 30px;
  }
  .center {
    color: #fff;
  }
  .right {
    width: 30px;
  }
}
</style>
