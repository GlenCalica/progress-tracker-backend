const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      name: String,
      metrics: [
         {
            _id: false,
            //TODO: make it so metric names are unique
            name: { type: String, unique: true, dropDups: true },
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
