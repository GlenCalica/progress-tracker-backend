const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");
const User = require("../models/userModel");

const createEntry = asyncHandler(async (req, res) => {
   if (!req.body) {
      res.status(400);
      throw new Error("Please add a value");
   }

   const entry = await Entry.create({
      metric: req.body.metric,
      value: req.body.value,
      user: req.user.id,
   });

   res.status(200).json(entry);
});

const getEntries = asyncHandler(async (req, res) => {
   const entries = await Entry.find({ user: req.user.id });

   res.status(200).json(entries);
});

const updateEntry = asyncHandler(async (req, res) => {
   const entry = await Entry.findById(req.params.id);

   if (!entry) {
      res.status(400);
      throw new Error("Entry not found");
   }

   const user = await User.findById(req.user.id);

   //Check for user
   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   //Make sure the logged in user matches the goal user
   if (entry.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });

   res.status(200).json(updatedEntry);
});

const deleteEntry = asyncHandler(async (req, res) => {
   const entry = await Entry.findById(req.params.id);

   if (!entry) {
      res.status(400);
      throw new Error("Entry not found");
   }

   const user = await User.findById(req.user.id);

   //Check for user
   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   //Make sure the logged in user matches the goal user
   if (entry.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   await entry.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   createEntry,
   getEntries,
   updateEntry,
   deleteEntry,
};
