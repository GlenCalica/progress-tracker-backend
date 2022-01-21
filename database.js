const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
});

module.exports = class ProgressTrackerDB {
   constructor() {
      this.User = null;
   }

   initialize(connectionString) {
      return new Promise((resolve, reject) => {
         const db = mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         });

         db.once("error", (err) => {
            reject(err);
         });
         db.once("open", () => {
            this.User = db.model("users", userSchema);
            resolve();
         });
      });
   }
};
