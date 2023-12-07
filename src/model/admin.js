import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const adminShema = new mongoose.Schema({
    firstname:{type:String, required:[true, "Admin Firstname is required"]},
    lastname:{type:String, required:[true, "Admin lastname is required"]},
    email:{type:String, required:[true, "Admin email is required"]},
    password:{type:String, required:[true, "Admin password is required"]},
}, {
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
    timestamps: true
})

// hash user password
adminShema.pre("save", async function (next) {
    // Check for password update
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// Compare password using bcryptjs
adminShema.methods.isPasswordMatched = async function (userInputPassword) {
  return bcrypt.compare(userInputPassword, this.password);
};

const Admin = mongoose.model("Admin", adminShema);
export default Admin;