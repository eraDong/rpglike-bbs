// 模块化开发
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')

// 连接我的数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rpglike-api',
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  // 在数据库中查找用户
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: '登录失败' })
    } else if (results.length === 0) {
      res.status(401).json({ message: '用户名或密码错误' })
    } else {
      const user = results[0];
      
      // 验证密码哈希
      bcrypt.compare(password, user.password, (compareErr, isPasswordMatch) => {
        if (compareErr) {
          console.error(compareErr)
          res.status(500).json({ message: '登录失败' })
        } else if (isPasswordMatch) {
          // 密码匹配，创建 JWT 令牌
          const token = jwt.sign({ username: user.username, userId: user.id }, 'your_secret_key', { expiresIn: '1h' })
          res.status(200).json({ token })
        } else {
          res.status(401).json({ message: '用户名或密码错误' })
        }
      })
    }
  })
})

// 注册路由
// 注册路由
// 注册路由
router.post('/register', (req, res) => {
  const { username, password, repassword } = req.body

  // 检查密码和确认密码是否一致
  if (password !== repassword) {
    console.error('密码和确认密码不一致')
    return res.status(400).json({ message: '密码和确认密码不一致' })
  }

  // 使用 bcrypt 哈希密码
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('密码哈希错误:', hashErr);
      return res.status(500).json({ message: '注册失败' })
    }

    // 检查用户名是否已存在
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('查询失败:', err)
        return res.status(500).json({ message: '注册失败' })
      }

      if (results.length > 0) {
        // 用户名已存在
        return res.status(400).json({ message: '用户名已存在' })
      } else {
        // 用户名不存在，可以插入新用户
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, insertResults) => {
          if (err) {
            console.error('注册失败:', err)
            return res.status(500).json({ message: '注册失败' })
          }

          if (insertResults.affectedRows === 1) {
            res.status(201).json({ message: '用户注册成功' })
          } else {
            console.error('数据库插入未成功');
            res.status(500).json({ message: '注册失败' })
          }
        })
      }
    })
  })
})

module.exports = router