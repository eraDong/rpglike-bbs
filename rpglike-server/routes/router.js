// router.js
// 导入express
const express = require('express')
// 废弃
const user = require('./user.js')
const plate = require('./plate.js')
const topic = require('./topic.js')
const post = require('./post.js')
// 创建路由对象
const router = express.Router()




// user模块
router.use(user)

//plate模块
router.use(plate)

router.use(topic)

router.use(post)


// 向外导出路由对象
module.exports = router
