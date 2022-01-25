const User = require("../models/users");

//post
//TODO: this will probably be moved when the post route is changed
const createUser = async (data) => {
   const newUser = new User(data);
   await newUser.save();
   return newUser;
};

//get
const getUser = (id) => {
   return User.findOne({ _id: id }).exec();
};

//update
const updateUser = (id, data) => {
   return User.updateOne({ _id: id }, { $set: data }).exec();
};

//delete
const deleteUser = (id) => {
   return User.deleteOne({ _id: id }).exec();
};

module.exports = { createUser, getUser, updateUser, deleteUser };
