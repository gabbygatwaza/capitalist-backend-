import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Manager from "../../model/clientManager.js"

// ===== Client manager login ======

const clientLogin = async(req, res)=> {
    try {
        const manager = await Manager.findOne({email:req.body.email});
        if(!manager) {
         return res.status(401).json('Invalid Email or Password')
        } 
        const ispasswordMatch = await manager.isPasswordMatched(req.body.password);
        if (ispasswordMatch) {
         const token = jwt.sign({_id:manager._id}, process.env.SECRET_KEY);
         
         return res.status(200).json({
             message:"Logged in successfully",
             data:{
                 _id: manager._id,
                 firstname: manager.firstname,
                 lastname: manager.lastname,
                 email: manager.email,
                 role:manager.role,
                 token
             }
         })
        } else {
         return res.status(401).json("Invalid Email or Password");
        }
     } catch (error) {
         return res.status(500).json(error.message || 'Server Error');
     }
}

// === Change password =====

const clientChangePassword = async(req, res)=> {
    try {
        const manager = await Manager.findOne({email:req.body.email});
        if(!manager) {
         return res.status(401).json('Invalid Email or Password')
        }
        const isOldpasswordMatch = await manager.isPasswordMatched(req.body.oldPassword);
        if (!isOldpasswordMatch){
            return res.status(401).json('Invalid Old Password')
        }
        manager.password = req.body.newPassword;
        await manager.save();
        return res.status(200).json('Password Changed Successfully')
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message || 'Server Error');
    }
}
export { clientLogin, clientChangePassword}
