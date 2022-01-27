const User = require("../models/users");

//post
//TODO: make it so metric names are unique
//might be able to do this in models/users.js
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
const updateMetric = async (id, metricName, data) => {
   let metricsData = await getAllMetrics(id);
   let index = metricsData.findIndex((m) => m.name == metricName);
   metricsData[index] = data;

   return User.updateOne(
      { _id: id },
      {
         $set: {
            metrics: metricsData,
         },
      }
   );
};

//delete
const deleteMetric = async (id, metricName) => {
   let metricsData = await getAllMetrics(id);
   let index = metricsData.findIndex((m) => m.name == metricName);

   if (index != -1) {
      metricsData.splice(index, 1);
   }

   return User.updateOne(
      { _id: id },
      {
         $set: {
            metrics: metricsData,
         },
      }
   );
};

module.exports = {
   createMetric,
   getAllMetrics,
   getMetric,
   updateMetric,
   deleteMetric,
};
