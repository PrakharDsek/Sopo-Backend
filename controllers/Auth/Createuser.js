import { Users } from "../../models/Auth.js";
import bcrypt from "bcrypt";

export const CreateUser = async (req, res) => {
  try {
    const { email, name, password, fullname, bio, hobby, age} =
      req.body;
    const SearchForUser = await Users.findOne({ email, name });

    if (!SearchForUser) {
      const Newpassword = await bcrypt.hash(password, 10);
      const AddUser = await Users.create({
        email,
        name,
        bio,
        fullname,
        password: Newpassword,
        hobby,
        bio,
        age,
  
      });
      res.status(201).json({
        success: true,
        message: "Created user",
        data: AddUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User with email and name already exist",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
