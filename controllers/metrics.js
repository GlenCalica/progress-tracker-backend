const User = require("../models/users");

//post
//TODO: make it so metric names are unique
//might be able to do this in models/users.js
const createMetric = (id, metricName) => {
   let metric = {
      name: metricName,
      entries: [],
   };
   console.log(metric);
   return User.updateOne({ _id: id }, { $push: { metrics: metric } });
};

//get all
const getAllMetrics = async (id) => {
   let user = await User.findOne({ _id: id }).exec();
   return user.metrics;
};

//get one
const getMetric = async (id, metricName) => {
   let metrics = await getAllMetrics(id);
   return metrics.find((metric) => metric.name == metricName);
};

//update
const updateMetric = async (id, metricName, data) => {
   let metrics = await getAllMetrics(id);
   let index = metrics.findIndex((metric) => metric.name == metricName);
   metrics[index] = data;

   return User.updateOne(
      { _id: id },
      {
         $set: {
            metrics: metrics,
         },
      }
   );
};

//delete
const deleteMetric = async (id, metricName) => {
   let metrics = await getAllMetrics(id);
   let index = metrics.findIndex((m) => m.name == metricName);

   if (index != -1) {
      metrics.splice(index, 1);
   }

   return User.updateOne(
      { _id: id },
      {
         $set: {
            metrics: metrics,
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
