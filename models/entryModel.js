const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
   },
   metric: {
      type: String,
      required: true,
      ref: "Metric",
   },
   date: {
      type: Date,
      required: true,
   },
   value: {
      type: Number,
      required: true,
   },
});

module.exports = mongoose.model("Entry", entrySchema);
