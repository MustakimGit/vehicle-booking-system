const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models'); // Sequelize models

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Sync Sequelize with DB
db.sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced with Sequelize"))
  .catch((err) => console.error("❌ Sequelize sync error:", err));

// ✅ Test route - optional
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// ✅ Example: Get all vehicle types
app.get('/vehicle-types', async (req, res) => {
  try {
    const vehicleTypes = await db.VehicleType.findAll();
    res.json(vehicleTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
