import express from "express";
import {
  DeletePost,
  Post,
  getPostsAll,
  getPostsByHobby,
  getPostsByUserId,
} from "../controllers/CreatePost/Post.js";
import { updatePosts } from "../controllers/CreatePost/UpdatePost.js";
import { PostDelete } from "../controllers/CreatePost/DeletePost.js";
import { updateUserLikes } from "../controllers/User/updateUserLike.js";
import {
  CreateSavePost,
  getUsersSaved,
  removeSavedList,
} from "../controllers/Saved/saved.js";

const router = express.Router();

router.post("/deletepost", DeletePost);
router.get("/getAllpost", getPostsAll);
router.post("/getAllpostByhobby", getPostsByHobby);
router.post("/Getsaved", getUsersSaved);
router.post("/getAllpostByUserId", getPostsByUserId);
router.post("/createpost", Post);
router.post("/like", updateUserLikes);
router.post("/save", CreateSavePost);
router.post("/RemoveSaved", removeSavedList);
//Updating posts
router.put("/update", updatePosts);

//Deleting posts
router.post("/delete", PostDelete);

export default router;
