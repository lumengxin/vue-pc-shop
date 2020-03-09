# 项目前知识积累

## 1. vue相关

### 1.1 vue介绍

#### vue和react对比

- Angular提供的更多是一整套解决方案，后者更像一个生态
- Vue和React目前都使用了Virtual Dom, 渲染速度更快

<h4>Vue: </h4>

- 模板和渲染函数的弹性选择
- 简单的语法及项目创建
- 更快的渲染速度和更小的体积

<h4>React: </h4>

- 更适用于大型引用和更好的可测试性
- 同时适用于Web端和原生App

- 更大的生态圈带来的更多支持和工具

<h4>相同点：</h4>

- 利用虚拟DOM实现快速渲染
- 轻量级
- 响应式组件
- 服务器端渲染
- 易于集成路由工具，打包工具及状态管理工具
- 优秀的支持和社区



### 1.2 vue概况及核心思想

- 本身并不是一个框架

- 结合周边生态构成一个灵活的、渐进式框架

  声明式渲染 - 组件系统 - 客户端路由 - 大规模状态管理 - 构建工具

核心思想：数据驱动、组件化、MVVM

Vue如何实现数据双向绑定？

- Object.defineProperty()函数



### 1.3 vue基础语法

#### (1) 模板语法

- Mustache语法：{{msg}}
- Html赋值： v-html = ""
- 绑定属性： v-bind:id = ""
- 使用表达式：{{ ok ? "yes" : "no" }}
- 文本赋值: v-text = ""
- 指令：v-if = ""    v-show ...
- 过滤器：{{ date || formatDate  }};  v-bind:id = "rawId || formatId"

#### (2)Class和Style绑定

- 对象语法：v-bind:class = "{active: isActive, 'text-danger': hasError}"

- 数组语法：

  ``` 
  <div :class="[activeClass, errClass]">
  
  data: {
  	activeClass: 'active',
  	errClass: 'text-danger'
  }
  ```

- sytle-对象语法：v-bind:style = "{color: actColor, fontSize: fontSize + 'px'}"

#### (3)条件渲染

v-if;	v-else;	v-else-if;	v-show;	v-cloak

#### (4)事件处理器

- v-on:click = "green" /  @click="green"

- 修饰符：@click.stop 阻止冒泡   @click.stop.prevent 阻止按钮默认事件

  ​                @click.self  阻止传递给子元素  @click.once ...

- @keyup.enter

  - enter, tab, delete, esc, .space, up, down, left, right

- 自定义事件

#### (5)vue组件

- 全局组件和局部组件

- 父子组件通讯 - 数据传递

  vue 中单向数据流，父传子prop;

  子传父其实不允许，但是提供$emit()方法；

  嵌套过多时，子修改父变量会导致数据混乱

- Slot

### 1.4 环境搭建

#### (1) node.js和npm: [中文网](https://nodejs.org/zh-cn/)

npm 升级： npm install -g npm;

vue安装：npm install vue --save;

#### (2) vue和vue-cli

- vue多页面应用文件引入

  - 官网：<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
  - npm安装  ...

- vue-cli构建SPA应用

  - npm install -g vue-cli(老版);	

    npm i -g @vue/cli OR yarn global add @vue/cli

  - vue init webpacke-simple demo(老版)；

    vue create demo OR vue ui

  拉取2.x模板（旧版本）：npm install -g @vue/cli-init



### 1.5 路由（前端）

**什么是前端路由？**

​		路由是根据不同url展示不同的内容或页面；

​		前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据url的不同返回不同的页面来实现的。

**什么时候使用？**

​		在单页面应用，大部分页面结构不变，只改变部分内容时使用。

**优缺点？**

- 优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户

- 缺点：不利于SEO；

  ​            使用浏览器的前进后退时会重新发送请求，没有合理利用缓存；

  ​            单页面无法记住之前的滚动位置

### vue-router

对History的封装；# 代表用的哈希

- vue-router用来构建SPA
- <router-link></router-link>或this.$router.push({path: ""})
- <router-view></router-view>
- 动态路由匹配
- 嵌套路由
- 编程式路由
- 命令路由和命名视图

#### 1.5.1 动态路由

- 什么是动态路由？

