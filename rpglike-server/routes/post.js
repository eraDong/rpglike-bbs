const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Sequelize, DataTypes } = require('sequelize');

// 配置数据库连接
const sequelize = new Sequelize('rpglike-api', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// 定义帖子模型
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING, // 添加 avatar 字段
    allowNull: true,
  },
}, {
  timestamps: true,
});

// 配置存储位置和文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

sequelize.sync();

const upload = multer({ storage });

router.post('/create', upload.fields([{ name: 'avatar' }, { name: 'image' }]), async (req, res) => {
  try {
    const { title, content, author, category, likes, comments, views, plate } = req.body;
    // 检查是否上传了 avatar 文件，如果没有则将 avatar 设置为 null
    const avatar = req.files['avatar'] ? req.files['avatar'][0].path : null;

    // 检查是否上传了 image 文件，如果没有则将 image 设置为 null
    const image = req.files['image'] ? req.files['image'][0].path : null;

    const post = await Post.create({
      title,
      content,
      author,
      category,
      likes: likes || 0,
      comments: comments || 0,
      views: views || 0,
      plate: plate || null,
      avatar,
      image:image||null,
    });

    res.json(post.toJSON());
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});


// 获取所有帖子
router.get('/read', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// 根据 Category 读取帖子
router.get('/readByCategory/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const posts = await Post.findAll({ where: { category } });
    const postArray = posts.map(post => post.toJSON());
    res.json(postArray);
  } catch (error) {
    console.error('Error retrieving posts by category:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// 根据 Plate 读取帖子
router.get('/readByPlate/:plate', async (req, res) => {
  try {
    const plate = req.params.plate;
    const posts = await Post.findAll({ where: { plate } });
    const postArray = posts.map(post => post.toJSON());
    res.json(postArray);
  } catch (error) {
    console.error('Error retrieving posts by plate:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

// 更新帖子
router.put('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { id, createdAt, ...updatedFields } = req.body;

    const post = await Post.findByPk(postId);

    if (post) {
      Object.keys(updatedFields).forEach(key => {
        if (post[key] !== undefined) {
          post[key] = updatedFields[key];
        }
      });

      await post.save();

      res.json(post.toJSON());
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
});

// 删除帖子
router.delete('/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId);

    if (post) {
      await post.destroy();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// 根据帖子ID读取帖子
router.get('/readById/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId);

    if (post) {
      res.json(post.toJSON());
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error retrieving post by ID:', error);
    res.status(500).json({ message: 'Error retrieving post by ID' });
  }
});


module.exports = router;
