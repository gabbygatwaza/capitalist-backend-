import {adminRegistration, adminLogin }from "../../controllers/admin/authController.js";
import { adminAuthMiddleware } from "../../middleware/adminAuthMiddleware.js";
import { registerClientManager, deleteClientManager } from "../../controllers/admin/adminController.js";
import express from "express";
const adminRoutes = express.Router();

adminRoutes.post("/auth/register",adminAuthMiddleware, adminRegistration)
adminRoutes.post("/auth/login", adminLogin)
adminRoutes.post("/client/add",adminAuthMiddleware, registerClientManager)
adminRoutes.delete("/client/delete",adminAuthMiddleware, deleteClientManager)

export default adminRoutes