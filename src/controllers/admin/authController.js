import Admin from "../../model/admin.js";
import  Jwt from "jsonwebtoken";

// ======= Admin Registration ======
const adminRegistration = async(req, res)=> {

    try {
       const admin = await Admin.findOne({email:req.body.email});
       if(admin){
        return res.status(409).json({message: 'Admin already exists'});
       }
       const newAdmin = await Admin.create({
        firstname : req.body.firstname,
        lastname:req.body.lastname,
        email : req.body.email,
        password : req.body.password
       })
       const token = Jwt.sign({_id:newAdmin._id}, process.env.SECRET_KEY)
       return res.status(200).json({
        message:'Successfully created',
        data:{
            _id: newAdmin._id,
            firstname: newAdmin.firstname,
            lastname: newAdmin.lastname,
            email: newAdmin.email,
            token
        }
       })
    } catch (error) {
        return res.status(500).json(error.message || 'Server error');
    }
}

// ======= Admin Login ======

const adminLogin = async(req, res)=> {
    try {
       const admin = await Admin.findOne({email:req.body.email});
       if(!admin) {
        return res.status(401).json('Invalid Email or Password')
       } 
       const ispasswordMatch = await admin.isPasswordMatched(req.body.password);
       if (ispasswordMatch) {
        const token = Jwt.sign({_id:admin._id}, process.env.SECRET_KEY);
        
        return res.status(200).json({
            message:"Logged in successfully",
            data:{
                _id: admin._id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
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



export {adminRegistration, adminLogin}