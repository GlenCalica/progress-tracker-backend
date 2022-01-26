const User = require("../models/users");

//post
const createMetric = (id, metric) => {
   metric.entries = [];
   console.log(metric);
   return User.updateOne({ _id: id }, { $push: { metrics: metric } });
};

//get all
const getAllMetrics = async (id) => {
   let data = await User.findOne({ _id: id }, { _id: 0, metrics: 1 }).exec();
   return data.metrics;
};

//get one
const getMetric = async (id, metric) => {
   let data = await getAllMetrics(id);
   return data.find((m) => m.name == metric);
};

//update
const updateMetric = (id, data) => {
   return null;
};

//delete
const deleteMetric = (id, metric) => {
   return null;
};

module.exports = {
   createMetric,
   getAllMetrics,
   getMetric,
   updateMetric,
   deleteMetric,
};