| **模式**                      | **匹配路径**        | **$router.params**               |
| :---------------------------- | :------------------ | :------------------------------- |
| /user/:username               | /user/evan          | {username: 'evan'}               |
| /user/:username/post/:post_id | /user/evan/post/123 | {username: 'evan', post_id: 123} |

#### 1.5.2编程式路由

通过js来实现页面的跳转

- $router.push("name")  传入路径名

- $router.push({path: "name"})   传入obj对象

- $router.push({path: "name ? a=123"})  跳转并传参

  $router.pus({path: "name", query: {a: 123}})

  接受参数：$route.query.a

  ​	params是动态路由切换时获取参数

- $router.go(1)   $router.go(0) 刷新

#### 1.5.3命名路由和路由视图

给路由定义不同的名字，根据名字进行匹配；

```
v-bind:to="{name: 'cart'}"  // 必须和路由组件中name一致, to需要是动态绑定

:to="{name: 'cart', params: {cartId: 123}}"  // 动态匹配
```

给不同的router-view定义名字，通过名字进行对应组件的渲染

```
GoodsList.vue:
<router-view></router-view>
<router-view name="title"></rotuer-view>
<router-view name="img"></rotuer-view>

index.js:
import GoodsList from '@/views/GoodsList'
import Title from '@/views/Title'
...
{
	path: '/',
	name: 'goodList',
	components: {
		default: GoodsList,
		title: Title,
		img: Image
	}
}
```



### 1.6 vue-router

异步请求插件

**使用：**

- <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>


- npm i vue-resource -S

#### 1.6.1 API(按REST风格设计)

- get(url, [potions])
- head(url, [potions])
- delete(url, [potions])
- jsonp(url, [potions])
- post(url, [body], [potions])
- put(url, [body],, [potions])
- patch(url, [body],, [potions])

| **参数**     | **类型**               | **描述**                                                     |
| ------------ | ---------------------- | ------------------------------------------------------------ |
| url          | string                 | 请求的URL                                                    |
| method       | string                 | 请求的HTTP方法，如get,post..                                 |
| body         | Object, FormDatastring | request body                                                 |
| params       | Object                 | 请求的URL参数对象                                            |
| headers      | Object                 | request header                                               |
| timeout      | number                 | 请求超时时间，ms                                             |
| before       | funtion(request)       | 请求发送前的处理函数，类似于jQuery的beforeSend函数           |
| progress     | function(event)        | ProgressEvent回调处理函数                                    |
| credientials | boolean                | 表示跨域请求时是否需要使用凭证                               |
| emulateHTTP  | boolean                | 发送PUT, PATCH,DELETE请求时以HTTP POST的方式发送，并设置请求头的X-HTTP-Methods-Overrride |
|              |                        |                                                              |

#### 1.6.2 全局拦截器 interceptors

```
Vue.http.interceptors.push((request, next) => {
	// 请求发送前的处理逻辑
	next((response) => {
		// 请求发送后的处理逻辑
		// ...
		// 根据请求的状态，response参数会返回successCallback或errorCallback
		return response
	})
})
```

### 1.7 axios

#### 1.7.1 API

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

```
function getUserAccount() {
	return axios.get('/user/123')
}
function getUserPermissions() {
	return axios.get('/user/123/permis')
}
// all 一次获取两个接口；传统需要在一个里面通过回调
axios.all([getUserAccount(), getUserPermissions()])
	.then(axios.spread(function(acct, perms) {
		// Both requests are new complete
	}))
```

### 1.8 Vuex

**vuex是什么？**

​	Vuex是一个专门为Vue.js应用程序开发的状态管理模式。

**为什么需要用vuex?**

​	当我们构建一个中大型的单页面应用程序时，vuex可以更好的帮助我们在组件外部统一管理状态。

**vuex的核心概念**

- State
  - 唯一的数据源
  - 单一状态树

```
const Counter = {
	template: `<div>{{count}}</div>`,
	computed: {
		// computed里面必须是函数
		count() {
			return this.$store.state.count
		}
	}
}
```

- Getters
  - 通过getters可以派生出一些新的状态

```
const store = new Vuex.Store({
	state: {
		todos: [
			{id: 1, text: 'a', done: true},
			{id: 2, text: 'b', done: false},
			{id: 3, text: 'c', done: true},
		]
	},
	getters: {
		doneTodos: state => {
			return state.todos.filter(todo => todo.done)
		}
	}
})
```

