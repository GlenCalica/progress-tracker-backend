const express = require("express");
const router = express.Router();
const {
   createEntry,
   getEntries,
   updateEntry,
   deleteEntry,
} = require("../controllers/entryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createEntry);
router.get("/", protect, getEntries);
router.put("/:id", protect, updateEntry);
router.delete("/:id", protect, deleteEntry);

module.exports = router;
