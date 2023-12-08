import {userRegistration, userLogin }from "../../controllers/users/authController.js";

import { protect, restrictRoleTo } from '../../middlewares/middleware.js';

import express from "express";
const routes = express.Router();

routes.post("/register", protect, restrictRoleTo('admin','developer'), userRegistration)
      .post("/login", userLogin)

export default routes