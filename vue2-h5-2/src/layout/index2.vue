<template>
  <div>
    <Header> </Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./compos/header.vue";
export default {
  name: "TabBar",
  components: { Header },
  data() {
    return {};
  },
};
</script>
