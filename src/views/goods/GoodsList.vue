<template>
  <div class="goods-list">
    <!-- base图片时，不需要从网络请求，性能好 -->
    <img src="../../assets/logo.png" alt="">
    商品列表页<br>
    {{$route.params}}
    {{$route.params.username}}
  </div>
</template>

<script>
export default {
  // name决定vue-tools中名字，没有默认为组件名
  name: 'GoodsLists'
}
</script>
