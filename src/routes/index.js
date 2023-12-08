import express from 'express';
import usersRoutes from './users/usersRoutes.js';
import clientsRoutes from './clients/clientsRoutes.js';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/clients', clientsRoutes);

export default routes;
