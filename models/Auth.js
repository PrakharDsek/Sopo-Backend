import mongoose from "mongoose";

const CreateUserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  hobby: {
    type: String,
  },
  age: {
    type: Number,
  },
  accountType: {
    type: String,
    default: "public",
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
});

export const Users = mongoose.model("users", CreateUserSchema);
