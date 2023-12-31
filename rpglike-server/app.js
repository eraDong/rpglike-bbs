const express = require('express')
const router = require('./routes/router')

const app = express()

// 解决跨域的中间件
const cors = require('cors')

const user = require('./routes/user.js')
const plate = require('./routes/plate.js')
const topic = require('./routes/topic.js')
const post = require('./routes/post.js')


// 挂载到app上
app.use(cors())

// 解析请求体
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// 挂载路由
app.use('/user', user)

app.use('/plate', plate)

app.use('/topic', topic)

app.use('/post',post)

// http://localhost:8080/public/images/kitten.jpg 访问静态资源示例
app.use('/public', express.static('public'))

app.get('/', function(req, res) {
    res.send('Hello World')
})

const server = app.listen(8081, function() {

    const host = server.address().address
    const port = server.address().port
    
    console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)

})