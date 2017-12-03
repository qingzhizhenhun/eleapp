<template>
  <div class="cartcontrol">
    <div class="cart-dec" @click.stop.prevent="desCart">-</div>
    <div class="cart-count">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">+</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'Vue';
  export default {
    props:['food'],
    data(){
      return {
        test:0
      }
    },
    methods: {
      //修改数据goods=>foods=>food的count，映射到原始数据中
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) { //如果没有count属性，则设置为1
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }

      },
      desCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="less">
  .cartcontrol {
    font-size: 0;
  }

  .cart-dec, .cart-add {
    display: inline-block;
    text-align: center;
    padding: 6px;
    width: 12px;
    height: 12px;
    font-size: 18px;
    line-height: 10px;
    border-radius: 50%;
    color: #fff;
    font-weight: 700;
  }

  .cart-dec {
    width: 10px;
    height: 10px;
    background: #f3f5f7;
    color: steelblue;
    border: 1px solid steelblue;
  }

  .cart-add {
    background: steelblue;
  }

  .cart-count {
    display: inline-block;
    font-size: 12px;
    margin: 0 10px;
    height: 12px;
    text-align: center;
    line-height: 8px;
  }
</style>
