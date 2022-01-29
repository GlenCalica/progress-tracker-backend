const User = require("../models/users");

//TODO: make function to get index of metric

//post
//TODO: allow user to put in any date
const createEntry = async (id, metricName, value) => {
   let date = new Date(Date.now());
   let dateString = date
      .toLocaleDateString("en-US", {
         month: "2-digit",
         day: "2-digit",
         year: "numeric",
      })
      .replace(/\//g, "-");

   let user = await User.findOne({ _id: id }).exec();
   let index = user.metrics.findIndex((metric) => metric.name == metricName);
   let field = `metrics.${index}.entries`;

   return User.updateOne(
      { _id: id },
      {
         $push: {
            [field]: {
               date: dateString,
               value: value,
            },
         },
      }
   );
};

//get all
const getAllEntries = async (id, metricName) => {
   let user = await User.findOne({ _id: id }).exec();
   let index = user.metrics.findIndex((metric) => metric.name == metricName);

   return user.metrics[index].entries;
};

//get
const getEntry = async (id, metricName, entryDate) => {
   let entries = await getAllEntries(id, metricName);
   return entries.find((entry) => entry.date == entryDate);
};

//update
const updateEntry = async (id, metricName, entryDate, data) => {
   let user = await User.findOne({ _id: id }).exec();
   let indexMetric = user.metrics.findIndex(
      (metric) => metric.name == metricName
   );

   let indexEntry = user.metrics[indexMetric].entries.findIndex(
      (entry) => entry.date == entryDate
   );
   let field = `metrics.${indexMetric}.entries.${indexEntry}`;

   return User.updateOne(
      { _id: id },
      {
         $set: {
            [field]: {
               date: entryDate,
               ...data,
            },
         },
      }
   );
};

//delete
const deleteEntry = async (id, metricName, entryDate) => {
   let user = await User.findOne({ _id: id }).exec();
   let index = user.metrics.findIndex((metric) => metric.name == metricName);

   let field = `metrics.${index}.entries`;

   return User.updateOne(
      { _id: id },
      {
         $pull: {
            [field]: { date: entryDate },
         },
      }
   );
};

module.exports = {
   createEntry,
   getAllEntries,
   getEntry,
   updateEntry,
   deleteEntry,
};
