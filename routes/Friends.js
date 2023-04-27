import express from "express";
import addFriends, {
  findFriends,
  removeFriend,
} from "../controllers/User/Friends.js";

const router = express.Router();

router.post("/new", addFriends);
router.delete("/remove", removeFriend);
router.get("/all", findFriends);

export default router;
