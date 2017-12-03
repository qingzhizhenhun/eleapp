<template>
<div class="shopcart">
  <div class="content" @click="toggleList">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{highlight:totalCount>0}">
          <span class="icon-shopping-cart" :class="{highlight:totalCount>0}">车</span>
        </div>
        <div class="num" v-show="totalCount">{{totalCount}}</div>
      </div>
      <div class="price">¥{{totalPrice}}</div>
      <div class="des">另需配送费{{deliveryPrice}}元</div>
    </div>
    <div class="content-right" :class="{enough:payDes === '去结算'}">
      <div class="pay">{{payDes}}</div>
    </div>
  </div>
  <div class="shopcart-list" v-show="listShow">
    <div class="list-header">
      <h1 class="title">购物车</h1>
      <span class="empty" @click="empty">清空</span>
    </div>
    <div class="list-content" ref="listContent">
      <ul>
        <li class="food" v-for="food in selectFoods">
          <span class="name">{{food.name}}</span>
          <div class="price">
            <span>¥{{food.price*food.count}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        fold:true
      }
    },
    computed:{
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDes() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if(show){
        this.$nextTick(() => {
          this._initScroll();
        })
      }
      return show;
    }
  },
    methods:{
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty(){
        this.selectFoods.forEach((food) =>{
          food.count = 0;
        })
      },
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.listContent,{
        })
      }
    },
  components:{
    cartcontrol
  }
}
</script>

<style lang="less" type="text/less">
.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  background: #141d27;
  .content{
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, .4);
    .content-left{
      flex:1;
      .logo-wrapper{
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 18px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          text-align:center;
        &.highlight{
          background: rgb(0,160,220);
         }
          .icon-shopping-cart{
            font-size: 24px;
            color:#80858a;
            line-height: 44px;
            &.highlight{
              color: #fff;
             }
          }
        }
        .num{
          position: absolute;
          top:0;
          right:0;
          width:24px;
          height: 16px;
          border-radius: 50%;
          text-align: center;
          font-size: 9px;
          line-height: 16px;
          font-weight: 700;
          background: red;
          color:#fff;
        }
      }
      .price{
        vertical-align: top;
        display: inline-block;
        line-height: 24px;
        margin-top: 12px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, .1);
        font-size: 16px;
        font-weight: 700;
        color:#fff;
      }
      .des{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color:#fff;
      }
    }
    .content-right{
      flex:0 0 150px;
      width: 150px;
      background: #2b333b;
      .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
      }
      &.enough{
        color:#fff;
        background: forestgreen;
       }
    }
  }
.shopcart-list {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  transform: translate3d(0, -100%, 0);
&.fold-enter-active, &.fold-leave-active {
                        transition: all .5s;
                      }
&.fold-enter, &.fold-leave-active {
                 transform: translate3d(0, 0, 0);
               }
.list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, .1);
.title {
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.empty {
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220);
}
}
.list-content {
  padding: 0 18px;
  max-height: 217px;
  background: #fff;
  overflow: hidden;
.food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
@include border-1px(rgba(7, 17, 27, .1));
.name {
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.price {
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-weight: 700;
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.cartcontrol-wrapper {
  position: absolute;
  bottom: 6px;
  right: 0;
}
}
}
}
}
</style>
