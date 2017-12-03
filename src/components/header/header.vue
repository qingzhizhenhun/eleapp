<template>
<div class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" alt="" width="64" height="64">
      <!--用v-bind赖绑定src-->
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="support">
        <span class="icon"></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div v-if="seller.supports" class="support-content" @click="showDetail">
      <span class="count">{{seller.supports.length}}个</span>
    </div>
  </div>
  <div class="bull-wrapper">
    <span class="bull-title"></span>
    <span class="bull-text">{{seller.bulletin}}</span>
    <i class="arrow_right">></i>
  </div>
  <div class="header-bg">
    <img :src="seller.avatar" alt="" width="100%" height="100%">
  </div>
  <div class="detail" v-show="detailShow" transition="fade">
    <div class="detail-wrapper clearfix">
      <!--外部包裹最小高度为占满屏幕-->
      <div class="detail-main">
        <h1 class="seller-name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :score="seller.score"></star>
        </div>
        <div class="detail-title">
          <!--外层盒子占80%宽度居中且为伸缩盒子-->
          <div class="detail-line"></div>
          <div class="detail-text">优惠信息</div>
          <!--中间文字两边padding撑出距离-->
          <div class="detail-line"></div>
          <!--线条flex为1分居两边-->
        </div>
        <ul v-if="seller.supports" class="detail-supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
        </ul>
        <div class="supports">
          <!--外层盒子占80%宽度居中且为伸缩盒子-->
          <div class="detail-line"></div>
          <div class="detail-text">商家公告</div>
          <!--中间文字两边padding撑出距离-->
          <div class="detail-line"></div>
          <!--线条flex为1分居两边-->
        </div>
        <ul v-if="seller.infos" class="detail-supports">
          <li class="support-item" v-for="(item,index) in seller.infos">
            <span class="text">{{seller.infos[index]}}</span>
          </li>
        </ul>
      </div>
      <!--内容留下padding-bottom-->
    </div>
    <div class="detail-close">
      <i class="icon-close" @click="hiddenDetail"></i>
    </div>
    <!--底部margin-top为负数刚好显示到上面的padding-->
  </div>
</div>
</template>

<script>
  import star from '..//star/star';
export default{
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return {
      detailShow:false
    }
  },
  methods:{
    showDetail:function(){
      this.detailShow = true;
    },
    hiddenDetail:function(){
      this.detailShow = false;
    }
  },
  created(){
    this.classMap = []
  },
  components:{
    star
//    注册star
  }
}
</script>

<style>
  @import url(../../common/less/base.css);
.header{
  color:#fff;
  overflow: hidden;
  position: relative;
  background: rgba(7,17,27,0.5);
}
.content-wrapper{
  position: relative;
padding:24px 12px 18px 24px;
  font-size: 0;
}
  .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .avatar img{
    border-radius: 2px;
  }
  .content{
    display: inline-block;
    font-size: 14px;
    margin-left: 14px;
  }
  .title{
    margin:2px 0 8px 0;
  }
  .brand{
    width: 30px;
    vertical-align: top;
    height: 18px;
    display: inline-block;
    background-image:url("brand@2x.png");
    background-size: 30px 18px;
    background-repeat:no-repeat;
  }
  .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .description{
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 10px;
  }
  .support .icon{
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-image: url("decrease_1@3x.png");
    display: inline-block;
    vertical-align: top;
  }
  .text{
    font-size:10px;
  }
  .support-content{
    position: absolute;
    right:12px;
    bottom:18px;
    padding:0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;
  }
  .count{
    font-size: 10px;
  }
  .bull-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding:0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
    /*超出文字部分省略号*/
  }
  .bull-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    background-image: url(bulletin@2x.png);
    background-size: 22px 12px;
    margin-top: 8px;
    margin-right: 5px;
  }
  .bull-text{
    font-size: 10px;
    vertical-align: top;
  }
.arrow_right{
  font-size: 10px;
  position: absolute;
  top:0px;
  right:12px;
}
  .header-bg{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    right:0;
    z-index: -1;
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    z-index:100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    top:0;
    left:0;
    transition:all 0.5s;
  }
  .v-enter{
    opacity:1;
    background: rgba(7,17,27,0.8);
  }
  .v-leave{
    opacity:0;
    background: rgba(7,17,27,0);
  }
  .detail-wrapper{
    min-height:100%;
    width: 100%;
  }
  .detail-main{
    margin-top: 64px;
    padding-bottom:64px;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin:-64px auto 0 auto;
    text-align: center;
    clear: both;
    font-size: 30px;
  }
  .seller-name{
    text-align: center;
    font-size: 16px;
    line-height:16px;
    font-weight: 700;
  }
  /*以下为star样式*/
  .star-wrapper{
    margin-top: 18px;
    padding:2px 0;
    text-align: center;
  }
  .detail-title{
    display: flex;
    width: 80%;
    margin:30px auto;
  }
  .detail-line{
    flex:1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .detail-text{
    padding:0 12px;
  }
  .support-item{
    width: 80%;
    margin: 5px auto;
    padding:0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .support-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background: url("decrease_1@2x.png");
    background-size: 16px 16px;
    vertical-align: top;
  }
  .supports{
    display: flex;
    width: 80%;
    margin:30px auto;
  }
</style>
