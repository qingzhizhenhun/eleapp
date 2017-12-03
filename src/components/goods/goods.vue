<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}"
            @click="selectMenu(index)">
          <div class="span-box"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span><span
            class="text">{{item.name}}</span></div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li  @click="selectFood(food)" v-for="food in item.foods" class="food-item">
              <div class="food-icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-dec">{{food.description}}</p>
                <div class="food-extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span class="now">¥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">原价{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol'
  import Vue from 'Vue'
  import food from '../food/food'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        foods: [],
        selectedFood:{}/*被选中的food*/
      }
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0 ) {
              foods.push(food);
            }
          })
        });
        return foods;
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          if (response.errno == 0) {
            response.data.forEach(function(item){
              item.foods.forEach(function(info){
                info.count = 0;
              })
            })
            this.goods = response.data;
            // DOM 更新了 操作dom时一定要在$nextTick里
            this.$nextTick(() => {
              this._initScroll();
              this.callHeight();
            })
          }
        })
    },
    methods: {
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 监测实时滚动的位置
        });
        this.foodScroll.on('scroll', (pos) => {
          // 拿到实时的y坐标
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      callHeight(){
        let foodList = document.getElementsByClassName("food-list");
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index){
        let foodList = document.getElementsByClassName('food-list');
        this.foodScroll.scrollToElement(foodList[index], 300);
      },
//      babyAdd(test){
//        this.goods.forEach(function(item){
//          item.foods.forEach(function(info){
//            if(info.name == test.name){
//              if(test.type == 'add'){
//                info.count+=1;
//              }else{
//                info.count -= 1;
//              }
//            }
//          })
//        })
//      },
      selectFood(food) {
        this.selectedFood = food;
        this.$refs.food.show();
        //点击选中的food给显示出来
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="less" type="text/less">
  @import './goods.less';
</style>
