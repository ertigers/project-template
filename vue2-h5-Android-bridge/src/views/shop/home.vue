<template>
  <div class="shop-home-wrap">
    <slot></slot>
    <div class="tabs">
      <div :class="{'tab-item': true, 'active': tabKey == 'default'}" @click="handleTabChange('default')">
        <span>默认</span>
      </div>
      <div :class="{'tab-item': true, 'active': tabKey == 'sales'}" @click="handleTabChange('sales')">
        <span>销量</span>
      </div>
      <div :class="{'tab-item': true, 'active': tabKey == 'new'}" @click="handleTabChange('new')">
        <span>新品</span>
      </div>
      <div :class="{'tab-item': true, 'active': tabKey == 'price'}" @click="handleTabChange('price')">
        <span>价格</span>
      </div>
    </div>
    <div class="goods-list-wrap">
      <div class="goods-list">
        <GoodsCard class="goods-item" v-for="(item, index) in goodsList" :key="index" :content="item" :static_domain="static_domain"></GoodsCard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GoodsCard from './comps/goods'

export default {
  components: {
    GoodsCard
  },
  props: {
    shopId: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => {}
    },
    static_domain: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      goodsListUrl: 'http://ip:port/api/v1/mall/goods',
      tabKey: 'default',
      goodsList: []
    }
  },
  watch: {
    userInfo() {
      this.fetchGoodsList()
    }
  },
  created() {
    this.fetchGoodsList()
  },
  methods: {
    handleTabChange(key) {
      this.tabKey = key
      this.fetchGoodsList()
    },
    fetchGoodsList() {
      axios({
        method: 'get',
        url: this.goodsListUrl,
        params: {
          storeId: this.shopId,
          // newState: this.tabKey == 'sales' ? 1 : 0,
          // hotState: this.tabKey == 'new' ? 1 : 0,
        },
        headers: {Authorization: this.userInfo.token}
      }).then(res => {
        if (res && res.data) {
          this.goodsList = res.data.Data.content
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.shop-home-wrap {
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    font-size: 16px;
    color: #fff;
    padding: 0 26px;

    .tab-item {
      position: relative;
      padding-bottom: 5px;

      &.active {

        &::after {
          display: block;
        }
      }

      &::after {
        position: absolute;
        bottom: 0;
        display: none;
        content: "";
        width: 100%;
        height: 2px;
        background: #fff;
      }
    }
  }

  .goods-list-wrap {
    position: relative;
    flex: 1;
    padding: 10px 12px 0;
    overflow-y: auto;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-right: -7px;

    .goods-item {
      width: 172px;
      height: 260px;
      margin-right: 7px;
      margin-bottom: 8px;
    }
  }
}
</style>
