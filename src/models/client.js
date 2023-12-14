import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, "Firstname is required"] },
  lastname: { type: String, required: [true, "Lastname is required"] },
  email: { type: String, unique: true, required: [true, "Email is required"], },
  telnumber: { type: String, unique: true, required: [true, "Telnumber is required"] },
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


const client = mongoose.model("Client", clientSchema);
export default client;