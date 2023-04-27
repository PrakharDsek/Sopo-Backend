import { Comment } from "../../models/Comments.js";

export const GetComments = async (req, res) => {
  const { PostId } = req.body;

try {
      if (!PostId) {
        res.status(400).json({
            success: false,
            message: "Kindly provide postId"
        })
    }
    const findComments = await Comment.find({ PostId: PostId });
    if (!findComments==[]) {
      res.status(200).json({
        success: true,
        message: "Got all comments for the post",
        data: findComments
      });
    }else{
        res.status(404).json({
            success: false,
            message: "No comments found for the post"
        })
    }
  } catch (error) {
    return  res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
