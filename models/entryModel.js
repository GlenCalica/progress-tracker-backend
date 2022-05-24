const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
   // user: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    required: true,
   //    ref: "User",
   // },
   // metric: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    required: true,
   //    ref: "Metric",
   // },
   date: {
      type: String,
      required: false,
   },
   value: {
      type: Number,
      required: true,
   },
});

module.exports = mongoose.model("Entry", entrySchema);
