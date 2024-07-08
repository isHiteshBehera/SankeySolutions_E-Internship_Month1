const express = require('express');
const roomCtrl = require('../Controllers/roomCtrl');

const router = express.Router();

router.get('/', roomCtrl.getRooms);
router.post('/', roomCtrl.postRooms);
router.put('/:id', roomCtrl.putRooms);
router.delete('/:id', roomCtrl.deleteRooms);

module.exports = router;
