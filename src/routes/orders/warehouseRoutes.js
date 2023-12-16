import express  from "express";
import { warehouseAddProduct, warehouseDeleteProduct, warehouseEditProduct, warehouseGetCustomerProducts, warehouseGetProducts } from "../../controllers/order/warehouseController.js";
import { protect, restrictRoleTo } from '../../middlewares/middleware.js';
const routes = express.Router();

routes.post("/add", protect, restrictRoleTo("admin", "developer"), warehouseAddProduct);
routes.delete("/delete/:id", protect, restrictRoleTo("admin", "developer"), warehouseDeleteProduct);
routes.get("/", protect, restrictRoleTo("admin", "developer"), warehouseGetProducts);
routes.put("/edit/:id" ,protect, restrictRoleTo("admin", "developer"), warehouseEditProduct)
routes.get("/products" ,protect, restrictRoleTo("admin", "developer"), warehouseGetCustomerProducts)

export default routes