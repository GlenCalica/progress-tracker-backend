const User = require("../models/users");

//post
const createEntry = async (id, metricName, value) => {
   let entry = {
      value: value,
      date: Date.now(),
   };
   console.log(entry);

   let user = await User.findOne({ _id: id }).exec();
   let index = user.metrics.findIndex((metric) => metric.name == metricName);
   let field = `metrics.${index}.entries`;

   return User.updateOne({ _id: id }, { $push: { [field]: entry } });
};

//get all
const getAllEntries = async (id, metricName) => {
   let user = await User.findOne({ _id: id }).exec();
   let index = user.metrics.findIndex((metric) => metric.name == metricName);

   return user.metrics[index].entries;
};

//get

//update

//delete

module.exports = {
   createEntry,
   getAllEntries,
   // getEntry,
   // updateEntry,
   // deleteEntry,
};
