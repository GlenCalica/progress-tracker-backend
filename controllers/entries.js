const User = require("../models/users");

//post
const createEntry = async (id, metricName, value) => {
   let date = new Date(Date.now());

   let dateString = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
   });

   dateString = dateString.replace(/\//g, "-");

   let entry = {
      value: value,
      date: dateString,
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
const getEntry = async (id, metricName, entryDate) => {
   let entries = await getAllEntries(id, metricName);
   return entries.find((entry) => entry.date == entryDate);
};

//update

//delete

module.exports = {
   createEntry,
   getAllEntries,
   getEntry,
   // updateEntry,
   // deleteEntry,
};
