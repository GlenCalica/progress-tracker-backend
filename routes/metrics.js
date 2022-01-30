const express = require("express");
const router = express.Router();
const {
   createMetric,
   getAllMetrics,
   getMetric,
   updateMetric,
   deleteMetric,
} = require("../controllers/metrics");

//TODO: clean up all routes
//post metric
router.post("/users/:id/metrics", (req, res) => {
   createMetric(req.params.id, req.query.name)
      .then(() => {
         res.status(201).send("new metric created");
      })
      .catch((err) => {
         console.log(err);
         if (err == "metric already exists") {
            res.status(500).send(err);
         } else {
            res.status(500).send("unable to create new metric");
         }
      });
});

//get all metrics
router.get("/users/:id/metrics", (req, res) => {
   getAllMetrics(req.params.id)
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("server error");
      });
});

//get metric
router.get("/users/:id/metrics/:metric", (req, res) => {
   getMetric(req.params.id, req.params.metric)
      .then((data) => {
         if (data == null) {
            res.status(404).send("metric not found");
         } else {
            res.send(data);
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("server error");
      });
});

//update metric
router.put("/users/:id/metrics/:metric", (req, res) => {
   updateMetric(req.params.id, req.params.metric, req.body)
      .then((data) => {
         console.log(data);
         if (data.matchedCount == 0 || !data.acknowledged) {
            res.status(404).send("metric not found");
         } else if (data.matchedCount == 1 && data.modifiedCount == 0) {
            res.send("no new data");
         } else {
            res.send("metric updated");
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to update metric");
      });
});

//delete metric
router.delete("/users/:id/metrics/:metric", (req, res) => {
   deleteMetric(req.params.id, req.params.metric)
      .then((data) => {
         if (data.modifiedCount == 0) {
            res.status(404).send("metric not found");
         } else {
            res.send("metric deleted");
         }
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to delete metric");
      });
});

module.exports = router;
