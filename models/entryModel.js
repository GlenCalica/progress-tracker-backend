const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   entry: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Metric",
   },
   date: {
      type: String,
      required: true,
   },
   value: Number,
});

modules.exports = mongoose.model("Entry", entrySchema);
