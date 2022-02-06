const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      //generate _id manually for added security
      firstname: {
         type: String,
         required: true,
      },
      lastname: {
         type: String,
         required: true,
      },
      numMetrics: {
         type: Number,
         required: true,
         default: 0,
      },
      numMetricsAllowed: {
         type: Number,
         required: true,
         default: 5,
      },
      metrics: [
         {
            _id: false,
            name: {
               type: String,
               required: true,
            },
            numEntries: Number,
            entries: [
               {
                  _id: false,
                  date: {
                     type: String,
                     required: true,
                  },
                  value: Number,
               },
            ],
         },
      ],
   },
   { versionKey: false }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
