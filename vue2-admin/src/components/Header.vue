<template>
  <header class="header-wrapper">
    <ol>
      <li>
        <router-link to="/home" active-class="selected">首页</router-link>
      </li>
      <li>
        <router-link to="/prevention" active-class="selected">防疫溯源</router-link>
      </li> 
    </ol>
  </header>
</template>

<script >
export default {
  name: "Nav",
};
</script>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  color: #FFFFFF;
  background-color: #545C64;
  ol {
    display: flex;
    justify-content: space-around;
  }
  a {
    display: block;
    height: 60px;
    line-height: 60px;
  }
  li:hover {
    background-color: #434A50;
  }
  .selected {
    color: yellow;
  }
}
</style>
