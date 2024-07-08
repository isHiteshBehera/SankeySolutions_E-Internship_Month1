const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelcontroller');


router.post('/addhotel', hotelController.addhotel);

router.get('/gethotel', hotelController.gethotel);

router.get('/payment', hotelController.paymentpage);

router.put('/:id', hotelController.updatehotel);

router.delete('/:id', hotelController.deletehotel);

module.exports = router;