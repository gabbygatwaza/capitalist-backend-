import jwt from "jsonwebtoken";
import Client from "../../models/client.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js"

const registerClient = catchAsync(async (req, res, next) => {
  try {
    const client = await Client.findOne({
      $or: [{ email: req.body.email }, { telnumber: req.body.phoneNumber }],
    });
    if (client) {
      return res.status(409).json({ message: "Client already exists" });
    }
    const newClient = await Client.create({
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
      },
    });
  } catch (error) {
    return next(new AppError(error.message || "Somethign went wrong",500))
  }
})

// ==== Edit Client ====
const editClient = catchAsync(async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, { ...req.body }, {new:true});
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
    return next(new AppError(error.message || "Somethign went wrong",500))
  }
})

// ===== Get All client =====

const getAllClient = catchAsync(async (req, res, next) => {
  try {
    const clients = await Client.find({});
    if (!clients) {
      return res.status(404).json("No Clients Found");
    }
    return res.status(200).json({ data: clients });
  } catch (error) {
    return next(new AppError(error.message || "Somethign went wrong",500))
  }
})

// ==== Delete Client =====
const deleteClient = catchAsync(async(req,res, next)=> {
  try {
      const client = await Client.findByIdAndDelete(req.params.id);
      if(!client){
          return res.status(404).json('Client Not Found')
      }
      return res.status(200).json({message : "Client Deleted Successfully"})
  } catch (error) {
    return next(new AppError(error.message || "Somethign went wrong",500))  
  }
})

// ===== Get Single User Info ====
const getClientInfo = catchAsync(async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if(!client) return res.status(404).json('Client Not Found')
    return res.status(200).json({
                      message:"User Found successfully",
                      data:client
                    });
  } catch (error) {
    return next(new AppError(error.message || "Somethign went wrong",500))  
  }
})
export { registerClient, editClient, getAllClient, deleteClient, getClientInfo};
