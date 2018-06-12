const axios = require('axios');     // Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
const cheerio = require('cheerio')  // 解决拉取页面之后解析环境的问题，在服务端处理字符串转成文档，大致理解为服务端jQ
// phantomjs / jsdom / cheerio
// const jieba = require('nodejieba')  // node中文分词

async function fetchSingleDoubanList(start) {
    let res = await axios({
        method: 'get',
        url: `https://www.douban.com/group/498004/discussion?start=${start}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3213.3 Safari/537.36'
        }
    });
    let htmlText = res.data;    //拉到一页的数据

    const $ = cheerio.load(htmlText)    // cheerio 用法
    const rs = $('a[title]');

    const resultList = [];
    for (let i = 0; i < rs.length; i++) {
        resultList.push({
            title: rs.eq(i).attr('title'),
            url: rs.eq(i).attr('href')
        })
    }
    return resultList;
}

async function fetchSingleDoubanTopic(url, title) {
    let res = await axios.get(url)
    let htmlText = res.data;
    const $ = cheerio.load(htmlText);

    const topicBody = $('.topic-content > p')
    let details = [];
    for (let i = 0; i < topicBody.length; i++) {
        details.push(topicBody.eq(i).text());
    }

    const topicPics = $('.image-wrapper > img')
    let picture = [];
    for (let i = 0; i < topicPics.length; i++) {
        picture.push(topicPics.eq(i).attr('src'));
    }
    return {
        url,
        title,
        details,
        picture,
    }
}

module.exports = {
    fetchSingleDoubanList,
    fetchSingleDoubanTopic
}