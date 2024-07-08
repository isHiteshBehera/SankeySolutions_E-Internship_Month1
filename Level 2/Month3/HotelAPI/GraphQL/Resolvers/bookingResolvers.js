const BookingModel = require('../../models/booking');

const customBookingResolvers = {
  Query: {
    getBookings: async () => {
      try {
        return await BookingModel.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getBooking: async (_, { id }) => {
      try {
        return await BookingModel.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    createNewBooking: async (_, { input }) => {
      try {
        const newBooking = new BookingModel(input);
        await newBooking.save();
        return newBooking;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateExistingBooking: async (_, { id, input }) => {
      try {
        const updatedBooking = await BookingModel.findByIdAndUpdate(id, input, { new: true });
        return updatedBooking;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteExistingBooking: async (_, { id }) => {
      try {
        await BookingModel.findByIdAndDelete(id);
        return { message: 'Booking Deleted.' };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = customBookingResolvers;
