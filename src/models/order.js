import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userNames: {
        type: String,
        required: true
    },
    telNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    goodsData: [{
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
        supplyer: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }],
    trackId: {
        type: String,
        required: true,
        unique: true
    },
    orderState: {
        type: String,
        required: true,
        default: "new"
    },
    location: {
        type: String,
        required: true,
        default: "China"
    },
    subLocation: {
        type: String,
        required: true,
        default: "Purchasing"
    },
    orderPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: String,
        required: true
    },
    weight: {
        category: {
            type: String,
            required: false
        },
        weightQuantity: {
            type: Number,
            required: false
        }
    },
    chosenCommunication: {
        type: String,
        required: true
    }
})

const order = mongoose.model("crm_order", orderSchema);
export default order;
