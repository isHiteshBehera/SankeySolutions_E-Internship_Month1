import UserModel from '../../Models/user';

const customUserResolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await UserModel.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getUser: async (_, { id }) => {
      try {
        return await UserModel.findById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const newUser = new UserModel(input);
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, input, { new: true });
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await UserModel.findByIdAndDelete(id);
        return { message: 'User Deleted.' };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = customUserResolvers;
