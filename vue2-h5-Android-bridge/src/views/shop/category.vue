<template>
  <div class="shop-category-wrap">
    <slot></slot>
    <div class="category-list-wrap">
      <div class="category-list">
        <div class="category-item" v-for="(item, index) in categoryList" :key="index" @click="handleItemGo(item)">
          <span class="line"></span>
          <p class="name">{{item.categoryName}}</p>
          <i class="icon icon-arrow-right"></i>
        </div>
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
      shopCategoryListUrl: 'http://ip:port/api/v1/mall/store/category',
      categoryList: [],
    }
  },
  watch: {
    userInfo() {
      this.fetchShopCategoryList()
    }
  },
  created() {
    this.fetchShopCategoryList()
  },
  methods: {
    handleItemGo(category) {
      this.$router.push(`/shop/${this.shopId}/goods?categoryId=${category.id}`)
    },
    fetchShopCategoryList() {
      axios({
        method: 'get',
        url: this.shopCategoryListUrl,
        params: {
          storeId: this.shopId,
          // newState: this.tabKey == 'sales' ? 1 : 0,
          // hotState: this.tabKey == 'new' ? 1 : 0,
        },
        headers: {Authorization: this.userInfo.token}
      }).then(res => {
        if (res && res.data) {
          this.categoryList = res.data.Data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.shop-category-wrap {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 10px;

  .category-list-wrap {
    position: relative;
    flex: 1;
  }
  .category-list {
    padding: 0 12px;
  }
  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    background: #fff;
    padding: 0 12px;
    border-radius: 8px;

    & + .category-item {
      margin-top: 8px;
    }

    .name {
      flex: 1;
      font-size: 14px;
      font-weight: bold;
      margin-left: 6px;
    }
    .line {
      width: 2px;
      height: 14px;
      background: #f00;
    }
    .icon {
      font-size: 10px;
    }
  }
}
</style>
