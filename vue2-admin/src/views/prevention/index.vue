<template>
  <div class="container">
    <div class="container-left"></div>
    <div class="container-center"></div>
    <div class="container-right"></div>
  </div>
</template>

<script>

export default {
  name: "",
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
.container-left {
  flex: 1;
  border: 1px solid red;
}
.container-center {
  flex: 1;
  border: 1px solid red;
}
.container-right {
  flex: 1;
  border: 1px solid red;
}
</style>