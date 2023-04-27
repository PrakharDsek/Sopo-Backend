import { Users } from "../../models/Auth.js";
import { Posts } from "../../models/CreatePost.js";
import { Comment } from "../../models/Comments.js";
import bcrypt from "bcrypt";

export const DeleteComment = async (req, res) => {
  const { postId, userId, commentId } = req.body;
  try {
    const findPost = await Posts.findById(postId);

    if (findPost) {
      const findUser = await Comment.findOne({
        UserId: userId,
        _id: commentId,
      });
  

      if (findUser.UserId == userId) {
        const deleteComment = await Comment.deleteOne({ _id: commentId });
        if (deleteComment.deletedCount == 1) {
          res.status(200).json({
            success: true,
            message: "Comment deleted successfully.",
            data: deleteComment,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Comment not found",
            data: deleteComment,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "You can't delete that comment as it's not yours.",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
