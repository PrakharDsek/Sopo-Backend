import { Users } from "../../models/Auth.js";
import { Posts } from "../../models/CreatePost.js";
import { Comment } from "../../models/Comments.js";

export const CommentCreate = async (req, res) => {
  const { CommenterUserId, comment, PostId ,name } = req.body;

  try {
    if (!CommenterUserId || !comment || !PostId ||!name) {
      return res.status(400).json({
        success: false,
        message: "Kindly provide commenterId ,PostId and comment",
      });
    }

    const findUser = await Users.findById(CommenterUserId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const AddComment = await Comment.create({UserId:CommenterUserId ,PostId:PostId ,Comment:comment ,Name: name})

    return res.status(200).json({
      success: true,
      message: "Created comment",
      data: AddComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
