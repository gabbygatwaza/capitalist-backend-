import User from "../../models/users.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

// ==== Get All Users ===

const getUsers = catchAsync(async (req, res, next) => {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(404).json({msg: "No users found"})
        }
        res.status(200).json({
            users: users
        })
    } catch (error) {
        return next(new AppError(error.message || "Somethign went wrong",500)) 
    }
})

// ==== Get Single User ===
const getUser = catchAsync(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({msg: "User not found"})
        }
        res.status(200).json({
            user: user
        })
    } catch (error) {
        return next(new AppError(error.message || "Somethign went wrong",500))  
    }
})

//  ===== Change User Role ===

const changeUserRole = catchAsync(async(req, res, next) => {
    try {
        const user = await User.findById(req.params.i);
        if(!user) {
            return res.status(404).json({msg: "User not found"})
        }
        user.role = req.body.newRole;
        await user.save();
        return res.status(200).json({
            message: "User Role changed Successfully",
            data:user
        })
    } catch (error) {
        return next(new AppError(error.message || "Somethign went wrong",500))   
    }
})

// ===== Query Specific staff ===

const queryStaff = catchAsync(async (req, res, next) => {
    
    try {
        const { role } = req.query;
        switch (role) {
            case 'admin':
                const admins = await User.find({ role: "admin" });
                return res.status(200).json({
                    length: admins.length,
                    data: admins.length > 0 ? admins : "No Admins Found"
                });
            case 'developer':
                const developers = await User.find({ role: "developer" });
                return res.status(200).json({
                    length: developers.length,
                    data: developers.length > 0 ? developers: "No developers Found"
                });
            case 'operator':
                const operators = await User.find({ role: "operator" });
                return res.status(200).json({
                    length: operators.length,
                    data: operators.length > 0 ? operators : "No Operators Found"
                });
            case 'manager_china':
                const managersChina = await User.find({ role: "manager_china" });
                return res.status(200).json({
                    length: managersChina.length,
                    data: managersChina.length > 0 ? managersChina: "No Chinesse managers Found"
                });
            case 'manager_rwa':
                const managersRwa = await User.find({ role: "manager_rwa" });
                return res.status(200).json({
                    length: managersRwa.length,
                    data: managersRwa.length > 0 ? managersRwa : "No Rwandan managers Found"
                });
            default:
                return res.status(400).json({Error:"Invalid query"});
        }
    } catch (error) {
        return next(new AppError(error.message || "Somethign went wrong",500)) 
    }
})

export {getUsers, getUser, changeUserRole, queryStaff}