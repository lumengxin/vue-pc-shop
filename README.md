## 说明
接近原生体验的移动端音乐app(之前一直可以播放某🐧音乐网站大部分音乐，部分会员也行，最近打开发现都播放不了了)。
但是，不影响代码阅读学习，项目还是能跑起来，只是没声音。

> 如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！🙏

> 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目 👻

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 💯

> 开发环境: window10专业版; nodejs v10.16.3; vsCode

> 更多探索：[低仿去哪儿移动app](https://github.com/lumengxin/Travel.git)    [包含前后端的低仿亚马逊购物](https://github.com/lumengxin/vue-pc-shop.git)

> 推荐指数：⭐⭐⭐⭐

### 技术栈

vue全家桶 + better-scroll + good-storage + js-base64 + jsonp + vue-lazyload

### 项目运行

```
git clone https://github.com/lumengxin/vue-music.git
npm install
npm start                  // 运行
npm run lint                // 格式化代码
npm run build               // 打包上线
```

### 更多阅读

- [笔记](./docs/笔记.md)
- [需求](./docs/需求.md)

## 项目预览：

[在线演示](http://www.byooka.com/v19/vue-music)

**效果展示：**

<div style="display:flex;flex-wrap:wrap;">
    <img src="./docs/images/shot/rank.png" />
    <img src="./docs/images/shot/reco.png" />
    <img src="./docs/images/shot/reco-26-01.png" />
    <img src="./docs/images/shot/reco-58-40.png" />
    <img src="./docs/images/shot/reco26.png" />
    <img src="./docs/images/shot/search.png" />
    <img src="./docs/images/shot/user.png" />
    <img src="./docs/images/shot/singer.png" />
</div>



## 项目总结：

### 要点归纳

- 使用vue全家桶,vuex管理大中型数据状态
- vuex 结合good-storge 实现数据持久化
- stylus预处理器的使用
- better-scroll，fastclick等移动端开发必用的库
