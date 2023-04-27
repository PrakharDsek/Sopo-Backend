import express from "express";
import { FindUser } from "../controllers/User/UserFinder.js";
import {
  updateUserAccountType,
  updateUserBio,
  updateUserHobby,
  updateUserName,
  updateUserPassword,
} from "../controllers/CreatePost/updateUser.js";

const router = express.Router();

router.post("/find", FindUser);
router.put("/update/name", updateUserName);
router.put("/update/bio", updateUserBio);
router.put("/update/password", updateUserPassword);
router.put("/update/hobby", updateUserHobby);
router.put("/update/accountType", updateUserAccountType);

export default router;
