const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      name: String,
      metrics: [
         {
            name: String,
            type: String,
            entries: [
               {
                  date: Date,
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
