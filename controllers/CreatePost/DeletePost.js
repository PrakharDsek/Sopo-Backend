import { Users } from "../../models/Auth.js";
import { Posts } from "../../models/CreatePost.js";
import bcrypt from "bcrypt";

export const PostDelete = async (req, res) => {
  try {
    const { postId, password } = req.body;
    const findPost = await Posts.findById(postId);

    if (!findPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const findUser = await Users.findById(findPost.userId);
    const matchPassword = await bcrypt.compare(password, findUser.password);

    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const deletePost = await Posts.deleteOne({ _id: postId });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted the post",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
