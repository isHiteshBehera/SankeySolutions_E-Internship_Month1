const express = require('express');
const bookingCtrl = require('../Controllers/bookingCtrl');

const router = express.Router();

router.get('/', bookingCtrl.getBooking);
router.post('/', bookingCtrl.postBooking);
router.put('/:id', bookingCtrl.updateBooking);
router.delete('/:id', bookingCtrl.deleteBooking);

module.exports = router;
