const express = require("express");
const router = express.Router();
const {
   registerUser,
   loginUser,
   getCurrentUser,
   updateUser,
   deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
