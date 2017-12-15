const mongoose = require('mongoose')
// 规定 数据结构
const TopicSchema = new mongoose.Schema({
    title: String,
    url: String, // 可以做下去重
    createTime: Number,
    detail: [String],
    picture: [String],
})

//语法 mongoose.model(`文档名称`, Schema)
const TopicModel = mongoose.model('topic', TopicSchema)

module.exports = TopicModel;

