<template>
  <div>
    <van-tabbar v-model="active" route fixed>
      <van-tabbar-item icon="home-o" name="home" to="/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="contact" name="mine" to="/mine"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      active: "home",
    };
  },
  methods: {},
};
</script>
