const asyncHandler = require("express-async-handler");
const Metric = require("../models/metricModel");
const User = require("../models/userModel");

const createMetric = asyncHandler(async (req, res) => {
   if (!req.body) {
      res.status(400);
      throw new Error("Please add a name");
   }

   const metric = await Metric.create({
      name: req.body.name,
      user: req.user.id,
   });

   res.status(200).json(metric);
});

const getMetrics = asyncHandler(async (req, res) => {
   const metrics = await Metric.find({ user: req.user.id });

   res.status(200).json(metrics);
});

const updateMetric = asyncHandler(async (req, res) => {
   const metric = await Metric.findById(req.params.id);

   if (!metric) {
      res.status(400);
      throw new Error("Metric not found");
   }

   const user = await User.findById(req.user.id);

   //Check for user
   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   //Make sure the logged in user matches the goal user
   if (metric.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   const updatedMetric = await Metric.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new: true,
      }
   );

   res.status(200).json(updatedMetric);
});

const deleteMetric = asyncHandler(async (req, res) => {
   const metric = await Metric.findById(req.params.id);

   if (!metric) {
      res.status(400);
      throw new Error("Metric not found");
   }

   const user = await User.findById(req.user.id);

   //Check for user
   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   //Make sure the logged in user matches the goal user
   if (metric.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
   }

   await metric.remove();

   res.status(200).json({ id: req.params.id });
});

module.exports = {
   createMetric,
   getMetrics,
   updateMetric,
   deleteMetric,
};
