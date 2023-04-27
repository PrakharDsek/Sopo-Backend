import mongoose from "mongoose";

const CreateSavedPostSchema = new mongoose.Schema({
  PostId: {
    type: String,
  },
  UserId: {
    type: String,
  },
  Post: {
    type: Object,
  },
});

export const SavedPost = mongoose.model("Saved", CreateSavedPostSchema);
