const express = require("express");
const router = express.Router();
const {
   registerUser,
   loginUser,
   getCurrentUser,
   updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/:id", protect, updateUser);

module.exports = router;
