import express from "express";

import {
  registerOrder,
  editOrder,
  getAllOrder,
  deleteOrder,
} from "../../controllers/order/orderController.js";

import { protect, restrictRoleTo } from '../../middlewares/middleware.js';

const routes = express.Router();

routes.route('/').post( protect, restrictRoleTo('admin','developer'), registerOrder)
                 .get(getAllOrder);
                

routes.route('/:id').delete(protect, restrictRoleTo('admin','developer'), deleteOrder)
                 .put(editOrder);


export default routes;
