const express = require("express");
const router = express.Router();
const {} = require("../controllers/entries");

//post entry
router.post("/users/:id/metrics/:metric/entries", (req, res) => {});

//get entry
router.get("/users/:id/metrics/:metric/entries/:entry", (req, res) => {});

//update entry
router.put("/users/:id/metrics/:metric/entries/:entry", (req, res) => {});

//delete entry
router.delete("/users/:id/metrics/:metric/entries/:entry", (req, res) => {});

module.exports = router;
