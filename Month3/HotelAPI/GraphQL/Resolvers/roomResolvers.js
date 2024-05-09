import HotelRoom from '../../Models/room';

const hotelRoomResolvers = {
  Query: {
    hotelRooms: async () => {
      try {
        return await HotelRoom.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    hotelRoom: async (_, { id }) => {
      try {
        return await HotelRoom.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    createHotelRoom: async (_, { input }) => {
      try {
        const hotelRoom = new HotelRoom(input);
        await hotelRoom.save();
        return hotelRoom;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateHotelRoom: async (_, { id, input }) => {
      try {
        const hotelRoom = await HotelRoom.findByIdAndUpdate(id, input, { new: true });
        return hotelRoom;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteHotelRoom: async (_, { id }) => {
      try {
        await HotelRoom.findByIdAndDelete(id);
        return { message: 'Room Deleted.' };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = hotelRoomResolvers;
