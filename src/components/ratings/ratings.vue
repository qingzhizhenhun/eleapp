<template>
<div class="ratings" ref="ratings">
  <div class="rating-content">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :size="12" :score="seller.serviceScore"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :size="36" :score="seller.foodScore"></star>
          <span class="score">{{ seller.foodScore }}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{ seller.deliveryTime }}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :select-type="selectType" :only-content="onlyContent"
                  :ratings="ratings" v-on:changeColor="childChange" v-on:toggleColor="changeColor"></ratingselect>
    <div class="rating-wrapper">
      <ul>
        <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{ rating.username }}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}</span>
            </div>
            <p class="text">{{ rating.text }}</p>
            <div class="recommend" v-if="rating.recommend && rating.recommend.length">
              <i class="icon-thumb_up"></i>
              <span v-for="item in rating.recommend" class="item">{{ item }}</span>
            </div>
            <div class="time">
              {{ rating.rateTime}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import BScroll from "better-scroll";
  const ALL = 2;
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    };
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.errno === 0) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
  },
  methods: {
    select(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    onlyContent2(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
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
    },
    childChange(type){
      this.selectType = type;
    },
    //接收子组件的广播传入的数据,并改变selectType
    changeColor(blue){
      this.onlyContent = blue;
    },
  },
  components:{
    star,
    split,
    ratingselect
  }
}
</script>

<style lang="less">
@import './ratings.less';
</style>
