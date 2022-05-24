const express = require("express");
const router = express.Router();
const {
   createMetric,
   getMetrics,
   updateMetric,
   deleteMetric,
} = require("../controllers/metricController");

router.post("/", createMetric);
router.get("/", getMetrics);
router.put("/:id", updateMetric);
router.delete("/:id", deleteMetric);

module.exports = router;
