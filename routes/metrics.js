const express = require("express");
const router = express.Router();
const {} = require("../controllers/metrics");

//post user
router.post("/user/:id/:metric", (req, res) => {});

//get user
router.get("/user/:id/:metric", (req, res) => {});

//update user
router.put("/user/:id/:metric", (req, res) => {});

//delete user
router.delete("/user/:id/:metric", (req, res) => {});

module.exports = router;
