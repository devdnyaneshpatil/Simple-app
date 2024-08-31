const { User } = require("../../models");

const getAllUsers = async (page, limit) => {
  const options = {
    page: Number(page),
    limit: Number(limit) 
  };
  const users = await User.paginate({}, options);
  return users;
};

const getUserByUserId = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

const updateUserByUserId = async (userId, payload) => {
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return updatedUser;
};

const deleteUserByUserId = async (userId) => {
  await User.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
};
