import User from "../models/users.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import dotenv from 'dotenv';

dotenv.config();


/**
 * This middleware  ensures that the user is logged in
 */

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    return next(
      new AppError('You are not allowed, sign in and try again', 401)
    );
  }

  if (req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }


  if (!token) {
    return next(
      new AppError('You are not allowed to perform this action', 401)
    );
  }


  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
  const uid = decoded._id;
  const freshUser = await User.findById(uid);

  if (!freshUser) {
    return next(
      new AppError("User belonging to this token does'nt exist", 401)
    );
  }
  req.user = freshUser;

  next();
});

/**
 * This middleware ensures that the user has ability to access a certain resource
 */

export const restrictRoleTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not permitted to perform this action',
      });
    }
    next();
  };
};

export const restrictPlanTo = (...plans) => {
  return async (req, res, next) => {
    if (!plans.includes(req.user.planName)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not permitted to perform this action',
      });
    }
    next();
  };
};