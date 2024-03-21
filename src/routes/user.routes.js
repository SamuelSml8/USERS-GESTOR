const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
} = require("../controllers/users.controller.js");

router.post("/create", auth.authenticate(), createUser);
router.get("/all", auth.authenticate(), getUsers);
router.get("/:id", auth.authenticate(), getUserById);
router.put("/update/:id", auth.authenticate(), updateUser);
router.delete("/delete/:id", auth.authenticate(), deleteUser);

router.post("/register", register);
router.post("/login", login);

// process.env.JWT_REQUEST

module.exports = router;
