const express = require('express');
const userCtrl = require('../Controllers/userctrl');

const router = express.Router();

router.get('/', userCtrl.fetchUsers);
router.post('/', userCtrl.createUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
