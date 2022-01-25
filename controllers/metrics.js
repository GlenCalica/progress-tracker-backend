const User = require("../models/users");

//post
const createMetric = (id, metric) => {
   metric.entries = [];
   console.log(metric);
   return User.updateOne({ _id: id }, { $push: { metrics: metric } });
};

//get
const getMetric = (id, metric) => {
   return User.findOne({ _id: id, "metrics.name": metric }).exec();
};

//update
const updateMetric = (id, data) => {
   return null;
};

//delete
const deleteMetric = (id, metric) => {
   return null;
};

module.exports = { createMetric, getMetric, updateMetric, deleteMetric };
