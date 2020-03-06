<template>
  <div class="goods-list">
    <nav-header></nav-header>

    <nav-bread>
      <!-- <span>Goods</span> -->
      <span slot="SecondBread">Goods</span>
    </nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)">All</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li>
                  <div class="pic">
                    <a href="#">
                      <img src="../../../static/1.jpg" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">XX</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'
import NavHeader from '@/components/Header.vue'
import NavBread from '@/components/Bread.vue'
import NavFooter from '@/components/Footer.vue'

export default {
  name: 'GoodsList',
  components: {
    NavHeader,
    NavBread,
    NavFooter
  }
}
</script>

<style scoped>
</style>
