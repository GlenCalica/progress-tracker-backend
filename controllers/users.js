const User = require("../models/users");

//post
//TODO: this will probably be moved when the post route is changed
const createUser = (data, fname, lname) => {
   return User.create({
      firstname: fname,
      lastname: lname,
      ...data,
   });
};

//get
const getUser = (id) => {
   return User.findOne({ _id: id }, { metrics: 0 }).exec();
};

//update
const updateUser = (id, data) => {
   return User.updateOne(
      { _id: id },
      {
         $set: {
            id: id,
            ...data,
         },
      }
   ).exec();
};

//delete
const deleteUser = (id) => {
   return User.deleteOne({ _id: id }).exec();
};

module.exports = { createUser, getUser, updateUser, deleteUser };
