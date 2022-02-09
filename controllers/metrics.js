const User = require("../models/users");

//post
const createMetric = async (id, metricName) => {
   //check if metric already exists
   let checkMetric = await getMetric(id, metricName);
   if (checkMetric) {
      throw "metric already exists";
   }

   return User.updateOne(
      { _id: id },
      {
         $push: {
            metrics: {
               name: metricName,
               entries: [],
            },
         },
      }
   );
};

//TODO: remove entries from metrics
//get all
const getAllMetrics = async (id) => {
   let user = await User.findOne({ _id: id }).exec();

   //potential fix for removing entries from metrics
   // let userMetrics = [];
   // //copy all properties except for metrics over
   // for (let i = 0; i < user.metrics.length; i++) {
   //    userMetrics.push({
   //       name: user.metrics[i].name,
   //    });
   // }
   // return userMetrics;

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
