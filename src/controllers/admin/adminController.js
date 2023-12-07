import Manager from "../../model/clientManager.js";
import jwt from "jsonwebtoken"

const registerClientManager = async(req, res) => {
    try {
        const manager = await Manager.findOne({email:req.body.email});
        if (manager) return res.status(409).json({message:"Email already registered"})
        
        const newManager = await Manager.create({
         firstname : req.body.firstname,
         lastname:req.body.lastname,
         email : req.body.email,
         phonenumber: req.body.phoneNumber,
         password : req.body.password
        })
        const token = jwt.sign({_id:newManager._id}, process.env.SECRET_KEY)
        return res.status(200).json({
         message:'Successfully created',
         data:{
             _id: newManager._id,
             firstname: newManager.firstname,
             lastname: newManager.lastname,
             email: newManager.email,
             phoneNumber:newManager.telNumber,
             token
         }
        })
     } catch (error) {
         return res.status(500).json(error.message || 'Server error');
     }
}

// === Delete a client Manager =====

const deleteClientManager = async(req, res)=> {
    try {
        const client = await Manager.findByIdAndDelete(req.query.id);
        if(client) {
            return res.status(200).json({message:`Account Deleted successfully`})
        }
        else{
            throw Error('No such user found')
        }
        
    } catch (error) {
        return res.status(500).json(error.message || 'Server error'); 
    }
}

export {registerClientManager, deleteClientManager}