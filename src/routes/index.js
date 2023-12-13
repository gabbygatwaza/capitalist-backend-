import express from 'express';
import usersRoutes from './users/usersRoutes.js';
import clientsRoutes from './clients/clientsRoutes.js';
import ordersRoutes from './orders/ordersRoutes.js';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
