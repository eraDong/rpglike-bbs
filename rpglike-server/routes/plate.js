const express = require('express');
const router = express.Router();

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

// Create a new plate
router.post('/create', async (req, res) => {
    try {
      const { name, avatar } = req.body;
      const plate = await Plate.create({ name, avatar });
      res.json(plate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating plate' });
    }
  });

// Retrieve all plates
router.get('/read', async (req, res) => {
  try {
    const plates = await Plate.findAll();
    res.json(plates);
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
