// 模块化开发
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('rpglike-api', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true, // 确保用户名唯一
  },
  password: {
    type: DataTypes.STRING,
  },
});

// ...
sequelize.sync();

// 在此处添加任何其他模型关联

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ message: '用户名或密码错误' });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign({ username: user.username, userId: user.id }, 'your_secret_key', {
          expiresIn: '1h',
        });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: '用户名或密码错误' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '登录失败' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password, repassword } = req.body;

  if (password !== repassword) {
    console.error('密码和确认密码不一致');
    return res.status(400).json({ message: '密码和确认密码不一致' });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    if (newUser) {
      res.status(201).json({ message: '用户注册成功' });
    } else {
      console.error('数据库插入未成功');
      res.status(500).json({ message: '注册失败' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '注册失败' });
  }
});

// Retrieve a user's ID by username
router.get('/getUserIdByUsername/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ where: { username } });

    if (user) {
      res.json({ id: user.id });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user ID by username' });
  }
});


// 注册路由
// 注册路由
// 注册路由


module.exports = router