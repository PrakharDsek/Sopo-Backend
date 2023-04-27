import { Posts } from "../../models/CreatePost.js";

export const updatePosts = async (req, res) => {
  try {
    const { title, desc, imageURL, postId } = req.body;
    console.log(title, desc, imageURL, postId);

const PutintoArray = await Posts.findOneAndUpdate(
  { _id: postId },
  {
    title: title,
    desc: desc,
    imageURL: imageURL,
  },
  { new: true }
);

if (PutintoArray) {
  res.status(200).json({
    success: true,
    message: "Successfully updated post",
    data: PutintoArray,
  });
} else {
  res.status(400).json({
    success: false,
    message: "Kindly update at least one thing",
  });
}

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
