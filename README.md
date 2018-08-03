# rent-crawler
A crawler crawling rental information, based Node.js

一个基于 Nodejs，摘取租房信息的爬虫。
输入需要查询的地段关键字，查询到信息后展示到前端页面。

**2.0 重构版，不再是命令行形式，所有数据改为前端页面展现，服务端改用 Express 支撑**。

## 在线演示

<div align=center><a href="https://rent-crawler.n-y.io" target=_blank>在线预览戳我</a></div>
<div align=center>手机端体验请用开发者工具模拟</div>
<br>
<div align=center>
<img src="https://raw.githubusercontent.com/nanyang24/rent-crawler/master/img/rent-crawler.png" width="20%">
<div>扫二维码在手机上查看</div>
</div>

> 服务器身在国外，网络可能会有波动

## 技术栈
#### jQuery + axios + Cheerio + Node.js + Express + better-scroll


## 使用方法
```
# 将项目克隆到本地
git clone git@github.com:nanyang24/rent-crawler.git

# 安装依赖
npm install

# 启动
npm start

# 在浏览器窗口中打开 http://localhost:3001 即可使用。
```


## BTW

默认爬取的是豆瓣的【深圳南山区】租房小组列表。如需改动，请将 `crawler.js` 中的 `fetchSingleDoubanList` 的链接更改为其他城市地区的豆瓣租房小组。

## More 更多

- 利用HTTP库 [axios](https://github.com/axios/axios) 在 Node.js 中发起get请求，获取页面数据。`res.data` 存储着网页的 HTML 内容
- 使用 [cheerio](https://github.com/cheeriojs/cheerio) 解决拉去页面之后解析环境的问题，可以理解成一个 Node.js 版的 jQuery，用来从网页中以 CSS selector 方式选取数据。
将 `res.data` 传给 `cheerio.load`，实现 jQuery 接口的变量，习惯性地将它命名为 `$`
- 自动根据每条租房信息的配图个数设置图片滑动的总宽度。利用 `Better-scroll` 进行渲染
HTML 中 `<meta name="referrer" content="no-referrer">` 保证了图片的正确显示




