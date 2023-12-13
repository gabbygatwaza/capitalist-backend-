import {userRegistration, userLogin, userChangePassword }from "../../controllers/users/authController.js";
import {getUsers, getUser, changeUserRole, queryStaff} from "../../controllers/users/usersController.js"
import { protect, restrictRoleTo } from '../../middlewares/middleware.js';

import express from "express";
const routes = express.Router();

routes.post("/register", protect, restrictRoleTo('admin','developer'), userRegistration)
      .post("/login", userLogin)
      .get("/", protect, restrictRoleTo('admin','developer'),getUsers)
      .get("/:id", protect, restrictRoleTo('admin','developer'),getUser)
      .put("/:i",protect, restrictRoleTo('admin','developer'),changeUserRole)
      .get("/all-member-of/department",protect, restrictRoleTo('admin','developer'),queryStaff);


export default routes