import dotenv from "dotenv";
import model from "../database/models";
import { where } from "sequelize";

const User = model.User;

dotenv.config();

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({});

    res.status(200).json({
      status: "success",
      result: allUsers.length,
      data: allUsers?.length > 0 ? allUsers : "No users Found",
    });
  } catch (error) {
    return new Error(error.message || "Something went wrong");
  }
};

// == Find single user ====

export const fetchSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: "No such user" });
    } else {
      return res.status(200).json({ data: user });
    }
  } catch (error) {
    return new Error(error.message || "Something went wrong");
  }
};

// Delete a User

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { uuid: req.params.id } });
    if(!user) {
      return res.status(404).json("You can't delete Unexisting user");
    }
    user.destroy();
    await user.save()
    return res.json(`User Deleted successfully`);
  } catch (error) {
    return new Error(error.message || "Something went wrong");
  }
};

// Update a User

export const updateUser = async(req, res)=> {
  try {
    const user = await User.update({firstName:req.body.firstName}, {where:{uuid:req.params.id}})
    res.json(user)
  } catch (error) {
    return new Error(error.message || "Something went wrong")
  }
}