import mongoose from "mongoose";

const FriendsSchema = new mongoose.Schema({
  FriendName: {
    type: String,
  },
  FriendId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  UserId: {
    type: String,
  },
});

export const Friends = mongoose.model("Friends", FriendsSchema);