- Mutations
  - 更改vuex的store中的状态的唯一方法是提交mutation

```
const store = new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		increment(state) {
			// 变更状态
			state.count++
		}
	}
})
// 提交
store.commit('increment')
```

- Actions
  - actions提交的是mutation, 而不是直接变更状态
  - action可以包含任意异步操作

```
const store = new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		increment(state) {
			state.count++
		}
	},
	actions: {
		increment(context) {
			context.commit('increment')
		}
	}
})
```

- Modules
  - 面对复杂的应用程序，当管理的状态比较多时，我们需要将vuex的store对象分割成模块(modulus)

```
const store = new Vuex.Store({
	modules: {
		a: moduleA,
		b: moduleB
	}
})
const moduleA = {
	state: {},
	getters: {},
	mutations: {},
	actions: {}
}
const moduleB = {
	state: {},
	mutations: {}
}
```





##  2.ECMAScript6

### 2.1 简介

- 1995：JavaScript诞生
- 1997：ECMAScript标准确立
- 1999：ES3出现，与此同时IE5风靡一时
- 2009：ES5出现，例如foreach，Object.keys, Object.create和JSON标准
- 2015：ES6/ECMAScript2015出现
- 目标：JavaScript语言可以用来编写复杂的大型应用程序，称为企业级开发语言

### 2.2 常用命令

- 函数的Rest参数和扩展
- Promise使用
- module.exports 和 ES6 import/export的使用

### 2.3 AMD, CMD, CommonJs和ES6对比

- AMD: 是RequireJs在推广过程中对模块定义的规范化产出

```
// 依赖前置, 异步模块定义
define(['package/lib'], function(lib) {
	function foo() {
		lib.log('hello world')
	}
	return {
		foo: foo
	}
})
```

- CMD: 是SeaJS在推广过程中对模块定义的规范化产出

```
// 依赖就近，同步模块定义
// 所有模块都通过define来定义
define(function(require, exports, module) {
	// 通过require引入依赖
	var $ = require('jquery')
	var Spinning = require('./spinning')
})
```

- CommonJS规范 - module.exports (默认输出。不被浏览器识别，node规范推荐)

```
// 带名字输出
exports.area = function(r) {
	return Math.PI * r * r
}
exports.cir = function(r) {
	return 2 * Math.PI * r
}
```

- ES特性 - export / import

```
// 默认输出
export default {
	data() {
		return {}
	},
	methods: {
		increment() {
			this.$emit("incre")
			import('./../util')
		}
	}
}
```



## 3.服务端

### 3.1 Linux安装node.js

- wget https://nodejs.org/dist/v12.16.1/node-v12.16.1-linux-x64.tar.xz
- xz -d node-v12.16.1-linux-x64.tar.xz  / tar -xzvf node-v12.16.1-linux-x64.tar.gz
- tar -xvf node-v12.16.1-linux-x64.tar
- ln -s /node-v12.16.1-linux-x64/bin/node /user/local/bin/node
- ln -s /node-v12.16.1-linux-x64/bin/npm /user/local/bin/npm



### 3.2 Node基础编程

- 基于Chrome V8引擎
- 单线程
- 使用js开发后端代码
- 非阻塞IO

#### (1) Common规范

#### (2) 创建一个Http Server

#### (3) 创建一个Web容器，可以访问到HTML内容



### 3.3 MongoDB搭建

- 高可扩展性
- 分布式存储
- 低成本
- 结构灵活

#### (1) windows平台

- 下载安装包：[官网](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.3-signed.msi)
- 添加db存储和日志存储文件夹

**c盘或者其他地方，创建文件夹用来存放数据**
如：c/MongoDB/data、 logs/mongo.log、etc/mongo.conf

**启动mongo**

管理员身份打开命令行工具，进入至mongo安装bin子目录；

> mogod --depath c:\MongoDB\data
>
> 默认端口：localhost:27017

*mongo.conf:*

```
#数据库路径
dbpath=c:\MongoDB\data\
#日志输出文件路径
logpath=c:\MongoDB\logs\mongo.log
#错误日志采用追加模式
logappend=true
#启用日志文件，默认启动
journal=true
#过滤掉一些无用日志信息，若需要调试设置为flase
quiet=false
#端口号
port=27017
#指定存储引擎（默认不需要，启动不成功时加）
storageEngine=mmapv1
#http 配置
httpinterface=true
```

