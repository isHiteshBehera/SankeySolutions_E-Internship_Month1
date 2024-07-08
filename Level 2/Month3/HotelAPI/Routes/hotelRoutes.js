const express = require('express');
const hotelCtrl = require('../Controllers/hotelCtrl');

const router = express.Router();

router.get('/', hotelCtrl.getHotels);
router.post('/', hotelCtrl.createHotel);
router.put('/:id', hotelCtrl.updateHotel);
router.delete('/:id', hotelCtrl.deleteHotel);

module.exports = router;
