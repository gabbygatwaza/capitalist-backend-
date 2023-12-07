import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, "Firstname is required"] },
  lastname: { type: String, required: [true, "Lastname is required"] },
  email: { type: String, unique: true, required: [true, "Email is required"], },
  telnumber: { type: String, unique: true, required: [true, "Telnumber is required"] },
  password: { type: String, required: [true, "Password is required"] },  
    location: {
        value: {
          provence: { type: String, required: true},
          district: { type: String, required: true},
          sector: { type: String, required: true},
          cell: { type: String, required: true},
        }
    }
},{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps:true
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

const User = mongoose.model("User", userSchema);
export default User;