import express from 'express';
import usersRoutes from './users/usersRoutes.js';
import clientsRoutes from './clients/clientsRoutes.js';
import ordersRoutes from './orders/ordersRoutes.js';
import warehouseRoute from "./orders/warehouseRoutes.js"

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/orders', ordersRoutes);
routes.use("/warehouse", warehouseRoute)

export default routes;
