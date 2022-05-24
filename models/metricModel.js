const mongoose = require("mongoose");

const metricSchema = mongoose.Schema({
   // user: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    required: true,
   //    ref: "User",
   // },
   name: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("Metric", metricSchema);
