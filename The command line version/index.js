#!/usr/bin/env node
// entrance

require('./services/mongo');
const Topic = require('./models/topic');
const crawler = require('./services/crawler');

let index = 1;
let loaction;
(async () => {
    for (let i = 0; i < 100; i += 25) {     // 获取4页数据，每页25条。因为豆瓣小组每页25条
        // process.argv 返回当前命令行指令参数 ，但不包括node特殊(node-specific) 的命令行选项（参数）。常规第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数：
        if (process.argv[2]) loaction = process.argv[2]            // 如果命令行有参数，则通过 process.argv[2] 获取到
        let isCheck = location => {                                // 如果有参数，则匹配地点为参数
            return location.indexOf(loaction || '仓山') > -1;
        }
        let results = await crawler.fetchSingleDoubanList(i);      // 异步获取一页房租信息列表
        for (let j = 0; j < results.length; j++) {                 // 将每页的列表具体信息显示出来
            let foundTopic = await Topic.findOne({url: results[j].url}).then(r => r)    // 如果数据库有，则不添加
            if (!foundTopic) await Topic.create(results[j]).then(r => r)   // 增量更新
            if (isCheck(results[j].title)) {                               // 如果是查询的地点
                let topicResult = await crawler.fetchSingleDoubanTopic(results[j].url); // 爬取每条的具体信息
                console.log('\n')
                console.log(`【第${index}条】`)
                console.log({
                    标题: results[j].title,
                    链接: results[j].url,
                    图文: topicResult
                })
                console.log('\n')
                index++
            }
        }
    }
})()
    .then(r => {
        console.log(`租房信息显示完毕，查询的条件是 ${loaction}
共计${index - 1}条`)
        process.exit(0)
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    })

