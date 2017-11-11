const mongoose = require('mongoose')    // 新兴非关系型数据库, 存储结构自由
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/rent_crawler', {  // 创建数据库连接，并指定用户连接('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
    poolSize: 5,
    useMongoClient: true,
})
;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'))
db.on('openUri', function () {
    console.log('MongoDB Connection Established.')
})

module.exports = db;