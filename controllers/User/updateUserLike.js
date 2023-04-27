import { Posts } from "../../models/CreatePost.js";
import { Users } from "../../models/Auth.js";

export const updateUserLikes = async (req, res) => {
  const { postId, like } = req.body;
  try {
    if (!postId || !like || typeof like !== "number") {
      throw new Error(
        "Invalid input. Please provide valid postId and like values."
      );
    }

    const findPost = await Posts.findById(postId);
    if (!findPost) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    findPost.likes += like;
    await findPost.save();
    res.status(200).json({
      success: true,
      message: "Liked the post",
      data: findPost.likes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
