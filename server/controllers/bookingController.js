const { User, VehicleType, Vehicle, Booking } = require('../models');
const { Op } = require('sequelize');

exports.getVehicleTypes = async (req, res) => {
  try {
    debugger
    const wheels = parseInt(req.query.wheels, 10);
    console.log('Query param wheels:', req.query.wheels, 'Parsed wheels:', wheels);
    if (isNaN(wheels)) {
      return res.status(400).json({ error: 'Invalid wheels parameter' });
    }
    const types = await VehicleType.findAll({ where: { wheels } });
    console.log('VehicleTypes found:', types);
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

exports.getVehiclesByType = async (req, res) => {
  try {
    const typeId = req.params.typeId;
    const vehicles = await Vehicle.findAll({ where: { vehicle_type_id: typeId } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

exports.submitBooking = async (req, res) => {
  try {
    const { first_name, last_name, vehicle_id, start_date, end_date } = req.body;

    // Check overlapping bookings
    const overlap = await Booking.findOne({
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

    if (overlap) {
      return res.status(400).json({ error: 'This vehicle is already booked for the selected dates' });
    }

    // Create User
    const user = await User.create({ first_name, last_name });

    // Create Booking
    const booking = await Booking.create({
      user_id: user.usersid,
      vehicle_id,
      start_date,
      end_date
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit booking' });
  }
};
