<template>
  <div class="goods-card" @click="handleItemGo">
    <div class="img-wrap">
      <img :src="`${static_domain}/${content.goodsPic}`">
    </div>
    <slot name="info-wrap">
      <div class="info-wrap">
        <p class="title">{{content.goodsName}}</p>
        <slot name="info-bottom-wrap">
          <div class="bottom-box">
            <div class="left">
              <span class="price"><small>¥</small>{{content.presentPrice}}<small></small></span>
              <span class="count">销量 {{content.salesNumber}}</span>
            </div>
            <i class="icon icon-dian"></i>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    static_domain: {
      type: String,
      default: ''
    },
    content: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleItemGo() {
      TsPhotovoltaicSDK.open({
        params: {id: this.content.id},
        callback: (res) => {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;

  .img-wrap {
    height: 67%;

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  .info-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    padding: 8px 11px 8px;
  }

  .bottom-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .title {
    line-height: 17px;
    font-size: 13px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    font-size: 18px;
    color: #ff2121;

    small {
      font-size: 13px;
    }
  }
  .count {
    font-size: 11px;
    color: #333;
    margin-left: 6px;
  }
}
</style>
