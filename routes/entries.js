const express = require("express");
const router = express.Router();
const {
   createEntry,
   getAllEntries,
   getEntry,
   updateEntry,
   deleteEntry,
} = require("../controllers/entries");

//post entry
router.post("/users/:id/metrics/:metric/entries/:entry", (req, res) => {
   createEntry(req.params.id, req.params.metric, req.params.entry, req.body)
      .then(() => {
         res.status(201).send("new entry created");
      })
      .catch((err) => {
         console.log(err);
         if (err == "invalid date" || err == "entry at date already exists") {
            res.status(500).send(err);
         } else {
            res.status(500).send("unable to create new entry");
         }
      });
});

//get all entries
router.get("/users/:id/metrics/:metric/entries", (req, res) => {
   getAllEntries(req.params.id, req.params.metric)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("server error");
      });
});

//get entry
router.get("/users/:id/metrics/:metric/entries/:entry", (req, res) => {
   getEntry(req.params.id, req.params.metric, req.params.entry)
      .then((data) => {
         if (data == null) {
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

//update entry
router.put("/users/:id/metrics/:metric/entries/:entry", (req, res) => {
   updateEntry(req.params.id, req.params.metric, req.params.entry, req.body)
      .then((data) => {
         if (data.matchedCount == 0 || !data.acknowledged) {
            res.status(404).send("entry not found");
         } else if (data.matchedCount == 1 && data.modifiedCount == 0) {
            res.send("no new data");
         } else {
            res.send("entry updated");
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to update entry");
      });
});

//delete entry
router.delete("/users/:id/metrics/:metric/entries/:entry", (req, res) => {
   deleteEntry(req.params.id, req.params.metric, req.params.entry)
      .then((data) => {
         if (data.modifiedCount == 0) {
            res.status(404).send("entry not found");
         } else {
            res.send("entry deleted");
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to delete entry");
      });
});

module.exports = router;
