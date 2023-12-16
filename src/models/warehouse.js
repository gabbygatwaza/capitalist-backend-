import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "Order Client is Required"],
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "crm_order",
    required: [true, "Order is Required"],
  },
  product:[{
    name:{
        type : String ,
        required : [true, "Product name is Required"]
    },
    quantity:{
        type : Number ,
        required : [true, "Product Quantity is Required"]
    },
    price_per_unit:{
        type : Number,
        required : [true, "Product Price per unit is Required"]
    },
    total_price:{
        type : Number,
        required : [true, "Product Total Price is Required"]
    },
    time_in_warehouse:{
        type : Number,
        required : [true, "Product name is Required"]
    },
  }],
  warehouse_manager:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'crm_users',
    required:[true, "Warehouse manager is required"]
  },
  location:{
    type :String,
    enum:["china", "rwanda"],
    required :[true,"Location is required"]
  }
},{ 
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
    timestamps: true
});

const Warehouse = mongoose.model("crm_warehouse", warehouseSchema);
export default Warehouse;
