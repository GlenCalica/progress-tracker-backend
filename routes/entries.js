const express = require("express");
const router = express.Router();
const {
   createEntry,
   getAllEntries,
   // getEntry,
   // updateEntry,
   // deleteEntry,
} = require("../controllers/entries");

//post entry
//TODO: only allow one entry per date
router.post("/users/:id/metrics/:metric/entries", (req, res) => {
   createEntry(req.params.id, req.params.metric, req.query.value)
      .then((data) => {
         console.log(data);
         res.status(201).send("new entry created");
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to create new entry");
      });
});

//get all entries
router.get("/users/:id/metrics/:metric/entries", (req, res) => {
   getAllEntries(req.params.id, req.params.metric)
      .then((data) => {
         if (data == null) {
            console.log(data);
            res.status(404).send("entry not found");
         } else {
            res.send(data);
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("server error");
      });
});

//get entry
router.get("/users/:id/metrics/:metric/entries/:entry", (req, res) => {});

//update entry
router.put("/users/:id/metrics/:metric/entries/:entry", (req, res) => {});

//delete entry
router.delete("/users/:id/metrics/:metric/entries/:entry", (req, res) => {});

module.exports = router;
