const express = require("express");
const router = express.Router();
const {} = require("../controllers/metrics");

//post metric
router.post("/users/:id/metrics", (req, res) => {});

//get metric
router.get("/users/:id/metrics/:metric", (req, res) => {});

//update metric
router.put("/users/:id/metrics/:metric", (req, res) => {});

//delete metric
router.delete("/users/:id/metrics/:metric", (req, res) => {});

module.exports = router;
