const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');


router.post('/adddetails', userController.adddetails);

router.put('/updatedetails/:id', userController.updatedetails);

router.delete('/deletedetails/:id', userController.deletedetails);

module.exports = router;