# rent-crawler
A crawler crawling rental information, based Nodejs

一个基于Nodejs，摘取租房信息的爬虫

功能 Features: 
- Get rental information about keywords
- 得到有关查询地点的租房信息


# 开始 Get started 
## 安装 How to install
```
$ npm install rent-crawler
```
> win全局要加`-g`

## 下载并启动mongodb

mongodb: [下载](https://www.mongodb.com/download-center)

启动方法自行查阅

## 用法 Usage
```
$ zufang [query]
```

eg: 
```
$ zufang 鼓楼区
```
## BTW

默认爬取的是豆瓣的福州租房小组列表。如要改动，请将 `crawler.js` 中的 `fetchSingleDoubanList` 的链接更改

# More 更多

- 利用HTTP库 [Axios](https://github.com/axios/axios) 在 Nodejs 中发起get请求，获取页面数据。`res.data`存储着网页的 html 内容
- 使用 [cheerio](https://github.com/cheeriojs/cheerio) 解决拉去页面之后解析环境的问题，可以理解成一个 Node.js 版的 jQuery，用来从网页中以 CSS selector 方式选取数据。
将 `res.data` 传给 `cheerio.load`，实现 jQuery 接口的变量，习惯性地将它命名为 `$`
- 数据库基于 [Mongodb](http://www.mongodb.org/) ，并使用 [mongoose](https://github.com/Automattic/mongoose) 来操作


# About 相关知识

## mongoDB是什么

MongoDB是一个基于分布式文件存储的数据库。由C++语言编写。旨在为web应用提供可扩展的高性能数据存储解决方案。
他的特点:高性能、易部署、易使用，存储数据非常方便。

### 安装
```
brew install mongodb
```
## 启动服务端
```
$ mongod --config /usr/local/etc/mongod.conf
```

## 客户端使用
使用MongoDB，首先需要连接到MongoDB service:
```
$ mongo
```
```
> use yourdbname
```
### 更多命令
```
> db.dbname.find()
```

## mongoose
直接使用mongodb模块虽然强大而灵活，但有些繁琐。

**mongoose构建在mongodb之上，提供了Schema、Model和Document对象，用起来更为方便。**

我们可以用Schema对象定义文档的结构（类似表结构），可以定义字段和类型、唯一性、索引和验证。Model对象表示集合中的所有文档。Document对象作为集合中的单个文档的表示。mongoose还有Query和Aggregate对象，Query实现查询，Aggregate实现聚合。

```
$ npm install mongoose --save
```
> 这个命令会安装mongoose并将其作为项目的依赖，而mongoose依赖的MongoDB driver以及regexp等等模块也会被自动安装。



### 指南
mongoose 中任何任何事物都是从 Schema 开始的。每一个 Schema 对应 MongoDB 中的一个集合（collection）。Schema 中定义了集合中文档（document）的样式。
#### 第一步，定义schema

用mongoose的第一件事情就应该是定义schema. schema是什么呢？ 它类似于关系数据库的表结构.
```
var mongoose = require('mongoose');
var schema = mongoose.Schema;
 
var blogSchema = new Schema({
    titile: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden:Boolen
});
```

#### 第二步，创建model

格式是mongoose.model(modelName, schema);
```
var BlogModel = mongoose.model('Blog', blogSchema);
```

### 一个示例
```
// 首先引入 mongoose 这个模块
var mongoose = require('mongoose');
// 然后连接对应的数据库：mongodb://localhost/test
// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
// 端口号省略则默认连接 27017；test 是数据库的名称
// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。

mongoose.connect('mongodb://localhost/test');

// 推荐在同一个 collection 中使用固定的数据形式。

var Cat = mongoose.model('Cat', {
  name: String,
  friends: [String],
  age: Number,
});

// new 一个新对象，名叫 kitty
// 接着为 kitty 的属性们赋值

var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
kitty.age = 3;

// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。

kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
```
我们可以验证一下
```
$ mongo
MongoDB shell version: 2.6.4
connecting to: test
> show dbs
> use test
> show collections
> db.cats.find()
```