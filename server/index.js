const crawler = require('./crawler');
const express = require('express');
const app = express();

async function doubanCrawler(pageIndex, target) {
    let targetTopicList = [];
    let index = pageIndex > 1 ? (pageIndex - 1) * 25 : pageIndex - 1;
    let resultList = await crawler.fetchSingleDoubanList(index);
    for (let i = 0; i < resultList.length; i++) {
        let item = resultList[i];
        if (isCheck(item.title, target)) {
            let targetTopic = await crawler.fetchSingleDoubanTopic(item.url, item.title);
            targetTopicList.push(targetTopic);
        }
    }
    return targetTopicList;
}

function isCheck(place, target) {
    if (!target) {
        return true;
    }
    return place.indexOf(target) > -1;
}

app.use(express.static('../App'));
app.get('/getPage', function (req, res) {
    let pageIndex = req.query.pageIndex;
    let target = req.query.target;
    if (!target) {
        doubanCrawler(pageIndex).then((data) => {
            res.send(data);
        });
    } else {
        doubanCrawler(pageIndex, target).then((data) => {
            res.send(data);
        })
    }
});

app.listen(3001, function () {
    console.log('app is running at http://localhost:3001/');
})

