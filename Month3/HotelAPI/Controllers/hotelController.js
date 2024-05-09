const Hotel = require('../Models/hotel');

const fetchHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.update(req.body);
      res.json(hotel);
    } else {
      res.status(404).json({ message: 'No Hotel' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.destroy();
      res.json({ message: 'Hotel Deleted.' });
    } else {
      res.status(404).json({ message: 'No Hotel' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchHotels,
  createHotel,
  updateHotel,
  deleteHotel
};
