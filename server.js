const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const HTTP_PORT = process.env.PORT || 8080;

require("dotenv").config();
const connectionString = process.env.MONGODB_CONN_STRING;

const ProgressTrackerDB = require("./database.js");
const db = new ProgressTrackerDB();

db.initialize(connectionString)
   .then(() => {
      app.listen(HTTP_PORT, () => {
         console.log(`server listening on port ${HTTP_PORT}`);
      });
   })
   .catch((err) => {
      console.log(err);
   });

//get user
app.get("/api/user/:id", (req, res) => {
   db.getUser(req.params.id)
      .then((data) => {
         if (data == null) {
            res.status(404).send("user not found");
         } else {
            res.send(data);
         }
      })
      .catch((err) => {
         res.status(500).send("server error");
      });
});

//post user
app.post("/api/user", (req, res) => {
   db.addNewUser(req.body)
      .then((data) => {
         console.log(data);
         res.status(201).send("new user created");
      })
      .catch((err) => {
         res.status(500).send("unable to create new user");
      });
});

//update user
app.put("/api/user/:id", (req, res) => {
   console.log(req.params.id);
   console.log(req.body);
   db.updateUser(req.params.id, req.body)
      .then((data) => {
         console.log(data);
         if (data.matchedCount == 0) {
            res.status(404).send("user not found");
         } else {
            res.send("user updated");
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to update user");
      });
});

//delete user
app.delete("/api/user/:id", (req, res) => {
   db.deleteUser(req.params.id)
      .then((data) => {
         if (data.deletedCount == 0) {
            res.status(404).send("user not found");
         } else {
            res.send("user deleted");
         }
      })
      .catch((err) => {
         res.status(500).send("unable to delete user");
      });
});
