import { Users } from "../../models/Auth.js";
import { Posts } from "../../models/CreatePost.js";
import { Comment } from "../../models/Comments.js";
import bcrypt from "bcrypt";
export const UpdateComment = async (req, res) => {
  const { postId, userId, commentId, newComment } = req.body;
  try {
    const findPost = await Posts.findById(postId);

    if (findPost) {
      const findUser = await Comment.findOne({
        UserId: userId,
        _id: commentId,
      });

      if (findUser.UserId == userId) {
        const UpdateComment = await Comment.findByIdAndUpdate(
          commentId,
          { Comment: newComment },
          { new: true } // to return the updated comment object
        );
        console.log(UpdateComment);
        if (UpdateComment) {
          // check if the updated comment object is not null
          res.status(200).json({
            success: true,
            message: "Comment updated successfully.",
            data: UpdateComment,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Comment not found",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "You can't update that comment as it's not yours.",
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
