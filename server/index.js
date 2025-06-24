const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Op } = require('sequelize');
const db = require('./models'); // Sequelize models

const app = express();
app.use(cors());
app.use(express.json());

// Sync Sequelize with PostgreSQL
db.sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced with Sequelize"))
  .catch((err) => console.error("❌ Sequelize sync error:", err));

//Test Route
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

//  Get Vehicle Types 
app.get('/vehicle-types', async (req, res) => {
  try {
    debugger
    const wheels = parseInt(req.query.wheels); // ensure it's a number
    console.log('Wheels filter value:', wheels); // debug log

    const whereClause = !isNaN(wheels) ? { wheels } : {};
    const vehicleTypes = await db.VehicleType.findAll({ where: whereClause });

    console.log('Query result:', vehicleTypes); // debug
    res.json(vehicleTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

//Get Vehicles by Vehicle Type
app.get('/vehicles/:vehicleTypeId', async (req, res) => {
  try {
    const vehicles = await db.Vehicle.findAll({
      where: { vehicle_type_id: req.params.vehicleTypeId }
    });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

//Book a Vehicle
app.post('/book', async (req, res) => {
  const { first_name, last_name, vehicle_id, start_date, end_date } = req.body;

  try {
    // Check overlapping booking
    const conflict = await db.Booking.findOne({
      where: {
        vehicle_id,
        [Op.or]: [
          {
            start_date: {
              [Op.between]: [start_date, end_date]
            }
          },
          {
            end_date: {
              [Op.between]: [start_date, end_date]
            }
          },
          {
            [Op.and]: [
              { start_date: { [Op.lte]: start_date } },
              { end_date: { [Op.gte]: end_date } }
            ]
          }
        ]
      }
    });

    if (conflict) {
      return res.status(400).json({ error: 'Vehicle already booked for selected dates' });
    }

    // Create User
    const user = await db.User.create({ first_name, last_name });

    //Create Booking
    const booking = await db.Booking.create({
      user_id: user.usersid, // your DB column is usersid
      vehicle_id,
      start_date,
      end_date
    });

    res.status(201).json({ message: '✅ Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
