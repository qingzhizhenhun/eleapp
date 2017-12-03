<template>
  <div id="app">
<v-header :seller = 'seller'></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
   <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';
export default{
  data() {
    return{
      seller: {}
    }
  },
  created(){
    this.$http.get('/api/seller').then((response) => {
        console.log(response);
        response = response.body;
      //获取的属性转化成json对象
      if(response.errno == 0){
          this.seller = response.data;
      }
    });
  },
  components:{
    'v-header':header,
  }
}
</script>

<style rel="stylesheet/less" lang="less" scope>
.tab{
  display:flex;
  width: 100%;
  line-height: 40px;
  height: 40px;
  text-align: center;
  border-bottom:1px solid rgba(7,17,27,0.1);
  .tab-item{
    flex:1;
      a{
        font-size: 14px;
        color:rgba(77,85,93,1);
      }
      a:hover{
         color:rgb(240,20,20);
      }
  }
}



</style>
