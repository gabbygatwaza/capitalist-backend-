import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/user.js";

const registerClient = async (req, res) => {
  try {
    const client = await User.findOne({
      $or: [{ email: req.body.email }, { telnumber: req.body.phoneNumber }],
    });
    if (client) {
      return res.status(409).json({ message: "Client already exists" });
    }
    const newClient = await User.create({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      telnumber: req.body.phoneNumber,
      location: req.body.location,
    });
    const token = jwt.sign({ _id: newClient._id }, process.env.SECRET_KEY);
    return res.status(200).json({
      message: "Successfully created",
      data: {
        _id: newClient._id,
        firstname: newClient.firstname,
        lastname: newClient.lastname,
        email: newClient.email,
        phoneNumber: newClient.telnumber,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message || "Server error");
  }
};

// ==== Edit Client ====
const editClient = async (req, res) => {
  try {
    const client = await User.findByIdAndUpdate(req.query.id, { ...req.body }, {new:true});
    if (!client) {
      return res.status(404).json("Client not found in Our DB");
    }
    return res
      .status(200)
      .json({
        message: `${client.firstname} Updated Successfully`,
        data: client,
      });
  } catch (error) {
    return res.status(500).json(error.message || "Server Error");
  }
};

// ===== Get All client =====

const getAllClient = async (req, res) => {
  try {
    const clients = await User.find({});
    if (!clients) {
      return res.status(404).json("No Clients Found");
    }
    return res.status(200).json({ data: clients });
  } catch (error) {
    return res.status(500).json(error.message || "Server Error");
  }
};

// ==== Delete Client =====
const deleteClient = async(req,res)=> {
    try {
        const client = await User.findByIdAndDelete(req.query.id);
        if(!client){
            return res.status(404).json('Client Not Found')
        }
        return res.status(200).json({message : "Client Deleted Successfully"})
    } catch (error) {
        
    }
}
export { registerClient, editClient, getAllClient, deleteClient};
