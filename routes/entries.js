const express = require("express");
const router = express.Router();
const {} = require("../controllers/entries");

//post user
router.post("/user/:id/:entry", (req, res) => {});

//get user
router.get("/user/:id/:entry", (req, res) => {});

//update user
router.put("/user/:id/:entry", (req, res) => {});

//delete user
router.delete("/user/:id/:entry", (req, res) => {});

module.exports = router;
