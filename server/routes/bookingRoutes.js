const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/vehicle-types', bookingController.getVehicleTypes);
router.get('/vehicles/:typeId', bookingController.getVehiclesByType);
router.post('/book', bookingController.submitBooking);

module.exports = router;
