<template>
  <div class="shop-goods-wrap" :style="{paddingTop: statusBarHeight + 44 + 'px'}">
    <!-- 绝对定位 导航栏 -->
    <div class="nav-bar-wrap" :style="{height: statusBarHeight + 44 + 'px'}">
      <div class="nav-bar" ref="navbar" :style="{marginTop: statusBarHeight + 'px'}">
        <div class="nav-item btn" @click="handleBack"><i class="icon icon-back"></i></div>
        <div class="nav-item title">{{categoryInfo.categoryName || '商品类目'}}</div>
        <div class="nav-item btn"></div>
      </div>
    </div>
    <div class="goods-list-wrap">
      <div class="goods-list" :style="{paddingBottom: bottomBarHeight + 'px'}">
        <GoodsCard class="goods-item" v-for="(item, index) in goodsList" :key="index" :content="item" :static_domain="static_domain">
          <template slot="info-bottom-wrap">
            <div class="info-bottom-wrap">
              <span class="price"><small>¥</small>{{item.presentPrice}}<small></small></span>
              <span class="count">{{item.salesNumber}}人付款</span>
            </div>
          </template>
        </GoodsCard>
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
    static_domain: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      goodsListUrl: 'http://ip:port/api/v1/mall/goods',
      categoryInfoUrl: 'http://ip:port/api/v1/mall/store/category/categoryId',
      statusBarHeight: 20,
      bottomBarHeight: 0,
      goodsList: [],
      categoryInfo: {},
      userInfo: {
        id: null,
        token: ''
      },
    }
  },
  watch: {
    userInfo(val) {
      this.fetchCategoryInfo()
      this.fetchGoodsList()
    }
  },
  created() {
    this.init()
    // this.fetchCategoryInfo()
    // this.fetchGoodsList()
  },
  methods: {
    init() {
      try {
        TsPhotovoltaicSDK.getUserInfo({
          params: {},
          callback: (res) => {
            this.userInfo = res
          }
        })
      } catch(e) {}
    },
    handleTabChange(key) {
      this.tabKey = key
    },
    handleBack() {
      this.$router.go(-1)
    },
    fetchCategoryInfo() {
      axios({
        method: 'get',
        url: this.categoryInfoUrl.replace('categoryId', this.$route.query.categoryId),
        params: {},
        headers: {Authorization: this.userInfo.token}
      }).then(res => {
        if (res && res.data) {
          this.categoryInfo = res.data.Data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchGoodsList() {
      axios({
        method: 'get',
        url: this.goodsListUrl,
        params: {
          storeId: this.$route.params.shopId,
          storeCategoryId: this.$route.query.categoryId
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
.shop-goods-wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  overflow: hidden;

  .nav-bar-wrap {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: #2191ff;
  }
  .nav-bar {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
  }
  .nav-item {
    color: #fff;

    &.title {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }
    &.btn {
      width: 40px;
    }

    i {
      font-size: 22px;
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
  .info-bottom-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
