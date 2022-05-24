const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   firstname: {
      type: String,
      required: true,
   },
   lastname: {
      type: String,
      required: true,
   },
   numMetricsAllowed: {
      type: Number,
      required: true,
      default: 5,
   },
});

modules.exports = mongoose.model("User", userSchema);
