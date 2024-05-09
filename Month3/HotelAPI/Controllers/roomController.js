const Room = require('../Models/room');

const fetchRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (room) {
      await room.update(req.body);
      res.json(room);
    } else {
      res.status(404).json({ message: 'No Room.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (room) {
      await room.destroy();
      res.json({ message: 'Room Deleted.' });
    } else {
      res.status(404).json({ message: 'No Room.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom
};
