const express = require("express");
const router = express.Router();
const {
   getUser,
   createUser,
   updateUser,
   deleteUser,
} = require("../controllers/users");

//get user
router.get("/user/:id", (req, res) => {
   getUser(req.params.id)
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
router.post("/user", (req, res) => {
   createUser(req.body)
      .then((data) => {
         console.log(data);
         res.status(201).send("new user created");
      })
      .catch((err) => {
         res.status(500).send("unable to create new user");
      });
});

//update user
router.put("/user/:id", (req, res) => {
   console.log(req.params.id);
   console.log(req.body);
   updateUser(req.params.id, req.body)
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
router.delete("/user/:id", (req, res) => {
   deleteUser(req.params.id)
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

module.exports = router;
