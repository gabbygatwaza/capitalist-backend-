import express from "express";
import {
clientLogin, clientChangePassword
} from "../../controllers/client/authController.js";
import { registerClient, editClient, getAllClient, deleteClient } from "../../controllers/client/clientController.js";
import { managerAuthMiddleware } from "../../middleware/clientManagerMiddleware.js";

const managerRoutes = express.Router();

managerRoutes.post("/auth/register",managerAuthMiddleware, registerClient);
managerRoutes.post("/auth/login", clientLogin);
managerRoutes.put("/auth/change-password", managerAuthMiddleware, clientChangePassword);
managerRoutes.put("/", managerAuthMiddleware, editClient);
managerRoutes.get("/", managerAuthMiddleware, getAllClient);
managerRoutes.delete("/", managerAuthMiddleware, deleteClient);

export default managerRoutes;
