<template>
  <div class="food" v-show="showFlag" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" alt="">
        <div class="back" @click="back">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="food-content">
        <h1 class="title">{{food.name}}</h1>
        <div class="food-detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="food-price">
          <span class="now">¥{{food.price}}</span>
          <span v-show="food.oldPrice" class="old">原价{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click="addFirst(food)" class="buy" v-show="!food.count||food.count == 0">加入购物车</div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商品信息</h1>
        <p class="info-text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :onlyContent="onlyContent" :selectType="selectType" :desc="desc"
        :ratings="food.ratings" v-on:changeColor="childChange" v-on:toggleColor="changeColor"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-for='rating in food.ratings' class="rating-item" v-show="needShow(rating.rateType, rating.text)">
              <div class="user">
                <span class="username">{{rating.name}}</span>
                <img :src="rating.avatar" alt="" width="12" height="12">
              </div>
              <div class="time">{{ rating.rateTime}}</div>
              <p class="rating-text">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}">{{rating.text}}</span>
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings ||!food.ratings.lenght">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import Vue from 'Vue'
  import ratingselect from "../ratingselect/ratingselect"
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
  props:{
    food:{
      type:Object
    }
  },
  data(){
    return {
      showFlag:false,
      selectType:ALL,
      onlyContent:false,
      desc:{
        all:"全部",
        positive:"推荐",
        negative:"吐槽"
      }
    }
  },
  created(){
  },
  methods:{
    show(){
      this.onlyContent = false;
      this.selectType = ALL;
      //保证初始化
      this.showFlag = true;
      this.$nextTick(() =>{
        if(!this.scroll){
          this.scroll = new BScroll((this.$refs.food),{
            click:true
          })
        }else{
          this.scroll.refresh();
        }
      })
    },
    back(){
      this.showFlag = false;
    },
    addFirst(food){
      Vue.set(food,"count",1);
    },
    childChange(type){
      this.selectType = type;
    },
    //接收子组件的广播传入的数据,并改变selectType
    changeColor(blue){
      this.onlyContent = blue;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
    components:{
      cartcontrol,
      split,
      ratingselect
    }
}
</script>

<style lang="less">
@import './food.less';
</style>
