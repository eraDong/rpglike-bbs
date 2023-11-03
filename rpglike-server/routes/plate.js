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

// Define a Plate model
const Plate = sequelize.define('Plate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, // Assuming 'name' is a string
    },
    avatar: {
      type: DataTypes.STRING, // Assuming 'avatar' is a string (URL to an image)
    },
    // Define other plate attributes
    // Example: description, etc.
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

module.exports = router;
