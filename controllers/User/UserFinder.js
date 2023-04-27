import { Users } from "../../models/Auth.js";

export const FindUser = async (req, res) => {
  try {
    if (req.body.email) {
      const email = req.body.email;
      const findUser = await Users.findOne({ email: email });

      if (!findUser) {
        return res.status(404).json({
          success: true,
          message: `User not found with email ${email}`,
          data: findUser,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findUser,
      });
    } else if (req.body.userName) {
      const userName = req.body;
      const findUser = await Users.findOne({ userName: userName });

      if (!findUser) {
        return res.status(404).json({
          success: true,
          message: `User not found with Username ${userName}`,
          data: findUser,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findUser,
      });
    } else if (req.body.name) {
      const { name } = req.body;
      const findUser = await Users.findOne({ name: name });

      if (!findUser) {
        return res.status(404).json({
          success: true,
          message: `User not found with name ${name}`,
          data: findUser,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findUser,
      });
    } else if (req.body.userId) {
      const { userId } = req.body;
      const findUser = await Users.findById(userId);

      if (!findUser) {
        return res.status(404).json({
          success: true,
          message: `User not found with ID ${userId}`,
          data: findUser,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Kindly either provide email, userName, name, or userId",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
