const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      //generate _id manually for added security
      name: String,
      metrics: [
         {
            _id: false,
            name: String,
            entries: [
               {
                  _id: false,
                  date: String,
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
