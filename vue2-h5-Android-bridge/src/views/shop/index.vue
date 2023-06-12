<template>
  <div id="shop-home" class="shop-home" :style="{paddingTop: statusBarHeight + 44 + 44 + 'px', paddingBottom: bottomBarHeight + 49 + 'px'}">
    <div class="header-bg">
      <img :src="`${static_domain}/${shopInfo.titlePic}`" v-if="shopInfo.titlePic">
      <div class="mask"></div>
    </div>
    <!-- 绝对定位 导航栏 -->
    <div class="nav-bar" ref="navbar" :style="{top: statusBarHeight + 'px'}">
      <div class="nav-item" @click="handleBack"><i class="icon icon-back"></i></div>
      <div class="nav-item" @click="handleShare"><i class="icon icon-share"></i></div>
    </div>

    <!-- 公共header部分 -->
    <div class="header" :style="{top: statusBarHeight + 44 + 'px'}">
      <h2 class="shop-name">{{shopInfo.title}}</h2>
      <div class="action">
        <button v-if="isCollect" class="btn" @click="handleCollect($route.params.shopId)">取消收藏</button>
        <button v-else class="btn" @click="handleCollect($route.params.shopId)">收藏店铺</button>
      </div>
    </div>

    <transition :name="transitionName">
      <keep-alive>
        <router-view class="page-main" :shopId="$route.params.shopId" :userInfo="userInfo" :static_domain="static_domain"></router-view>
      </keep-alive>
    </transition>

    <!-- 绝对定位 tabbar栏 -->
    <div class="bottom-tabbar-wrap" :style="{height: 49 + bottomBarHeight + 'px'}">
      <div class="bottom-tabbar">
        <div :class="{'tabbar-item': true, 'active': tabKey === 'home'}" @click="handleTabGo('home')">
          <i class="icon icon-shop"></i>
          <span>首页</span>
        </div>
        <div :class="{'tabbar-item': true, 'active': tabKey === 'category'}" @click="handleTabGo('category')">
          <i class="icon icon-category"></i>
          <span>商品分类</span>
        </div>
        <div class="tabbar-item" @click="handleTabGo('service')">
          <i class="icon icon-service"></i>
          <span>联系客服</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
  props: {
    static_domain: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      shopInfoUrl: 'http://ip:port/api/v1/mall/store/store/shopId',
      shopCollectListUrl:'http://ip:port/api/v1/user/favorite/store',
      shopCollectUrl: 'http://ip:port/api/v1/user/favorite/store/create',
      shopCollectDelUrl: 'http://ip:port/api/v1/user/favorite/store/shopId',
      statusBarHeight: 20,
      bottomBarHeight: 0,
      transitionName: '',
      userInfo: {
        id: null,
        token: ''
      },
      shopInfo: {},
      shopCollectList:[],
      isCollect: false,
    }
  },
  computed: {
    tabKey() {
      let tabKey = ''
      if (this.$route.path.includes('/home')) {
        tabKey = 'home'
      } else if (this.$route.path.includes('/category')) {
        tabKey = 'category'
      }
      return tabKey
    }
  },
  watch: {
    $route(to, from) {
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (from.meta.index === undefined) { return }
      if(to.meta.index > 0 && from.meta.index !== undefined){
        if( to.meta.index < from.meta.index){
          this.transitionName = 'slide-right';
        }else{
          this.transitionName = 'slide-left';
        }
      } else if(to.meta.index == 0 && from.meta.index > 0){
        this.transitionName = 'slide-right';
      }

      //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      /*if( to.meta.index < from.meta.index){
            this.transitionName = 'slide-right';
      }else{
            this.transitionName = 'slide-left';
      }*/
    },
    userInfo() {
      this.fetchShopInfo()
      this.fetchShopCollect()
    }
  },
  created() {
    this.init()
    // this.fetchShopInfo()
  },
  activated() {
    try {
      TsPhotovoltaicSDK.setStatusBarStyle({
        style: 'light'
      })
    } catch(e) {}
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
    handleBack() {
      TsPhotovoltaicSDK.goBack({
        params: {},
        callback: (res) => {}}
      )
    },
    handleShare() {
      TsPhotovoltaicSDK.shareShop({
        params: {
          shareId:this.shopInfo.id,
          sharePicture:this.shopInfo.titlePic,
          shareTitle:this.shopInfo.title,
        },
        callback: (res) => {}}
      )
    },
    handleTabGo(key) {
      if (key === 'home') {
        this.$router.push(`/shop/${this.$route.params.shopId}/home`)
      } else if (key === 'category') {
        this.$router.push(`/shop/${this.$route.params.shopId}/category`)
      } else if (key === 'service') {
        TsPhotovoltaicSDK.service({
          params: {},
          callback: (res) => {}
        })
      }
    },
    fetchShopInfo() {
      axios({
        method: 'get',
        url: this.shopInfoUrl.replace('shopId', this.$route.params.shopId),
        params: {},
        headers: {Authorization: this.userInfo.token}
      }).then(res => {
        if (res && res.data) {
          this.shopInfo = res.data.Data
        }
      }).catch(err => {
        TsPhotovoltaicSDK.toast({
          params: {message: '店铺详情err'}
        })
      })
    },
    // 获取收藏列表查找是否已被收藏
    fetchShopCollect() {
      axios({
        method: 'get',
        url: this.shopCollectListUrl,
        params: {},
        headers: {Authorization: this.userInfo.token}
      }).then(res => {
        if (res && res.data) {
          this.shopCollectList = res.data.Data.content
          const index = this.shopCollectList.findIndex(item => item.storeId.id === this.$route.params.shopId)
          if (index !== -1) {
            this.isCollect = true
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleCollect(id) {
      // 取消收藏
      if(this.isCollect) {
        axios({
          method: 'delete',
          url: this.shopCollectDelUrl.replace('shopId', this.$route.params.shopId),
          params: {},
          headers: {Authorization: this.userInfo.token}
        }).then(res => {
        TsPhotovoltaicSDK.toast({
          params: {message: "取消收藏isCollect=>false"}
        })
          this.isCollect = false
        }).catch(err => {
        TsPhotovoltaicSDK.toast({
          params: {message: "取消收藏err"}
        })
          console.log(err)
        })
      }else {
      // 收藏
        axios({
          method: 'post',
          url: this.shopCollectUrl,
          data: {
            storeId: this.$route.params.shopId,
          },
          headers: {Authorization: this.userInfo.token}
        }).then(res => {
                  TsPhotovoltaicSDK.toast({
          params: {message: "收藏isCollect=>ture"}
        })
          this.isCollect = true
        }).catch(err => {
                  TsPhotovoltaicSDK.toast({
          params: {message: "收藏err"}
        })
          console.log(err)
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
.shop-home {
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100vh);
  background: #f6f6f6;

  .header-bg {
    position: fixed;
    z-index: 0;
    left: 0;
    top: 0;
    right: 0;
    height: 173px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
    }
  }
  .nav-bar {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
  }
  .nav-item {
    color: #fff;

    i {
      font-size: 22px;
    }
  }

  .header {
    position: fixed;
    left: 0;
    right: 0;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;

    .shop-name {
      font-size: 18px;
      font-weight: normal;
      color: #fff;
    }
  }
  .page-main {
    flex: 1;
  }

  .bottom-tabbar-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;
    background: #fff;

    .bottom-tabbar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 49px;
      background: #fff;
    }
    .tabbar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #333;

      &.active {
        color: #FF2121;
      }

      i {
        font-size: 18px;
      }
      span {
        font-size: 10px;
        margin-top: 2px;
      }
    }
  }


  .action {

  }

  .btn {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    font-size: 13px;
    color: #fff;
    background: linear-gradient(270deg, #FF2121 0%, #FF4545 100%);
    border-radius: 16px;
    padding: 0 12px;
    outline: none;
    border: none;
    box-shadow: none;
  }

}
</style>
