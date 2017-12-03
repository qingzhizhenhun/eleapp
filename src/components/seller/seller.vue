<template>
<div class="seller" ref="seller">
  <div class="seller-content">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <h1 class="title">公告与活动</h1>
      <div class="content-wrapper">
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <ul v-if="seller.supports" class="seller-supports">
        <li class="support-item border-1px" v-for="(item, index) in seller.supports">
          <span class="icon"></span>
          <span class="text">{{ seller.supports[index].description }}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics">
      <h1 class="title">商家实景</h1>
     <div class="pic-wrapper" ref="pics">
       <ul class="pic-list">
         <li class="pic-item" v-for="pic in seller.pics">
           <img :src="pic" alt="" width="120" height="90">
         </li>
       </ul>
     </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  import split from '../split/split';
  import BScroll from 'better-scroll';
export default {
  props:['seller'],
  components:{
    star,
    split
  },
  ready(){
    if(!this.pics){

    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.seller, {
      click: true
    });
    this.picScroll = new BScroll(this.$refs.pics,{
      click:true
    })
  }
}
</script>

<style lang="less">
@import './seller.less';
</style>
