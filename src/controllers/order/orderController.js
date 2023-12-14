import Order from "../../models/order.js";
import Client from "../../models/client.js";

const registerOrder = async (req, res) => {
    const client = await Client.findOne({
      $or: [{ email: req.body.email }],
    });
      console.log("order:---",client)
    if (!client) {
      return res.status(401).json({
        status:"failed",
        message:"Client not found"
      })
    }
      const orderData = await Order.create({
          userNames: client.lastname,
          telNumber: client.telnumber,
          email: client.email,
          goodsData: req.body.products,
          orderPrice: req.body.orderPrice,
          orderState:req.body.orderState,
          weight: {
              category: req.body.weightCategory,
              weightQuantity: req.body.weightQuantity
          },
          chosenCommunication: req.body.chosenCommunication,
          orderDate: new Date().toJSON(),
          trackId: Date.now().toString()
      })

      
      return res.status(201).json({
        status:"Order created successfully",
        orderData
      })

};

// ==== Edit Order ====
const editOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { ...req.body }, {new:true});
    if (!order) {
      return res.status(404).json("Order not found in Our DB");
    }
    return res
      .status(200)
      .json({
        message: `${order.firstname} Updated Successfully`,
        data: order,
      });
  } catch (error) {
    return res.status(500).json(error.message || "Server Error");
  }
};

// ===== Get All order =====

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders) {
      return res.status(404).json("No Orders Found");
    }
    return res.status(200).json({ data: orders });
  } catch (error) {
    return res.status(500).json(error.message || "Server Error");
  }
};

// ==== Delete Client =====
const deleteOrder = async(req,res)=> {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(404).json('Order Not Found')
        }
        return res.status(200).json({message : "Order Deleted Successfully"})
    } catch (error) {
        
    }
}
export { registerOrder, editOrder, getAllOrder, deleteOrder};
