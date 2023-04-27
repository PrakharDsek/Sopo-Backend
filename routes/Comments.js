import express from "express";
import { CommentCreate } from "../controllers/Comments/Create.js";
import { DeleteComment } from "../controllers/Comments/Delete.js";
import { UpdateComment } from "../controllers/Comments/Update.js";
import { GetComments } from "../controllers/Comments/Read.js";
const router = express.Router();

router.post("/new", CommentCreate);
router.put("/update", UpdateComment);
router.post("/delete", DeleteComment);
router.post("/getComments", GetComments);

export default router;
