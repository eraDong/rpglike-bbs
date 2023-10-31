// router.js
// 导入express
const express = require('express')
const user = require('./user.js')
const plate = require('./plate.js')
// 创建路由对象
const router = express.Router()




// user模块
router.use(user)

//plate模块
router.use(plate)



// 向外导出路由对象
module.exports = router
