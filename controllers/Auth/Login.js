import { Users } from "../../models/Auth.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);


    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    console.log(error.message);
  }
};
