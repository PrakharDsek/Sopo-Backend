import { Friends } from "../../models/Friends.js";
import { Users } from "../../models/Auth.js";

const addFriends = async (req, res) => {
  try {
    const { userId, friendId, friendName } = req.body;
    const checkAlreadyFriend = await Friends.find({
      FriendId: friendId,
      UserId: userId,
    });
    if (checkAlreadyFriend.length === 0) {
      const AddFriend = await Friends.create({
        FriendName: friendName,
        FriendId: friendId,
        UserId: userId,
      });
      const findUser = await Users.findById(userId);
      if (!findUser) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      const findFriend = await Users.findById(friendId);
      if (!findFriend) {
        res.status(404).json({
          success: false,
          message: "Friend not found",
        });
        return;
      }
      findFriend.followers += 1;
      findUser.following += 1;
      await findUser.save();
      await findFriend.save();
      res.status(200).json({
        success: true,
        message: "Friendship added, and operation was successful",
        data: AddFriend,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Can't add friend as you both are already friends",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { friendId, userId } = req.query;

    const removeFriend = await Friends.findOneAndDelete({
      FriendId: friendId,
      UserId: userId,
    });
    const findUser = await Users.findById(userId);
    if (!findUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    const findFriend = await Users.findById(friendId);
    if (!findFriend) {
      res.status(404).json({
        success: false,
        message: "Friend not found",
      });
      return;
    }

    findFriend.followers -= 1;
    findUser.following -= 1;
    await findUser.save();
    res.status(200).json({
      success: true,
      message: "removed the friend",
      data: removeFriend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const findFriends = async (req, res) => {
  try {
    const { userId } = req.query;
    const findFriend = await Friends.find({
      UserId: userId,
    });
    res.status(200).json({
      success: true,
      message: "Got all the friends",
      data: findFriend,
    });
  } catch (error) {
    res.staus(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default addFriends;
