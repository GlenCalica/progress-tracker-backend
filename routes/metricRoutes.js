const express = require("express");
const router = express.Router();
const {
   createMetric,
   getMetrics,
   updateMetric,
   deleteMetric,
} = require("../controllers/metricController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createMetric);
router.get("/", protect, getMetrics);
router.put("/:id", protect, updateMetric);
router.delete("/:id", protect, deleteMetric);

module.exports = router;
