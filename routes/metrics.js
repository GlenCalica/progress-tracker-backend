const express = require("express");
const router = express.Router();
const {
   createMetric,
   getAllMetrics,
   getMetric,
   updateMetric,
   deleteMetric,
} = require("../controllers/metrics");

//post metric
router.post("/users/:id/metrics", (req, res) => {
   createMetric(req.params.id, req.query.name)
      .then(() => {
         res.status(201).json({ message: "new metric created" });
      })
      .catch((err) => {
         console.log(err);
         if (err == "metric already exists") {
            res.status(500).json({ message: err });
         } else {
            res.status(500).json({ message: "unable to create new metric" });
         }
      });
});

//get all metrics
router.get("/users/:id/metrics", (req, res) => {
   getAllMetrics(req.params.id)
      .then((data) => {
         res.json(data);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "server error" });
      });
});

//get metric
router.get("/users/:id/metrics/:metric", (req, res) => {
   getMetric(req.params.id, req.params.metric)
      .then((data) => {
         if (data == null) {
            res.status(404).json({ message: "metric not found" });
         } else {
            res.json(data);
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "server error" });
      });
});

//update metric
router.put("/users/:id/metrics/:metric", (req, res) => {
   updateMetric(req.params.id, req.params.metric, req.body)
      .then((data) => {
         console.log(data);
         if (data.matchedCount == 0 || !data.acknowledged) {
            res.status(404).json({ message: "metric not found" });
         } else if (data.matchedCount == 1 && data.modifiedCount == 0) {
            res.json({ message: "no new data" });
         } else {
            res.json({ message: "metric updated" });
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "unable to update metric" });
      });
});

//delete metric
router.delete("/users/:id/metrics/:metric", (req, res) => {
   deleteMetric(req.params.id, req.params.metric)
      .then((data) => {
         if (data.modifiedCount == 0) {
            res.status(404).json({ message: "metric not found" });
         } else {
            res.json({ message: "metric deleted" });
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({ message: "unable to delete metric" });
      });
});

module.exports = router;
