const express = require('express');
const router = express.Router();
const multer = require('multer');


// 配置存储位置和文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/'); // 上传的文件保存在public目录中
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const { Sequelize, DataTypes } = require('sequelize');

// Configure your database connection
const sequelize = new Sequelize('rpglike-api', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // Use the appropriate dialect
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

const Plate = sequelize.define('Plate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  // 其他板块属性
});

const UserPlate = sequelize.define('UserPlate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  PlateId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'plates',
      key: 'id',
    },
  },
});

  

// Synchronize the model with the database
sequelize.sync();

const upload = multer({ storage });

router.post('/create', upload.single('avatar'), (req, res) => {
  try {
    const { name } = req.body;
    const avatarPath = req.file.path; // 获取上传的图像文件路径

    // 插入数据到数据库，存储图像文件路径
    Plate.create({ name, avatar: avatarPath })
      .then((plate) => {
        console.log('Plate created:', plate.toJSON());
        res.json(plate.toJSON());
      })
      .catch((error) => {
        console.error('Error creating plate:', error);
        res.status(500).json({ message: 'Error creating plate' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating plate' });
  }
});




// Retrieve all plates
router.get('/read', async (req, res) => {
  try {
    const plates = await Plate.findAll();
    const plateArray = plates.map(plate => plate.toJSON()); // 转换为 JSON 对象并放入数组中
    res.json(plateArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plates' });
  }
});

// Retrieve a plate by name
router.get('/readByName/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const plate = await Plate.findOne({ where: { name } });

    if (plate) {
      res.json(plate.toJSON());
    } else {
      res.status(404).json({ message: 'Plate not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plate by name' });
  }
});



//update
router.put('/update/:id', async (req, res) => {
    try {
      const plateId = req.params.id;
      const { name, avatar } = req.body;
      const plate = await Plate.findByPk(plateId);
  
      if (plate) {
        await plate.update({ name, avatar });
        res.json(plate);
      } else {
        res.status(404).json({ message: 'Plate not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating plate' });
    }
  });

// Delete a plate by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const plateId = req.params.id;
    const plate = await Plate.findByPk(plateId);

    if (plate) {
      await plate.destroy();
      res.json({ message: 'Plate deleted' });
    } else {
      res.status(404).json({ message: 'Plate not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting plate' });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { userId, plateId } = req.body;

    // 检查是否用户已经加入了该板块
    const existingUserPlate = await UserPlate.findOne({
      where: { UserId: userId, PlateId: plateId },
    });

    if (existingUserPlate) {
      return res.status(400).json({ message: 'User already joined this plate' });
    }

    // 创建新的关联关系
    const newUserPlate = await UserPlate.create({ UserId: userId, PlateId: plateId });

    res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error joining plate' });
  }
});


// Retrieve a plate's ID by name
router.get('/getPlateIdByName/:name', async (req, res) => {
  try {
    const { name } = req.params;

    const plate = await Plate.findOne({ where: { name } });

    if (plate) {
      res.json({ id: plate.id });
    } else {
      res.status(404).json({ message: 'Plate not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plate ID by name' });
  }
});



module.exports = router;
