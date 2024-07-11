<template>
  <div class="statistics-container">
    <!-- 头部标签栏 -->
      <van-tabs>
        <van-tab title="月度汇总" name="a">
          <gather></gather>
        </van-tab>
        <van-tab title="加班统计">
          加班统计
        </van-tab>
        <van-tab title="迟到早退"></van-tab>
      </van-tabs>
  </div>
</template>

<script>

import gather from "./gather.vue"

export default {
  name: "",
  data() {
    return {
      activeName:"a"
    }
  },
  components:{
    gather
  }
}
</script>

<style lang="scss" scoped>
.statistics-container{
    overflow: scroll;
    ::v-deep .van-tab {
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: rgba(0,0,0,0.5);
    }
    ::v-deep .van-tab--active {
        font-size: 16px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #000000;
    }
    ::v-deep .van-tabs__line {
      width: 36px;
      height: 4px;
      background: #3E73FE;
      border-radius: 2px 2px 2px 2px;
    }
}

</style>
