import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
dotenv.config();


import model from "../database/models";
const User = model.User;

// ====== User Registration ========

export const userRegistration = async (req, res) => {
  const { firstName, lastName, email, password } = req?.body;
  try {
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userExists) {
      res.status(200).json({
        message: "Email already in use",
      });
    } else {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUND)
      );
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.status(200).json({
        status: "success",
        data:user
      });
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong")
  }
};


// ======== USER LOGIN CTRL=======

export const userLoginCtrl = async (req, res)=> {
  const { email, password } = req?.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (isMatch) {
        const token= await jwt.sign({id:user?.id}, process.env.JWT_SECRET,{expiresIn:"2d"})
        res.status(200).json({
          status: "success",
          data: {user, token},
        });
      } else {
        res.status(200).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(200).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
}
