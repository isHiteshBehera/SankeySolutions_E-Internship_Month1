import HotelModel from '../../Models/hotel';

const customHotelResolvers = {
  Query: {
    getHotels: async () => {
      try {
        return await HotelModel.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getHotel: async (_, { id }) => {
      try {
        return await HotelModel.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    createNewHotel: async (_, { input }) => {
      try {
        const newHotel = new HotelModel(input);
        await newHotel.save();
        return newHotel;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateExistingHotel: async (_, { id, input }) => {
      try {
        const updatedHotel = await HotelModel.findByIdAndUpdate(id, input, { new: true });
        return updatedHotel;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteExistingHotel: async (_, { id }) => {
      try {
        await HotelModel.findByIdAndDelete(id);
        return { message: 'Hotel Deleted.' };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = customHotelResolvers;
