const User = require("../models/users");

//get
const getUser = (id) => {
   return User.findOne({ _id: id }).exec();
};

//post
const createUser = async (data) => {
   const newUser = new User(data);
   await newUser.save();
   return newUser;
};

//update
const updateUser = (id, data) => {
   return User.updateOne({ _id: id }, { $set: data }).exec();
};

//delete
const deleteUser = (id) => {
   return User.deleteOne({ _id: id }).exec();
};

module.exports = { getUser, createUser, updateUser, deleteUser };
