const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   // numMetricsAllowed: {
   //    type: Number,
   //    required: true,
   //    default: 5,
   // },
});

module.exports = mongoose.model("User", userSchema);
