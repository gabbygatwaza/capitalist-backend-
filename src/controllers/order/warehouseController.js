import Warehouse from "../../models/warehouse.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import Order from "../../models/order.js";
import Client from "../../models/client.js";

//=== Add Product in Warehouse ====

const warehouseAddProduct = catchAsync(async (req, res, next) => {
  try {
    const prdt = req.body.product;
    const names = prdt.map((item) => item.name);
    const order = await Order.findById(req.query.orderId);
    if (!order) {
      return next(new AppError("No Order Found with that ID", 404));
    }
    const client = await Client.findOne({ email: order.email });
    const isExist = await Warehouse.findOne({
      $and: [
        { order: req.query.orderId },
        { client: client._id },
        { "product.name": { $in: names } },
      ],
    });
    if (isExist) {
      return next(new AppError("This product Already Exist In warehouse", 409));
    }

    const newWarehouse = await Warehouse.create({
      client,
      order,
      product: req.body.product,
      warehouse_manager: req.user,
      location: req.body.location,
    });
    res.status(201).json({
      status: "success",
      data: newWarehouse,
    });
  } catch (error) {
    return next(new AppError(error.message || "Something went wrong", 500));
  }
});

// ==== Delete Warehouse product =======

const warehouseDeleteProduct = catchAsync(async (req, res, next) => {
  try {
    const warehouseItem = await Warehouse.findOneAndDelete({
      id: req.query.id,
    });
    if (!warehouseItem) {
      return next(new AppError("No Item found with that Id!", "404"));
    }
    res.status(204).json({
      status: "Success",
      message: "Product Deleted Successfully!!",
    });
  } catch (error) {
    return next(new AppError(error.message || "Server Error", 500));
  }
});

// ======= Get All Product In warehouse ========

const warehouseGetProducts = catchAsync(async (req, res, next) => {
  try {
    const products = await Warehouse.find()
      .populate("client")
      .populate("order");
    res.status(200).json({
      length: products.length,
      data: products.length > 0 ? products : "No Products within Warehouse",
    });
  } catch (error) {
    return next(new AppError(error.message || "Server Error", 500));
  }
});

// === Edit Warehouse product =======

const warehouseEditProduct = catchAsync(async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return next(new AppError("This warehouse does not exist", 404));
    }

    const productId = req.body.productId;
    const productIndex = warehouse.product.findIndex(
      (product) => product._id.toString() === productId.toString()
    );
    if (productIndex === -1) {
      return next(new AppError("Product not found in the warehouse", 404));
    }
    warehouse.product[productIndex] = req.body.product;

    // Save the updated warehouse
    const updatedWarehouse = await warehouse.save();

    return res.status(200).json({
      status: "success",
      data: updatedWarehouse,
    });
  } catch (error) {
    return next(new AppError(error.message || "Server Error", 500));
  }
});

// Get All product of specific customer registered in Warehouse 
const warehouseGetCustomerProducts = catchAsync(async (req, res, next) => {
  try {
    const products = await Warehouse.find({$and:[
      {"client" : req.query.c},
      {order:req.query.o}
    ]})
    return res.status(200).json({
      length: products.length,
      data: products.length > 0 ? products : "No product Registered for this customer"
    })
  } catch (error) {
    return next(new AppError(error.message || "Server Error", 500));
  }
})
export {
  warehouseAddProduct,
  warehouseDeleteProduct,
  warehouseGetProducts,
  warehouseEditProduct,
  warehouseGetCustomerProducts
};
