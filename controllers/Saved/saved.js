import { SavedPost } from "../../models/SavedPosts.js";
import { Posts } from "../../models/CreatePost.js";

export const CreateSavePost = async (req, res) => {
  const { PostId, UserId } = req.body;
  try {
    //Find Post
    const Post = await Posts.findById(PostId);
    const SavePost = await SavedPost.create({
      PostId: PostId,
      UserId: UserId,
      Post: Post,
    });
    await SavePost.save();
    res.status(200).json({
      success: true,
      message: "Saved Post",
      data: SavePost.Post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsersSaved = async (req, res) => {
  const { UserId } = req.body;
  try {
    const findSaved = await SavedPost.find({ UserId: UserId });
    if (findSaved) {
      res.status(200).json({
        success: true,
        message: "Got all the saved posts",
        data: findSaved,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeSavedList = async (req, res) => {
  const { SavedPostId } = req.body;

  if (!SavedPostId) {
    return res.status(400).json({
      success: false,
      message: "SavedPostId is required",
    });
  }

  try {
    const savedPost = await SavedPost.findById(SavedPostId);
    if (!savedPost) {
      return res.status(404).json({
        success: false,
        message: "Saved post not found",
      });
    }

    // Ensure that the user is authorized to remove the post
    if (savedPost.userId !== req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await SavedPost.findByIdAndRemove(SavedPostId);
    res.status(200).json({
      success: true,
      message: "Removed from the list",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
