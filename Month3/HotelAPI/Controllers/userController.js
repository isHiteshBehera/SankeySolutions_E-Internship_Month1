const UserModel = require('../Models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserById =  async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'No User.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User Deleted.' });
    } else {
      res.status(404).json({ message: 'No User.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById
};
