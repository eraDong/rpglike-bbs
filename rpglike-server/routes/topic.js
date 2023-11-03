const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const router = express.Router();

// 配置数据库连接
const sequelize = new Sequelize('rpglike-api', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// 定义 "topic" 模型
const Topic = sequelize.define('Topic', {
  title: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});

// 同步模型与数据库
sequelize.sync();

// 创建 topic
router.post('/create', async (req, res) => {
    try {
      const { title, name } = req.body;
      const topic = await Topic.create({ title, name });
      res.json(topic);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating topic' });
    }
  });
  
  // 查询所有 topics
  router.get('/read', async (req, res) => {
    try {
      const topics = await Topic.findAll({
        attributes: ['id', 'title', 'name'], // 返回指定的属性
      });
      res.json(topics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving topics' });
    }
  });
  
  // 更新 topic
  router.put('/update/:id', async (req, res) => {
    try {
      const topicId = req.params.id;
      const { title, name } = req.body;
      const topic = await Topic.findByPk(topicId);
  
      if (topic) {
        await topic.update({ title, name });
        res.json(topic);
      } else {
        res.status(404).json({ message: 'Topic not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating topic' });
    }
  });
  
  // 删除 topic
  router.delete('/delete/:id', async (req, res) => {
    try {
      const topicId = req.params.id;
      const topic = await Topic.findByPk(topicId);
  
      if (topic) {
        await topic.destroy();
        res.json({ message: 'Topic deleted' });
      } else {
        res.status(404).json({ message: 'Topic not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting topic' });
    }
  });
  
  module.exports = router;
