import express from "express";
import {
  getAllUsers,
  fetchSingleUser,
  deleteUser,updateUser
} from "./../../controllers/usersController.js";
import {
  userRegistration,
  userLoginCtrl,
} from "../../controllers/authController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", userRegistration);
router.post("/auth/login", userLoginCtrl);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, fetchSingleUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id", authMiddleware, updateUser);

export default router;
