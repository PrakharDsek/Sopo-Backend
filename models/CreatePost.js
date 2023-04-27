import mongoose from "mongoose";

const CreatePostSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
  },
  comments: {
    type: Array,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export const Posts = mongoose.model("posts", CreatePostSchema);
