import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    firstname:{type:String, required:[true, "User Firstname is required"]},
    lastname:{type:String, required:[true, "User lastname is required"]},
    email:{type:String, required:[true, "User email is required"]},
    role: {
      type: String,
      enum: ['admin', 'manager_rwa', 'manager_china', 'operator', 'developer'],
      default: 'operator'
    },
    password:{type:String, required:[true, "User password is required"]},
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
userSchema.pre("save", async function (next) {
    // Check for password update
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// Compare password using bcryptjs
userSchema.methods.isPasswordMatched = async function (userInputPassword) {
  return bcrypt.compare(userInputPassword, this.password);
};

const users = mongoose.model("crm_users", userSchema);
export default users;