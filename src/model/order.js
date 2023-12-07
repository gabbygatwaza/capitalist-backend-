import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    goodData: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalGoodPrice: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
}, {
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
    timestamps:true
});

const Order = mongoose.model("Order",orderSchema);
export default Order;