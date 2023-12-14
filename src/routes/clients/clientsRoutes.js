import express from "express";

import {
  registerClient,
  editClient,
  getAllClient,
  deleteClient,
  getClientInfo,
} from "../../controllers/client/clientController.js";

import { protect, restrictRoleTo } from '../../middlewares/middleware.js';

const routes = express.Router();

routes.route('/').post( protect, restrictRoleTo('admin','developer'), registerClient)
                 .get(protect, restrictRoleTo('admin','developer'),getAllClient);
                

routes.route('/:id').delete(protect, restrictRoleTo('admin','developer'), deleteClient)
                 .put(protect, restrictRoleTo('admin','developer'), editClient).get(protect, restrictRoleTo('admin','developer'),getClientInfo);


export default routes;
