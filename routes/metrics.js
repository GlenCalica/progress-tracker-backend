const express = require("express");
const router = express.Router();
const {
   createMetric,
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

//get metric
router.get("/users/:id/metrics/:metric", (req, res) => {});

//update metric
router.put("/users/:id/metrics/:metric", (req, res) => {});

//delete metric
router.delete("/users/:id/metrics/:metric", (req, res) => {});

module.exports = router;
