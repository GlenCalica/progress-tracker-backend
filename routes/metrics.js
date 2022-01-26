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
   createMetric(req.params.id, req.query)
      .then((data) => {
         console.log(data);
         res.status(201).send("new metric created");
      })
      .catch((err) => {
         console.log(err);
         res.status(500).send("unable to create new metric");
      });
});

//get all metrics
router.get("/users/:id/metrics", (req, res) => {
   getAllMetrics(req.params.id)
      .then((data) => {
         if (data == null) {
            console.log(data);
            res.status(404).send("user not found");
         } else {
            res.send(data);
         }
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
            console.log(data);
            res.status(404).send("user not found");
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
router.put("/users/:id/metrics/:metric", (req, res) => {});

//delete metric
router.delete("/users/:id/metrics/:metric", (req, res) => {});

module.exports = router;
