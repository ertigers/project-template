<template>
  <div class="layout">
    <Header />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "",
  components: {
    Header,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  min-width: 1920px;
  min-height: 960px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>