**根据配置文件启动**

([--httpinterface]: localhost:28017,网页中访问日志)

> mongod --config c:\MongoDB\etc\mongo.conf [--httpinterface]


- 添加服务，配置环境变量，启动Mongo

**添加至服务**

> mongod --config c:\MongoDB\etc\mongo.conf --install [--serviceName "MongoDB"]

**配置环境变量**

**客户端工具使用（MongoVUE）**

> 创建一个数据库 Create new Connection
>
> name: Demo
>
> Server: 127.0.0.1 (上线后为服务器地址)
>
> Port: 27017

*Demo中插入一个数据库(命令行)*

```
>mongo
>show dbs	
>use pcshop
>db.goods.insert((id:101, "name":"mi10", "price": 3990))
```

#### (2) Linux平台

- 下载安装包或压缩包
- 上传服务器，解压缩

**登录远程服务器**

> ssh root@123.572.122
>
> xxxx(密码)

**本地包上传到服务器**

> scp /.../mongodb-org-server_4.2.3_amd64.tgz(本地文件目录)  root@123.572.122:/(服务器目录)
>
> xxxx

**解压缩(远程shell)**

> cd /
>
> tar -zxvf mongodb-org-server_4.2.3_amd64.tgz
>
> mkdir mongodb
>
> mv mongodb-org-server_4.2.3_amd64 mongodb
>
> cd mongodb
>
> mkdir data; ... etc, ...logs;
>
> /.../bin > mongod -f /mongodb/etc/mongo.conf

**建立软链接**

> ln -s /../bin/mongo /usr/local/bin/mongo
>
> mongo

- 添加db储存和日志存储文件夹



#### (3) MongoDB创建用户

- 1.创建管理员
- 2.授权认证
- 3.给使用的数据库添加用户

```
// 非授权模式进入
mongo
>use admin
>db.createUser({user: "admin", pwd: "admin", roles:["root"]})
>db.auth("admin", "admin")  // 返回1，成功
>use test
>db.createUser({user: "root", pwd: "123456", roles:[{role:'dbOwner', db:'test'}]})
>mongod -f /usr/local/etc/mongod.conf --auth // 以授权模式启动
```



#### (4) MongoDB基本语法

**数据库对比**

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                          |
| ------------ | ---------------- | ---------------------------------- |
| database     | database         | 数据库                             |
| table        | collection       | 数据库表；集合                     |
| row          | document         | 数据记录行；文档                   |
| column       | field            | 数据字段；域                       |
| index        | index            | 索引                               |
| table joins  |                  | 表连接；不支持                     |
| primary key  | primary key      | 主键，mongo自动将_id字段设置为主键 |

1. 插入文档
2. 更新文档
3. 删除文档
4. 查询文档



### 3.4 Express框架创建后端项目

- 安装express generator生成器

- 通过生成器自动创建项目
- 配置分析

```
npm i -g express-generator;
express server-express;
前后端分离：(cd server-express; npm i; npm start/nodemon bin/www)

合一起：server-express/package.json中开发依赖剪切到vue-pc-shop/package.json中，执行npm install。
```

**默认推荐jade模板语法，修改为html**

```
// 安装ejs
npm i ejs --save;

// 修改app.js
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
```




### 3.5 Node.js启动调试方式

- 通过node命令启动
- 配置启动入口
- pm2

```
..\vue-pc-shop
>pm2 start server-express\bin\www
>pm2 stop all
>pm2 list
>pm2 log
...
```



### 3.6 Node开发接口

#### (1) 商品信息列表接口

> localhost:3000/goods/list

**app.js**

```
// 创建goods一级路由
var goodsRouter = require('./routes/goods');

app.use('/goods', goodsRouter);
```

**models/goods.js**

```
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var produtSchema = new Schema({
  "productId": {type:String},
  "productName": String,
  "salePrice": Number,
  "checked": String,
  "productNum": Number,
  "productImage": String
})

module.exports = mongoose.model('Good', produtSchema)

```

**routers/goods.js**

```
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goods = require('../models/goods');

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_pc_shop');
...

```

**测试接口完成**

> http://localhost:3000/goods/list?page=1[,&pageSize=10[,$sort=-1]]