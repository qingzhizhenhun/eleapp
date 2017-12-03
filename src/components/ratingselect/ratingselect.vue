<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{active:selectType === 2}">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{active:selectType === 0}">{{desc.positive}} <span class="count">{{ positives.length }}</span></span>
      <span @click="select(1)" class="block negative" :class="{active:selectType === 1}">{{desc.negative}} <span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'in':onlyContent===true}">
      <span class="icon-check_circle" @click="toggleColor"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
  data(){
    return {
      change:1,
      //自定义一个变量change
      blue:true
    }
  } ,
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
  methods:{
   select(type){
     this.change=type;
     //改变自定义变量并全局广播
     this.$emit("changeColor",type);
   },
    toggleColor(){
      if(this.blue === true){
        this.blue = false;
      }else{
        this.blue = true;
      }
      this.$emit("toggleColor",this.blue);
    }
  }
}
</script>

<style lang="less">
@import './ratingselect.less';
</style>
