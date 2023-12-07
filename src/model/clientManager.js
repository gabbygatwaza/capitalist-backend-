import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const clientManagerSchema = new mongoose.Schema({
    firstname:{type:String, required:[true, "Admin Firstname is required"]},
    lastname:{type:String, required:[true, "Admin lastname is required"]},
    email:{type:String, required:[true, "Admin email is required"]},
    password:{type:String, required:[true, "Admin password is required"]},
    phonenumber:{type:String, required:[true, "Admin password is required"]},
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
clientManagerSchema.pre("save", async function (next) {
    // Check for password update
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// Compare password using bcryptjs
clientManagerSchema.methods.isPasswordMatched = async function (userInputPassword) {
  return bcrypt.compare(userInputPassword, this.password);
};

const Manager = mongoose.model("Manager", clientManagerSchema);
export default Manager;