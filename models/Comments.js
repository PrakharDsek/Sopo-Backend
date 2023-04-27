import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Comment: {
    type: String,
  },
  Name: {
    type: String,
  },
});

export const Comment = mongoose.model("Comments", CommentSchema);
