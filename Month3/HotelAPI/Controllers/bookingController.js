const BookingModel = require('../Models/booking');

const getBookingData = async (req, res) => {
  try {
    const bookingData = await BookingModel.findAll();
    res.json(bookingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const newBooking = await BookingModel.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findByPk(req.params.id);
    if (booking) {
      await booking.update(req.body);
      res.json(booking);
    } else {
      res.status(404).json({ message: 'No Booking' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBookingData = async (req, res) => {
  try {
    const booking = await BookingModel.findByPk(req.params.id);
    if (booking) {
      await booking.destroy();
      res.json({ message: 'Booking Deleted' });
    } else {
      res.status(404).json({ message: 'No Booking' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookingData,
  createBooking,
  updateBooking,
  deleteBookingData
};
