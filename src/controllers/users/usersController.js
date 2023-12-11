import User from "../../models/users.js";

// ==== Get All Users ===

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(404).json({msg: "No users found"})
        }
        res.status(200).json({
            users: users
        })
    } catch (error) {
        return res.status(500).json(error.message || 'Server Error');  
    }
}

// ==== Get Single User ===
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({msg: "User not found"})
        }
        res.status(200).json({
            user: user
        })
    } catch (error) {
        return res.status(500).json(error.message || 'Server Error');  
    }
}

//  ===== Change User Role ===

const changeUserRole = async(req, res) => {
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
        return res.status(500).json(error.message || 'Server Error');  
    }
}
export {getUsers, getUser, changeUserRole}