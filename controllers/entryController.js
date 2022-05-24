const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");

const createEntry = asyncHandler(async (req, res) => {
   if (!req.body) {
      res.status(400);
      throw new Error("Please add a value");
   }

   const entry = await Entry.create({
      value: req.body.value,
   });

   res.status(200).json(entry);
});

const getEntries = asyncHandler(async (req, res) => {
   const entries = await Entry.find();

   res.status(200).json(entries);
});

const updateEntry = asyncHandler(async (req, res) => {
   const entry = await Entry.findById(req.params.id);

   if (!entry) {
      res.status(400);
      throw new Error("Entry not found");
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

   await entry.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   createEntry,
   getEntries,
   updateEntry,
   deleteEntry,
};
