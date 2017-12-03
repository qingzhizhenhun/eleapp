<template>
<div class="star" :class="starType">
  <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  <!--v-for绑定在itemClasses反回的数组,类名绑定到itemClass为每个数组的值,为on off 或者half控制星星颜色-->
</div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
export default{
  props:{
    size:{
      type:Number
    },
    score:{
      type:Number
    }
  },
  computed:{
    starType(){
      return 'star-' + this.size;
    },
    itemClasses(){
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let half = score%1==0;
      let int = Math.floor(score);
      for(let i = 0; i < int; i++){
        result.push(CLS_ON);
      }
      //如果有星就加颗满星
      if(half){
        result.push(CLS_HALF);
      }
      //如果不足一颗星,就不加颗星
      while(result.length < LENGTH){
        result.push(CLS_OFF)
      }
      //不足5星的补足黑星
      return result;
    }
  }
}
</script>

<style lang="less">
  @import '../../common/less/mixin.less';
.star{

}
  .star-item{
    display: inline-block;
    background-image:url(star36_on@2x.png);
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    margin-right: 22px;
    background-size: 22px;
  }
  .on{
    background-image:url(star36_on@2x.png);
  }
  .off{
    background-image:url(star36_off@2x.png);
  }
  .half{
  background-image:url(star36_half@2x.png);
}
</style>
