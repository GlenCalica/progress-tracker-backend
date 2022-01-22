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

   //get
   getUser(id) {
      return this.User.findOne({ _id: id }).exec();
   }

   //post
   async addNewUser(data) {
      const newUser = new this.User(data);
      await newUser.save();
      return newUser;
   }

   //update
   updateUser(id, data) {
      return this.User.updateOne({ _id: id }, { $set: data }).exec();
   }

   //delete
   deleteUser(id) {
      return this.User.deleteOne({ _id: id }).exec();
   }
};
