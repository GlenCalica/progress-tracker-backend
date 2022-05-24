const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
   if (!req.body) {
      res.status(400);
      throw new Error("Please add a name");
   }

   const user = await User.create({
      name: req.body.name,
   });

   res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find();

   res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);

   if (!user) {
      res.status(400);
      throw new Error("User not found");
   }

   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });

   res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id);

   if (!user) {
      res.status(400);
      throw new Error("User not found");
   }

   await user.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   createUser,
   getUsers,
   updateUser,
   deleteUser,
};
