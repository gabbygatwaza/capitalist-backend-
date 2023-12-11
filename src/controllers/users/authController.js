import User from "../../models/users.js";
import  Jwt from "jsonwebtoken";

// ======= Admin Registration ======
const userRegistration = async(req, res)=> {
    try {
       const admin = await User.findOne({email:req.body.email});
       if(admin){
        return res.status(409).json({message: 'User already exists'});
       }
       const newUser = await User.create({
        firstname : req.body.firstname,
        lastname:req.body.lastname,
        email : req.body.email,
        password : req.body.password
       })
       const token = Jwt.sign({_id:newUser._id}, process.env.SECRET_KEY)
       return res.status(200).json({
        message:'Successfully created',
        data:{
            _id: newUser._id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            token
        }
       })
    } catch (error) {
        return res.status(500).json(error.message || 'Server error');
    }
}

// ======= User Login ======

const userLogin = async(req, res)=> {
    try {
       const user = await User.findOne({email:req.body.email});
       if(!user) {
        return res.status(401).json('Invalid Email or Password')
       } 
       const ispasswordMatch = await user.isPasswordMatched(req.body.password);
       if (ispasswordMatch) {
        const token = Jwt.sign({_id:user._id}, process.env.SECRET_KEY);
        
        return res.status(200).json({
            message:"Logged in successfully",
            data:{
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
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

//  ===== User Change password ===
const userChangePassword = async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(404).json("User Not found");
        const isPasswordMatched = await user.isPasswordMatched(req.body.oldPassword);
        if (!isPasswordMatched) {
            return res.status(400).json("Old password is incorrect");
        }
        user.password = req.body.newPassword;
        await user.save()
        return res.status(200).json({
            message:"Password changed successfully",
            data:user
        });
    } catch (error) {
        return res.status(500).json(error.message || 'Server Error');
    }
}




export {userRegistration, userLogin, userChangePassword}