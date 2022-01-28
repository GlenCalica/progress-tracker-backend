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

   let field = `metrics.${index}`;

   return User.updateOne(
      { _id: id },
      {
         $set: {
            [field]: {
               name: metricName,
               ...data,
            },
         },
      }
   );
};

//delete
const deleteMetric = async (id, metricName) => {
   return User.updateOne(
      { _id: id },
      {
         $pull: {
            metrics: { name: metricName },
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
