const express = require("express");
const router = express.Router();
const {
   createUser,
   getUser,
   updateUser,
   deleteUser,
} = require("../controllers/users");

//post user
//TODO: tie this to account creation because it shouldn't be accessible to users
router.post("/users", (req, res) => {
   createUser(req.body)
      .then((data) => {
         res.status(201).json({ message: `new user created: ${data._id}` });
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "unable to create new user" });
      });
});

//get user
router.get("/users/:id", (req, res) => {
   getUser(req.params.id)
      .then((data) => {
         if (data == null) {
            res.status(404).json({ message: "user not found" });
         } else {
            res.json(data);
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "server error" });
      });
});

//update user
router.put("/users/:id", (req, res) => {
   updateUser(req.params.id, req.body)
      .then((data) => {
         if (data.matchedCount == 0) {
            res.status(404).json({ message: "user not found" });
         } else if (data.matchedCount == 1 && data.modifiedCount == 0) {
            res.json({ message: "no new data" });
         } else {
            res.json({ message: "user updated" });
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "unable to update user" });
      });
});

//delete user
router.delete("/users/:id", (req, res) => {
   deleteUser(req.params.id)
      .then((data) => {
         if (data.deletedCount == 0) {
            res.status(404).json({ message: "user not found" });
         } else {
            res.json({ message: "user deleted" });
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "unable to delete user" });
      });
});

module.exports = router;
