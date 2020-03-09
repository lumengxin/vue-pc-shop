<template>
  <div class="goods-list">
    <nav-header></nav-header>

    <nav-bread>
      <span>Goods</span>
    </nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop"
            @click="showFilterPop">
            Filter by
          </a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter"
            :class="{'filterby-show': filterBy}"
            >
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" @click="setPriceAll"
                  :class="{'cur': priceChecked === 'All'}"
                  >
                  All
                </a>
              </dd>
              <dd v-for="(price, index) in priceFilter" :key="index" >
                <a href="javascript:void(0)" @click="setPriceFilter(index)"
                  :class="{'cur': priceChecked === index}"
                  >
                  {{price.startPrice}} - {{price.endPrice}}
                </a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4 list-wrap">
              <ul>
                <li v-for="goods in goodsList" :key="goods.productId">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="require('../../../public/img/' + goods.productImage)" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.productName}}</div>
                    <div class="price">{{goods.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(goods.productId)">
                        加入购物车
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- vue-infinite-scroll插件实现滚动加载 -->
              <div class="load-more"
                v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                infinite-scroll-distance="30"
                >
                <img src="../../../public/img/loading-svg/loading-spinning-bubbles.svg" alt="loading"
                  v-if="loading"
                  >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowCart=false">
          继续购物
        </a>
        <router-link class="btn btn--m btn--red" to="/cart">
          查看购物车
        </router-link>
      </div>
    </modal>

    <!-- 小屏时，点击价格筛选时的遮罩层 -->
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'
import axios from 'axios'

export default {
  name: 'GoodsList',
  data() {
    return {
      goodsList: [],
      /* imgSrc: '../../assets/logo.png' */
      // 价格区间筛选
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '2000.00'
        }
      ],
      // 价格区间全选
      priceChecked: 'All',
      // 小屏价格区间显隐
      filterBy: false,
      // 小屏价格区间蒙版显隐
      overLayFlag: false,
      // 价格排序
      sortFlag: true,
      // 当前页码
      page: 1,
      // 每页条目
      pageSize: 8,
      // 滚动加载是否生效
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false
    }
  },
  methods: {
    // flag：请求数据是否累加
    getGoodsData(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.loading = true
      axios.get('/api/goods/list', {
        params: param
      }).then(response => {
        this.loading = false
        let res = response.data
        // console.log("getGoodsData -> res", res)
        if(res.status === '0') {
          if(flag) {
            this.goodsList = this.goodsList.concat(res.result.list)

            if(res.result.count === 0) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsList = res.result.list
            this.busy = false
          }
        } else {
          this.goodsList = []
        }
      })
      // axios.get('/api/goods.json').then(res => {
      //   this.goodsList = res.data.result
      // })
    },
    // 切换选中价格区间样式
    setPriceFilter(index) {
      this.priceChecked = index
      this.closePop()

      this.page = 1
      this.getGoodsData()
    },
    setPriceAll() {
      this.priceChecked = 'All'
      this.page = 1
      this.getGoodsData()
    },
    // 小屏下点击显示价格筛选
    showFilterPop() {
      this.filterBy = true
      this.overLayFlag = true
    },
    // 小屏下点击隐藏价格筛选
    closePop() {
      this.filterBy = false
      this.overLayFlag = false
    },
    // 价格排序
    sortGoods() {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsData()
    },
    // 鼠标滚动触发
    loadMore() {
      this.busy = true
      // 防止一次滚动触发太多次请求
      setTimeout(() => {
        this.page++
        this.getGoodsData(true)
      }, 500)
    },
    addCart(productId) {
      axios.post('api/goods/addCart', {
        productId: productId
      }).then((res) => {
        if(res.data.status === '0') {
          // alert('加入成功')
          this.mdShowCart = true

          this.$store.commit('updataCartCount', 1)
        } else {
          // alert('失败')
          this.mdShow = true
        }
      })
    },
    closeModal() {
      this.mdShow = false
      this.mdShowCart = false
    }
  },
  mounted() {
    this.getGoodsData()
  }
}
</script>

<style scoped>
.accessory-list > ul:after {
  visibility: hidden;
  display: block;
  content: " ";
  clear: both;
}

.accessory-list > ul > li {
  float: left;
  width: 23.80952%;
  margin-right: 1.5873%;
  margin-bottom: 1.5873%;
  background: #fff;
  border: 2px solid #e9e9e9;
  -webkit-transition: all .5s ease-out;
  transition: all .5s ease-out;
}

.accessory-list > ul > li:hover {
  border-color: #ee7a23;
  -webkit-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  transform: translateY(-5px);
  -webkit-box-shadow: 0 0 10px #999;
  box-shadow: 0 0 10px #999;
  -webkit-transition: all .5s ease-out;
  transition: all .5s ease-out;
}

.accessory-list.col-4 > ul > li {
  width: 23.80952%;
  margin-right: 1.5873%;
  margin-bottom: 1.5873%;
}

