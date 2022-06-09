const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
   }

   const userExists = await User.findOne({ email });

   if (userExists) {
      res.status(400);
      throw new Error("User already exists");
   }

   //Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   //Create user
   const user = await User.create({
      name,
      email,
      password: hashedPassword,
   });

   if (user) {
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid credentials");
   }
});

const getCurrentUser = asyncHandler(async (req, res) => {
   const { _id, name, email } = await User.findById(req.user.id);

   res.status(200).json({
      id: _id,
      name,
      email,
   });
});

//Only updates user password
const updateUser = asyncHandler(async (req, res) => {
   const { oldPassword, newPassword } = req.body;

   const user = await User.findById(req.user.id);

   //Check for user
   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   //Check for valid password
   if (!(await bcrypt.compare(oldPassword, user.password))) {
      res.status(400);
      throw new Error("Invalid credentials");
   }

   //Hash new password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(newPassword, salt);

   const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      {
         new: true,
      }
   );

   res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
   const { password } = req.body;

   const user = await User.findById(req.user.id);

   //Check for user
   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   //Check for valid password
   if (!(await bcrypt.compare(password, user.password))) {
      res.status(400);
      throw new Error("Invalid credentials");
   }

   const deletedUser = await User.findByIdAndDelete(req.params.id);

   res.status(200).json(deletedUser);
});

//Generate JWT
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
   registerUser,
   loginUser,
   getCurrentUser,
   updateUser,
   deleteUser,
};
