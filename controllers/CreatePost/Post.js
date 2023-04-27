import { Posts } from "../../models/CreatePost.js";
import { Users } from "../../models/Auth.js";

export const Post = (req, res) => {
  try {
    const { title, desc, imageURL, likes, userId, comments, name } = req.body;
    const Postcreate = Posts.create({
      title,
      desc,
      imageURL,
      likes,
      userId,
      comments,
      name,
    });
    if ((title, name, desc, imageURL, likes, userId, comments)) {
      res.status(201).json({
        success: true,
        message: "Post created sucessfully",
        data: Postcreate,
      });
    } else {
      res.status(400).json({
        success: false,
        message:
          "Kindly provide title ,desc ,imageURL ,likes ,userId ,comments",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeletePost = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "userId is not provided",
      });
    }
    const deletePost = await Posts.deleteOne(userId);
    res.status(204).json({
      success: true,
      message: "Post is deleted succesfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostsAll = async (req, res) => {
  try {
    const allDocs = await Posts.find({});

    if (allDocs) {
      res.status(200).json({
        success: true,
        message: "Got all posts from server",
        data: allDocs,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Posts not found on server",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//For Explore section
export const getPostsByHobby = async (req, res) => {
  const { userId, hobby } = req.body;
  try {
    const allDocsHobby = await Users.find({
      hobby: hobby,
      accountType: "public",
    });
    const userIds = allDocsHobby.map((doc) => doc._id);
   
    const findPost = await Posts.find({ userId: { $in: userIds } });
    if (findPost.length > 0) {
      res.status(200).json({
        success: true,
        message: "Got some user with the hobby",
        data: findPost,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No user with that hobby",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//For Friends section and search
export const getPostsByUserId = async (req, res) => {
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
      const findPost = await Posts.find({ userId: findUser._id });
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findPost,
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
      const findPost = await Posts.find({ userId: findUser._id });
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findPost,
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
      const findPost = await Posts.find({ userId: findUser._id });
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findPost,
      });
    } else if (req.body.userId) {
      const { userId } = req.body;
      const findUser = await Users.findOne({ _id: userId });

      if (!findUser) {
        return res.status(404).json({
          success: true,
          message: `User not found with ID ${userId}`,
          data: findUser,
        });
      }
      const findPost = await Posts.find({ userId: findUser._id });
      return res.status(200).json({
        success: true,
        message: "Got user",
        data: findPost,
      });
    } else if (req.body.PostId) {
     const { PostId } = req.body;
     const findPost = await Posts.findById(PostId);
     if (findPost) {
       res.status(200).json({
         success: true,
         message: "Got user post",
         data: findPost,
       });
     } else {
       res.status(400).json({
         success: false,
         message: "Kindly provide a valid Id",
       });
     }
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
