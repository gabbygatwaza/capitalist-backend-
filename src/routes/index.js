import express from 'express';
import managerRoutes from './userRoutes/userRoutes.js';
import adminRoutes from './admin/adminRoutes.js';

const routes = express.Router();

routes.use('/admin', adminRoutes);
routes.use('/client', managerRoutes);

export default routes;
