import express from "express";

import {
  registerClient,
  editClient,
  getAllClient,
  deleteClient,
} from "../../controllers/client/clientController.js";

import { protect, restrictRoleTo } from '../../middlewares/middleware.js';

const routes = express.Router();

routes.route('/').post( protect, restrictRoleTo('admin','developer'), registerClient)
                 .get(getAllClient);
                

routes.route('/:id').delete(protect, restrictRoleTo('admin','developer'), deleteClient)
                 .put(editClient);


export default routes;
