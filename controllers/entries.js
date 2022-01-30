const User = require("../models/users");

//post
const createEntry = async (id, metricName, entryDate, data) => {
   //check if date is valid
   let date = new Date(entryDate);
   if (date == "Invalid Date" || date > Date.now()) {
      throw "invalid date";
   }

   //format date into MM-DD-YYYY
   let dateString = date
      .toLocaleDateString("en-US", {
         month: "2-digit",
         day: "2-digit",
         year: "numeric",
      })
      .replace(/\//g, "-");

   //check if entry already exists at entryDate
   let checkEntry = await getEntry(id, metricName, entryDate);
   if (checkEntry) {
      throw "entry at date already exists";
   }

   //create new entry
   let user = await User.findOne({ _id: id }).exec();
   let index = user.metrics.findIndex((metric) => metric.name == metricName);
   let field = `metrics.${index}.entries`;

   return User.updateOne(
      { _id: id },
      {
         $push: {
            [field]: {
               date: dateString,
               ...data,
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