.accessory-list.col-4 > ul > li:nth-child(4n) {
  margin-right: 0;
}

.accessory-list.col-5 > ul > li {
  width: 18.73016%;
  margin-right: 1.5873%;
  margin-bottom: 1.5873%;
}

.accessory-list.col-5 > ul > li:nth-child(5n) {
  margin-right: 0;
}

.accessory-list .pic {
  overflow: hidden;
}

.accessory-list .pic a {
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.accessory-list .pic img {
  width: 100%;
}

.accessory-list .main {
  padding: 20px 10px 10px 10px;
}

.accessory-list .main .name {
  height: 4em;
  line-height: 1.25em;
  padding-bottom: 10px;
  font-family: "moderat", sans-serif;
  font-weight: bold;
  overflow: hidden;
}

.accessory-list .main .price {
  float: left;
  line-height: 30px;
  color: #d1434a;
  font-size: 1.25em;
}

.accessory-list .main .quantity {
  float: right;
}

.accessory-list .main .btn-area {
  clear: both;
  padding-top: 10px;
}

.accessory-list .main .btn-area .btn {
  width: 100%;
}

@media only screen and (max-width: 991px) {
  .accessory-list.col-4 > ul > li {
    width: 32.27513%;
    margin-right: 1.5873%;
    margin-bottom: 1.5873%;
  }

  .accessory-list.col-4 > ul > li:nth-child(4n) {
    margin-right: 1.5873%;
  }

  .accessory-list.col-4 > ul > li:nth-child(3n) {
    margin-right: 0;
  }

  .accessory-list.col-5 > ul > li {
    width: 23.80952%;
    margin-right: 1.5873%;
    margin-bottom: 1.5873%;
  }

  .accessory-list.col-5 > ul > li:nth-child(5n) {
    margin-right: 20px;
  }

  .accessory-list.col-5 > ul > li:nth-child(4n) {
    margin-right: 0;
  }

  .accessory-list .main .name {
    font-size: 1.3rem;
  }

  .accessory-list .main .btn-area .btn {
    font-size: 1.2rem;
  }
}

@media only screen and (max-width: 767px) {
  .accessory-list {
    font-size: 1.2rem;
  }

  .accessory-list.col-4 > ul > li, .accessory-list.col-5 > ul > li {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
  }

  .accessory-list.col-4 > ul > li:hover, .accessory-list.col-5 > ul > li:hover {
    border-color: none;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transition: none .5s ease-out;
    transition: none .5s ease-out;
  }

  .accessory-list .pic {
    float: left;
    width: 110px;
    height: 110px;
    border: 1px solid #e9e9e9;
  }

  .accessory-list .pic a {
    display: block;
    width: 100%;
    height: 100%;
    padding-bottom: 0;
  }

  .accessory-list .main {
    padding: 0 0 0 125px;
  }

  .accessory-list .main:after {
    visibility: hidden;
    display: block;
    content: " ";
    clear: both;
  }

  .accessory-list .main .price {
    float: none;
  }

  .accessory-list .main .quantity {
    float: left;
  }

  .accessory-list .main .name {
    height: auto;
    min-height: 50px;
  }

  .accessory-list .main .btn-area {
    padding: 0;
    clear: none;
    float: right;
  }

  .accessory-list .main .btn-area .btn {
    height: 30px;
    line-height: 30px;
    padding-left: .8em;
    padding-right: .8em;
    font-size: 1rem;
    letter-spacing: .1em;
  }
}

.filter {
  width: 230px;
  padding: 0 20px 0 20px;
  color: #605F5F;
  -webkit-transition: right .5s ease-out;
  transition: right .5s ease-out;
}

.filter dl {
  min-height: 180px;
  margin-bottom: 50px;
}

.filter dt {
  margin-bottom: 30px;
  font-family: "moderat", sans-serif;
  letter-spacing: .25em;
  text-transform: uppercase;
  font-weight: bold;
}

.filter dd {
  line-height: 1.2em;
  margin: 20px 0;
}

.filter dd a {
  display: block;
  padding: 5px 0;
  -webkit-transition: padding-left .3s ease-out;
  transition: padding-left .3s ease-out;
}

.filter dd a:hover, .filter dd .cur {
  color: #ee7a23;
}

.filter .filter-category ul {
  display: none;
  padding-left: 20px;
}

.filter .filter-category li {
  line-height: 1.2em;
  margin: 10px 0;
}

.filter .filter-category ul > li > ul {
  margin-bottom: 20px;
}

.filter .filter-category ul > li > ul .icon-arrow-down {
  display: none;
}

.filter .filter-category a:hover .icon-arrow-down {
  fill: #ee7a23;
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
}

.filter .filter-category .icon-arrow-down {
  width: 11px;
  height: 11px;
  fill: #605F5F;
  vertical-align: middle;
  margin-left: 3px;
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
}

.filter .filter-category .open ~ ul {
  display: block;
}

.filter .filter-category .open .icon-arrow-down {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.filter .filter-price dd a:hover, .filter .filter-price dd .cur {
  -webkit-transition: padding-left .3s ease-out;
  transition: padding-left .3s ease-out;
  border-left: 2px solid #ee7a23;
  padding-left: 15px;
}

.filter .filter-price dd .cur {
  font-weight: bold;
}

.filter.filterby-show {
  right: 0;
  -webkit-transition: right .5s ease-out;
  transition: right .5s ease-out;
}

@media only screen and (max-width: 767px) {
  .filter {
    position: fixed;
    right: -230px;
    top: 0;
    z-index: 201;
    height: 100%;
    background: #fff;
    padding: 0;
    margin: 0;
    overflow: auto;
  }

  .filter dl {
    min-height: 0;
    margin: 0;
  }

  .filter dt {
    background: #f0f0f0;
    height: 55px;
    line-height: 55px;
    margin: 0;
    padding-left: 20px;
  }

  .filter dd {
    margin: 0;
  }

  .filter dd a {
    padding: 12px 10px 12px 15px;
    border-bottom: 1px solid #e9e9e9;
  }

  .filter dd li {
    margin: 0;
  }

  .filter .filter-category ul {
    padding-left: 0;
  }

  .filter .filter-category ul li > a {
    padding-left: 30px;
  }

  .filter .filter-category ul li > ul a {
    padding-left: 45px;
  }

  .filter .filter-category .icon-arrow-down {
    float: right;
  }
}

/** search resule **/
/** 搜索结果页 **/
.search-result-wrap {
  background: #f0f0f0;
}

.search-result-wrap .search-result-num {
  padding: 10px 0;
  line-height: 25px;
}

.search-result-wrap .search-result-num strong {
  color: #d1434a;
}

.accessory-result {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.accessory-result .filter {
  margin-right: 25px;
}

.accessory-result .accessory-list-wrap {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.filter-nav {
  height: 55px;
  line-height: 55px;
  margin: 60px 0 30px 0;
  padding: 0 20px;
  background: #fff;
  text-align: right;
  overflow: hidden;
}

.filter-nav a {
  margin: 0 10px;
}

.filter-nav a.cur, .filter-nav a:hover {
  color: #ee7a23;
}

.filter-nav .sort-up .icon-arrow-short {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.filter-nav .filterby {
  display: none;
  letter-spacing: .25em;
  text-transform: uppercase;
  font-size: 12px;
}

@media only screen and (max-width: 767px) {
  .search-result-wrap {
    background: none;
    padding: 0 10px;
  }

  .filter-nav {
    margin: 0;
    padding: 0 10px;
    background: #f0f0f0;
    border-top: 1px solid #e9e9e9;
    text-align: left;
  }

  .filter-nav:after {
    visibility: hidden;
    display: block;
    content: " ";
    clear: both;
  }

  .filter-nav a {
    float: left;
  }

  .filter-nav .filterby {
    display: block;
    float: right;
  }

  .filter-nav .sortby {
    display: none;
  }

  .accessory-result .filter {
    margin: 0;
  }
}

.icon-arrow-short {
  width: 11px;
  height: 11px;
}

.page-title-accessory {
  display: none;
}

.accessory-title:after {
  visibility: hidden;
  display: block;
  content: " ";
  clear: both;
}

.accessory-title h2 {
  float: left;
}

.accessory-title .accessory-more-link {
  float: right;
  line-height: 30px;
}

.accessory-title .accessory-more-link .icon-arrow-short {
  margin-left: 15px;
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

.accessory-title .accessory-more-link:hover {
  color: #ee7a23;
}

.accessory-title .accessory-more-link:hover .icon-arrow-short {
  fill: #ee7a23;
}

.accessory-classify {
  position: relative;
}

.accessory-result-page .view-more-normal {
  height: 120px;
  margin-top: 40px;
}

.accessory-result-page .view-more-normal .view-more-btn {
  top: 0;
  padding-top: 40px;
}

@media only screen and (max-width: 767px) {
  .page-title-accessory {
    display: block;
  }

  .accessory-classify {
    padding-bottom: 55px;
  }

  .accessory-title {
    padding-left: 10px;
    padding-right: 10px;
    border: none;
  }

  .accessory-title .accessory-more-link {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
  }

  .accessory-result-page {
    font-size: 1.2rem;
  }

  .accessory-result-page .btn-wrap {
    margin: 0;
  }

  .accessory-result-page .btn-wrap .btn {
    /*line-height: 1.2em;*/
    white-space: normal;
  }

  .accessory-result-page .view-more-normal {
    height: 60px;
    margin-top: 10px;
  }

  .accessory-result-page .view-more-normal .view-more-btn {
    top: 0;
    padding-top: 20px;
  }
}

.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/* .list-wrap ul::after{
  clear: both;
  content: "";
  height: 0;
  display: block;
  visibility: hidden;
} */
</style>
