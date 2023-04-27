import { Users } from "../../models/Auth.js";
import { Posts } from "../../models/CreatePost.js";
import bcrypt from "bcrypt";

export const updateUserName = async (req, res, next) => {
  try {
    const { userId, password, name } = req.body;
    if (!userId || !password || !name) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const findUser = await Users.findById(userId);
    if (!findUser) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
      return;
    }

    const checkIfUserExist = await Users.find({ name: name });
    if (checkIfUserExist.length > 0) {
      res.status(400).json({
        success: false,
        message: "User with name already exists",
      });
      return;
    }

    const updateUser = await Users.updateOne({ _id: userId }, { name });
    const updateUsersName = await Posts.updateMany(
      { UserId: userId },
      { name: name }
    );
    if (updateUser.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Update user's name successfully",
        data: updateUser,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update user's name",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user's name",
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { userId, password, newPasswword } = req.body;
    if (!userId || !password || !newPasswword) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const findUser = await Users.findById(userId);
    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
      return;
    }
    const newPasswwordHashed = await bcrypt.hash(password, 10);
    const updateUser = await Users.updateOne(
      { _id: userId },
      { password: newPasswwordHashed }
    );

    if (updateUser.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Update user's password successfully",
        data: updateUser,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update user's name",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user's name",
    });
  }
};
export const updateUserHobby = async (req, res) => {
  try {
    const { userId, password, newHobby } = req.body;
    if (!userId || !password || !newHobby) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const findUser = await Users.findById(userId);
    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
      return;
    }

    const updateUser = await Users.updateOne(
      { _id: userId },
      { hobby: newHobby }
    );

    if (updateUser.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Update user's hobby successfully",
        data: updateUser,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update user's hobby",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user's hobby",
    });
  }
};
export const updateUserBio = async (req, res) => {
  try {
    const { userId, password, bio } = req.body;
    if (!userId || !password || !bio) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const findUser = await Users.findById(userId);
    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
      return;
    }

    const updateUser = await Users.updateOne({ _id: userId }, { bio: bio });

    if (updateUser.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Update user's bio successfully",
        data: updateUser,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update user's bio",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user's bio",
    });
  }
};

export const updateUserAccountType = async (req, res) => {
  try {
    const { userId, password, Acctype } = req.body;
    if (!userId || !password || !Acctype) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const findUser = await Users.findById(userId);
    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
      return;
    }

    const updateUser = await Users.updateOne(
      { _id: userId },
      { accountType: Acctype }
    );

    if (updateUser.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Update user's account type successfully",
        data: updateUser,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update user's Account type",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user's account type",
    });
  }
};
